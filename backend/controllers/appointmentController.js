const Appointment = require('../models/Appointment');

// Get all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error.message); // Log the error for better debugging
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};

const createAppointment = async (req, res) => {
  console.log(req.body); // Log the incoming request body
  const { date, time, description, inspector, phoneNumber } = req.body;

  // Validate input data
  if (!date || !time || !description || !inspector || !phoneNumber) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newAppointment = new Appointment({
      date,
      time,
      description,
      inspector,
      phoneNumber,
    });

    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error.message);
    res.status(500).json({ message: 'Error creating appointment' });
  }
};


// Delete an appointment
const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted' });
  } catch (error) {
    console.error('Error deleting appointment:', error.message); // Log the error for better debugging
    res.status(500).json({ message: 'Error deleting appointment' });
  }
};

module.exports = {
  getAppointments,
  createAppointment,
  deleteAppointment,
};
