const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shiftappens'); 

// Schema for users
const ExamSchema = mongoose.Schema({
  type: { type: String, enum: ['code', 'drive'], required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['passed', 'failed', 'pending'], required: true },
  approval: { type: String, enum: ['accepted', 'rejected'], required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  examiner: { type: mongoose.Schema.Types.ObjectId, ref: 'Examiner' },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
});

const ExamModel = mongoose.model('Exam', ExamSchema);

module.exports = ExamModel;