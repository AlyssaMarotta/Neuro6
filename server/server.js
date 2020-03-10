const express = require('./config/express.js');
const User = require('./models/UserModel.js');
const { sha512WithSalt, saltHashPassword } = require('./utils/salt.js');

// Use env port or default
const port = process.env.PORT || 5000;

const app = express.init()

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  let authorized = !!userDoc;
  if (authorized) {
    const { salt, hashedPassword } = userDoc;
    authorized = sha512WithSalt(password, salt) === hashedPassword;
  }
  if (!authorized) {
    res.status(401).send({ error: `Incorrect email or password`});
    return;
  }
  console.log(userDoc);
  res.send(userDoc);
});

app.post('/create-account', async (req, res) => {
  const { email, password, firstName, lastName, dob } = req.body;
  const { salt, hashedPassword } = saltHashPassword(password);

  const userExists = await User.exists({ email });
  if (userExists) {
    res.status(409).send({ error: `Account associated with the email already exists`});
    return;
  }

  const user = new User({
    email,
    hashedPassword,
    salt,
    name: {
      first: firstName,
      last: lastName,
    },
    dob: new Date(dob),
  });
  user.save((err, doc) => {
    if (err) {
      console.warn(err);
      res.status(500).send({ error: `User creation failed` });
      return;
    }
    res.status(200).send(doc);
    return;
  });
});

app.listen(port, () => console.log(`Server now running on port ${port}!`));
