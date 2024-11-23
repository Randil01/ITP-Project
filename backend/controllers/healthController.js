const HealthRecord = require('../models/HealthRecord');

// Get all health records
const getAllHealthRecords = async (req, res) => {
  try {
    const records = await HealthRecord.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching health records' });
  }
};

// Create a new health record
const createHealthRecord = async (req, res) => {
  const { patientName, date, diagnosis, treatment, notes } = req.body;

  try {
    const newHealthRecord = new HealthRecord({
      patientName,
      date,
      diagnosis,
      treatment,
      notes,
    });

    await newHealthRecord.save();
    res.status(201).json(newHealthRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error creating health record' });
  }
};

module.exports = {
  getAllHealthRecords,
  createHealthRecord,
};
