const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Create a new appointment
router.post('/', async (req, res) => {
  const { date, time, description, inspector, phoneNumber } = req.body;

  const appointment = new Appointment({
    date,
    time,
    description,
    inspector,
    phoneNumber,
  });

  try {
    const savedAppointment = await appointment.save();
    res.status(201).json(savedAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an appointment
router.put('/:id', async (req, res) => {
  const { date, time, description, inspector, phoneNumber } = req.body;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { date, time, description, inspector, phoneNumber },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an appointment
router.delete('/:id', async (req, res) => {
    try {
      const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
  
      if (!deletedAppointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
  
      res.status(204).send(); // No content to send back, just a success response
    } catch (err) {
      console.error("Error occurred while deleting the appointment:", err);
      res.status(500).json({ message: 'Failed to delete appointment.' });
    }
  });
  
  

module.exports = router;
