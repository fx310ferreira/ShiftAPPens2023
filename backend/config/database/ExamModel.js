const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shiftappens'); 

// Type: teorico, pratico
const type = {
  type: String,
  enum: ['teorico', 'pratico'],
  required: true,
}

const date = {
  type: Date,
  required: true,
}

// Schema for users
const examSchema = mongoose.Schema({
  type: type,
  date: date,
})

const ExamSchema = mongoose.model('Test', examSchema);

module.exports = ExamSchema;