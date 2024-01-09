const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Define route for getting students with a specific mentor
router.get('/for-mentor/:mentorId', studentController.getStudentsForMentor);

// Define route for getting students without mentors
router.get('/without-mentors', studentController.getStudentsWithoutMentors);

module.exports = router;
