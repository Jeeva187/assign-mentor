const express = require('express');
const Mentor = require('../models/mentor');

const router = express.Router();

// API to create Mentor
router.post('/', async (req, res) => {
  try {
    const mentor = await Mentor.create(req.body);
    res.json(mentor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
