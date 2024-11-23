// routes/applicationRoutes.js

const express = require('express');
const { applyForProgram, getApplications, deleteApplication } = require('../controllers/applicationController');

const router = express.Router();

// Route to apply for a program
router.post('/apply', applyForProgram);

// Route to get all applications
router.get('/applications', getApplications);

// Route to delete an application by ID
router.delete('/applications/:id', deleteApplication);

module.exports = router;
