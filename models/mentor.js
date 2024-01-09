const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: String,
});

const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;
