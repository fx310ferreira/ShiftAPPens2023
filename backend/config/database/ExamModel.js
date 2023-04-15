const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shiftappens'); 

// Schema for users
const ExamSchema = mongoose.Schema({
  type: { type: String, enum: ['teorico', 'pratico'], required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['passed', 'failed', 'pending'], required: true },
  approval: { type: String, enum: ['accepted', 'rejected'], required: false },
  id_student: { type: String, required: true },
  id_examiner: { type: String, required: true },
  id_teacher: { type: String, required: false }
});

const ExamModel = mongoose.model('Exam', ExamSchema);

module.exports = ExamModel;