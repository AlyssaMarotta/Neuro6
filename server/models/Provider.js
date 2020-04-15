const mongoose = require('mongoose');

const Provider = new mongoose.Schema({
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true },
  },
  specialty: { type: String },
  Email: { type: String, required: true }
});

module.exports = mongoose.model('providers', Provider);