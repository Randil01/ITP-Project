const express = require('express');
const router = express.Router();
const { getAllHealthRecords, createHealthRecord } = require('../controllers/healthController');

// Route to get all health records
router.get('/', getAllHealthRecords);

// Route to create a new health record
router.post('/', createHealthRecord);

module.exports = router;
