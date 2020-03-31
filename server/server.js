const jwt = require('jsonwebtoken');

const config = require('./config/config.js');
const express = require('./config/express.js');
const User = require('./models/User.js');
const Appointment = require('./models/Appointment.js');
const { sha512WithSalt, saltHashPassword } = require('./utils/salt.js');

// Use env port or default
const port = process.env.PORT || 5000;

const app = express.init()

const getUser = async (email, password) => {
  const userDoc = await User.findOne({ email });
  if (!userDoc) return null;
  const { salt, hashedPassword } = userDoc;
  return (sha512WithSalt(password, salt) === hashedPassword) ? userDoc : null;
};

const isAuthorized = async (email, password) => {
  return (await getUser(email, password)) !== null;
};

const isAuthorizedHash = async (email, hashedPassword) => {
  const userDoc = await User.findOne({ email });
  if (!userDoc) return false;
  return hashedPassword === userDoc.hashedPassword;
};

/**
 * Generates a JSON Web Token (JWT) from an email.
 * 
 * @param {string} email Email to create token for
 */
const genToken = (email) => {
  return jwt.sign({ email }, config.jwt.accessTokenSecret);
};

/**
 * Middleware for authenticating requests.
 * 
 * @param {*} req HTTP Request object
 * @param {*} res HTTP Response object
 * @param {*} next Next callback
 */
const authToken = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(' ')[1];
  if (!token) {
    return res.status(401).send({ error: `No authorization provided` });
  }

  jwt.verify(token, config.jwt.accessTokenSecret, (err, user) => {
    if (err) return res.status(403).send({ error: `Forbidden` });
    req.user = user;
    next();
  });
};

app.get('/appointments/:patientEmail', async (req, res) => {
  console.log(req.headers.authorization);
  const { patientEmail } = req.params;
  const appointments = await Appointment.find({ patientEmail }).sort({ time: 1 });
  res.send({appointments});
});

/**
 * Retrieve a list of appointments associated with an email given a JWT access token.
 */
app.get('/appointments', authToken, async (req, res) => {
  console.log(req.user);
  const { email } = req.user;
  const appointments = await Appointment.find({ patientEmail: email })
    .sort({ time: 1 });
  res.send({appointments});
});

app.post('/appointments', async (req, res) => {
  console.log(req.body);
  const appointment = new Appointment(req.body);
  appointment.save((err, doc) => {
    if (err) {
      console.warn(err);
      res.status(500).send({ error: `Appointment creation failed` });
      return;
    }
    res.status(200).send(doc);
    return;
  });
});

/**
 * Endpoint to delete an appointment
 * 
 * Pass the ID of the appointment in the request body as id
 */
app.delete('/appointments', async (req, res) => {
  Appointment.findByIdAndDelete(req.body.id, (err, doc) => {
    if (err) {
      console.warn(err);
      res.status(500).send({ error: 'Appointment deletion failed'});
      return;
    }
    if (!doc) {
      res.status(404).send({ error: 'Appointment does not exist'});
      return;
    }
    res.status(200).send(doc);
  });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await getUser(email, password);
  if (!userDoc) {
    res.status(401).send({ error: `Incorrect email or password`});
    return;
  }
  const { dob, name } = userDoc;
  const user = {email, name, dob, accessToken: genToken(email)};
  console.log(user);
  res.send(user);
});

app.post('/create-account', async (req, res) => {
  const { email, password, firstName, lastName, dob} = req.body;
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
    isAdmin: false,
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
