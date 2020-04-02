const jwt = require('jsonwebtoken');

const express = require('./config/express.js');
let yup = require('yup');
const User = require('./models/User.js');
const Appointment = require('./models/Appointment.js');
const { sha512WithSalt, saltHashPassword } = require('./utils/salt.js');

const port = process.env.PORT || 5000;
const app = express.init();

const JWT_ACCESS_TOKEN_SECRET =
  process.env.JWT_ACCESS_TOKEN_SECRET ||
  require('./config/config.js').jwt.accessTokenSecret;

/**
 * Gets a user document associated with an email, if it exists.
 *
 * @param {string} email Email for the account.
 */
const getUser = async email => {
  return await User.findOne({ email });
};

/**
 * Retrieves only the necessary data to send back to the user.
 *
 * @param {User.schema} userData User data of the User schema
 */
const getUserDataToSend = userData => {
  const { email, name, dob, isAdmin } = userData;
  return { email, name, dob, isAdmin };
};

/**
 * Authenticates a user login with email and password.
 *
 * @param {string} email Email for the user's account
 * @param {string} password Password for the user's account
 */
const authLogin = async (email, password) => {
  const user = await getUser(email);
  if (!user) return false;
  const { salt, hashedPassword } = user;
  return sha512WithSalt(password, salt) === hashedPassword;
};

/**
 * Gets a user document associated with an email.
 *
 * Returns null if the user does not exist or the password is invalid.
 *
 * @param {string} email Email for the user's account
 * @param {string} password Password for the user's account
 */
const getUserWithAuthLogin = async (email, password) => {
  const user = await getUser(email);
  if (!user) return null;
  const { salt, hashedPassword } = user;
  return sha512WithSalt(password, salt) === hashedPassword ? user : null;
};

/**
 *
 * Gets a user document associated with a JWT token.
 *
 * Returns null if the token is invalid.
 *
 * @param {string} token JWT token associated with the user
 */
const getUserWithAuthToken = async token => {
  const { email } = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
  return await getUser(email);
};

/**
 * Generates a JSON Web Token (JWT) from an email.
 *
 * @param {string} email Email to create token for
 */
const createToken = email => {
  return jwt.sign({ email }, JWT_ACCESS_TOKEN_SECRET);
};

/**
 * Middleware for authenticating requests.
 *
 * @param {*} req HTTP Request object
 * @param {*} res HTTP Response object
 * @param {*} next Next callback
 */
const authToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(' ')[1];
  if (!token) {
    return res.status(401).send({ error: `No authorization provided` });
  }
  const user = await getUserWithAuthToken(token);
  if (!user) return res.status(403).send({ error: `Forbidden` });
  req.user = user;
  next();
};

/**
 * Endpoint to authenticate token.
 */
app.get('/auth', authToken, async (req, res) => {
  res.status(200).send(getUserDataToSend(req.user));
});

//BEST BACKEND CODE EVER, ITS GREAT
app.get('/usersgetall', async (req, res) => {
  const users = await User.find({});
  res.send({ users });
});
//END OF GREAT CODE

/**
 * @deprecated Use the endpoint with auth token instead.
 */
app.get('/appointments/:patientEmail', async (req, res) => {
  console.log(req.headers.authorization);
  const { patientEmail } = req.params;
  const appointments = await Appointment.find({ patientEmail }).sort({
    time: 1,
  });
  res.send({ appointments });
});

/**
 * Endpoint to retrieve a list of appointments associated with a JWT access token.
 */
app.get('/appointments', authToken, async (req, res) => {
  console.log(req.user);
  const { email } = req.user;
  const appointments = await Appointment.find({ patientEmail: email }).sort({
    time: 1,
  });
  res.send({ appointments });
});

//BEST BACKEND CODE EVER, ITS GREAT
app.get('/appointmentsgetall', async (req, res) => {
  const appointments = await Appointment.find({}).sort({ time: 1 });
  res.send({ appointments });
});
//END OF GREAT CODE

/**
 * Endpoint to create an appointment.
 */
app.post('/appointments', async (req, res) => {
  // TODO: authenticate with JWT token
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
 * Endpoint to update an appointment.
 *
 * Pass the ID of the appointment in the request body as id.
 */
app.put('/appointments', async (req, res) => {
  // TODO: authenticate with JWT token
  const { id, ...newAppt } = req.body;
  Appointment.findByIdAndUpdate(id, newAppt, (err, doc) => {
    if (err) {
      console.warn(err);
      res.status(500).send({ error: 'Appointment update failed' });
      return;
    }
    if (!doc) {
      res.status(404).send({ error: 'Appointment does not exist' });
      return;
    }
    res.status(200).send(doc);
  });
});

/**
 * Endpoint to delete an appointment.
 *
 * Pass the ID of the appointment in the request body as id.
 */
app.delete('/appointments', async (req, res) => {
  // TODO: authenticate with JWT token
  Appointment.findByIdAndDelete(req.body.id, (err, doc) => {
    if (err) {
      console.warn(err);
      res.status(500).send({ error: 'Appointment deletion failed' });
      return;
    }
    if (!doc) {
      res.status(404).send({ error: 'Appointment does not exist' });
      return;
    }
    res.status(200).send(doc);
  });
});

/**
 * Endpoint to log in a user given the email and password.
 *
 * Returns the JWT access token and email, name, DOB, and isAdmin for the user.
 */
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await getUserWithAuthLogin(email, password);
  if (!userDoc) {
    res.status(401).send({ error: `Incorrect email or password` });
    return;
  }
  res.send({ ...getUserDataToSend(userDoc), accessToken: createToken(email) });
});

/**
 * Endpoint to create an account.
 */
app.post('/create-account', async (req, res) => {
  const { email, password, firstName, lastName, dob } = req.body;
  const { salt, hashedPassword } = saltHashPassword(password);

  const userExists = await User.exists({ email });
  if (userExists) {
    res
      .status(409)
      .send({ error: `Account associated with the email already exists` });
    return;
  }

  const newUserYupCheck = yup.object().shape({
    email: yup
      .string()
      .email()
      .required('No email provided.'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Must be a minimum of 8 characters'),
    first: yup.string().required(),
    last: yup.string().required(),
    //TODO: pass confirmation in future...sup
  });

  let userCheck = {
    email: email,
    password: password,
    first: firstName,
    last: lastName,
  };

  const valid = await newUserYupCheck.isValid(userCheck);

  if (!valid) {
    res.send(409).send({ error: 'Either wrong email or wrong pass lol' });
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
    const accessToken = createToken(email);
    res.status(200).send({ ...getUserDataToSend(doc), accessToken });
    return;
  });
});

app.listen(port, () => console.log(`Server now running on port ${port}!`));
