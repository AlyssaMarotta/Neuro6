const mongoose = require('mongoose');

const Appointment = new mongoose.Schema({
  patientEmail: { type: String, required: true },
  title: { type: String, required: true },
  time: { type: Date, required: true },
  location: { type: String, required: true },
  reminders: [{ type: String, required: true }],
});

module.exports = mongoose.model('appointments', Appointment);
