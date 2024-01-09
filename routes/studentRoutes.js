// routes/studentRoutes.js

const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();

// API to get all students for a particular mentor
router.get('/students-for-mentor/:mentorId', studentController.getStudentsForMentor);

// API to get all students without mentors
router.get('/students-without-mentors', studentController.getStudentsWithoutMentors);

module.exports = router;
