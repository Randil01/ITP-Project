// models/Application.js

const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  program: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Regex for Sri Lankan numbers
        return /^07[0-9]{8}$/.test(v);
      },
      message: props => `${props.value} is not a valid Sri Lankan phone number!`
    }
  },
  status: {
    type: String,
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);
