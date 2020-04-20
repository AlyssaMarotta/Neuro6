 require('dotenv').config();

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const yup = require('yup');
var cron = require('node-cron');

const express = require('./config/express.js');
const User = require('./models/User.js');
const Appointment = require('./models/Appointment.js');
const { sha512WithSalt, saltHashPassword } = require('./utils/salt.js');

const port = process.env.PORT || 5000;
const app = express.init();

//mailgun thangs
const mailgun = require("mailgun-js");
const api_key = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;
var from_who = process.env.MAILGUN_FROM;
const mg = mailgun({ apiKey: api_key, domain: DOMAIN });


//twilio thangs
var twilio = require('twilio');
var accountSid = process.env.TWILIO_SID;
var authTokenMail = process.env.TWILIO_AUTHTOKEN;
var from_who = process.env.TWILIO_FROM;
var client = new twilio(accountSid, authTokenMail);

const JWT_ACCESS_TOKEN_SECRET =
  process.env.JWT_ACCESS_TOKEN_SECRET 

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

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
  const { email, name, dob, isAdmin, phone } = userData;
  return { email, name, dob, isAdmin, phone };
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

app.get('/hello-world', async (req, res) => {
  res.send({ message: 'Hello world!' });
});

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

app.get('/AdminGetUser', async (req, res) => {
  console.log(req.body);
  const { body } = req.body;
  const user = await User.find({ email: body.email });
  res.send({ user });
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
  const { email, password, firstName, lastName, dob, phone } = req.body;
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
    //TODO: phone number validation...sup
    //TODO: pass confirmation in future...sup
  });

  let userCheck = {
    email: email,
    password: password,
    first: firstName,
    last: lastName,
    //phone: phone,
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
    phone
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



//EMAIL
//reset password
app.post('/resetpass', function (req, res) {
  const ResetPass = {
    from: from_who,
    to: req.body.email,
    subject: "Reset Password",
    text: "Hello, we were notified you would like to reset your password. If you did not send this notification please contact our offices immediately. ",
    html: 'Reset password: <a href="https://dashboard.heroku.com/apps/neuro6/reset' + req.body.email + '">Click here to reset your password </a>'
  };
  mg.messages().send(ResetPass, function (error, body) {
    console.log(body);
  });
});

//confirm appointment
app.post('/conf', function (req, res) {
  const AptConfirmation = {
    from: from_who,
    to: req.body.email,
    subject: "Appointment Confirmation",
    text: "Hello, Your request for an appointment has been recieved and is under considertion, you will be contacted shortly."
  };
  mg.messages().send(AptCancelation, function (error, body) {
    console.log(body);
  });
});

//appointment reminders
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1)

cron.schedule('0 9 * * *', () => {
  //every day at 9am
  const appointments = Appointment.find({ time: tomorrow }); //find tomorrows appointments
  appointments.forEach(function (appt) {
    const AptReminder = {
      from: from_who,
      to: appt.patientEmail,
      subject: "NO REPLY-Reminder: You have an appointment",
      text: "Hello, Here is a reminder that you have a(n) " + appt.title +
        " appointment on " + appt.time + " at " + appt.location
        + ". Please contact us if this is incorrect or you would like to cancel. Have a great day! "
    };
    mg.messages().send(AptReminder, function (error, body) {
      console.log(body);
    });
  });
});

//cancel appointment confirmation
app.post('/cancel', function (req, res) {

  //actually cancel appointment?

  const AptCancelation = {
    from: from_who,
    to: req.body.mail,
    subject: "Cancelation Confirmation",
    text: "Hello, Your appointment has been canceled. To reschedule please contact the UF Neurosurgery Department"
  };
  mg.messages().send(AptCancelation, function (error, body) {
    console.log(body);
  });
});


//office delay
app.post('/delayemail', function (req, res) {
  const appointments =  Appointment.find({ time: today }); //find todays appointments
  appointments.forEach(function (appt) {
    const delay = {
      from: from_who,
      to: req.body.email,
      subject: "Experiencing Delays",
      text: "Hello, we contacting you to let you know that our office is running behind today and your apppointment has been delayed by 15 minutes"
    };
    mg.messages().send(delay, function (error, body) {
      console.log(body);
    });

    //actually delay appointments?

  });
});


//TEXT MESSAGES
//office delay
app.post('/delaytext', function (req, res) {
  const appointments =  Appointment.find({ time: today }); //find todays appointments
  appointments.forEach(function (appt) {
    //get phone # linked to appointment email
    const number =  User.find({ email: appt.patientEmail });
    var message = client.messages.create({
      body: 'Hello, we contacting you to let you know that our office is running behind today and your apppointment has been delayed by 15 minutes',
      from: from_who,
      to: number
    })
      .then(message => console.log(message))
      .done();
  });

  //actually delay appointment??

});

//appointment reminder text
cron.schedule('0 9 * * *', () => {
  //every day at 9am
  const appointments =  Appointment.find({ time: tomorrow }); //find tomorrows appointments
  appointments.forEach(function (appt) {
    //get number from user with email associated with that appointment
    const number =  User.find({ email: appt.patientEmail });
    var message = client.messages.create({
      body: "Hello, Here is a reminder that you have a(n) " + appt.title +
        " appointment on " + appt.time + " at " + appt.location
        + ". Please contact us if this is incorrect or you would like to cancel. Have a great day! ",
      from: from_who,
      to: number
    })
      .then(message => console.log(message))
      .done();
  });
});

app.listen(port, () => console.log(`Server now running on port ${port}!`));