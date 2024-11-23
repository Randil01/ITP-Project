// controllers/applicationController.js

const Application = require('../models/Application');

exports.applyForProgram = async (req, res) => {
    const { program, user, contact } = req.body;
    console.log('Received application:', req.body); // Log the received data
    
    try {
      const newApplication = new Application({ program, user, contact });
      await newApplication.save();
      res.status(201).json(newApplication);
    } catch (error) {
      console.error('Error saving application:', error); // Log any errors
      res.status(400).json({ message: error.message });
    }
  };
  

// Get all applications
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete application
exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
