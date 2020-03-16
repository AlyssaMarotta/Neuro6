const mongoose = require('mongoose');

const User = new mongoose.Schema({
  email: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  salt: { type: String, required: true },
  dob: { type: Date, required: true },
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true },
  },
  isAdmin: { type: Boolean, required: true },
});

module.exports = mongoose.model('users', User);
