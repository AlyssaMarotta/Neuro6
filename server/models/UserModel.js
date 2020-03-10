const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  salt: { type: String, required: true },
  dob: { type: Date, required: true },
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true },
    required: true
  },
});

export default mongoose.model('users', userSchema);
