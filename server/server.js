const express = require('./config/express.js');
const { sha512WithSalt, saltHashPassword } = require('./utils/salt.js');

// Use env port or default
const port = process.env.PORT || 5000;

const app = express.init()

app.post('/login', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.post('/create-account', (req, res) => {
  const { email, password, firstName, lastName, dob } = req.body;
  const { salt, hashedPassword } = saltHashPassword(password);
  const user = {
    email,
    hashedPassword,
    salt,
    name: {
      firstName,
      lastName,
    },
    dob: new Date(dob),
  };
  console.log(user);
  res.send(user);
});

app.listen(port, () => console.log(`Server now running on port ${port}!`));
