const express = require('express');
const router = express.Router();

// Emergency services endpoint
router.get('/emergency/:service', (req, res) => {
  const services = {
    police: "Contacting Police Service: 119",
    fire: "Contacting Fire Station: 110",
    ambulance: "Contacting Ambulance Service: 1990",
    waterBoard: "Contacting Water Board Service: 112",
    disaster: "Contacting Disaster Services: 1985",
  };

  const service = req.params.service;
  const message = services[service];

  if (message) {
    res.json({ message });
  } else {
    res.status(404).json({ error: "Service not found" });
  }
});

module.exports = router;
