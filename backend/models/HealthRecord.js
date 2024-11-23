const mongoose = require('mongoose');

// Define the health record schema
const healthRecordSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,  // Make this field required
  },
  date: {
    type: Date,
    required: true,  // Make this field required
  },
  diagnosis: {
    type: String,
    required: true,  // Make this field required
  },
  treatment: {
    type: String,
    required: true,  // Make this field required
  },
  notes: {
    type: String,
  },
}, { timestamps: true });  // Automatically manage createdAt and updatedAt fields

// Create the model
const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema);

// Export the model
module.exports = HealthRecord;
