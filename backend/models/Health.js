const mongoose = require('mongoose');

const HealthSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  condition: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Health', HealthSchema);
