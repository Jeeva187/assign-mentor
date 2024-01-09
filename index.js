const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB without useFindAndModify option
mongoose.connect('mongodb+srv://jeevaayyavu2011:RGLfbKcFGHT9EenS@cluster0.ilso52u.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { Schema } = mongoose;

// Define Mentor Schema
const mentorSchema = new Schema({
  name: String,
});

// Define Student Schema
const studentSchema = new Schema({
  name: String,
  mentor: { type: Schema.Types.ObjectId, ref: 'Mentor' },
  previousMentor: { type: Schema.Types.ObjectId, ref: 'Mentor', default: null },
});

const Mentor = mongoose.model('Mentor', mentorSchema);
const Student = mongoose.model('Student', studentSchema);

// API to create Mentor
app.post('/mentors', async (req, res) => {
  try {
    const mentor = await Mentor.create(req.body);
    res.json(mentor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API to create Student
app.post('/students', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API to Assign or Change Mentor for a particular Student with tracking previous mentor
app.post('/assign-mentor/:mentorId/:studentId', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId);
    const student = await Student.findById(req.params.studentId);

    // Store the previous mentor
    student.previousMentor = student.mentor;

    // Assign the new mentor
    student.mentor = mentor._id;

    // Save changes
    await student.save();

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API to get all students without mentors
app.get('/students-without-mentors', async (req, res) => {
  try {
    const studentsWithoutMentors = await Student.find({ mentor: null });
    res.json(studentsWithoutMentors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API to get all students for a particular mentor
app.get('/students-for-mentor/:mentorId', async (req, res) => {
  try {
    const studentsForMentor = await Student.find({ mentor: req.params.mentorId });
    res.json(studentsForMentor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
