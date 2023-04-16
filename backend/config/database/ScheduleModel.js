const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shiftappens'); 

const ScheduleSchema = mongoose.Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  status: { type: String, enum: ['available', 'drive', 'code'], required: true },
  examiner: { type: mongoose.Schema.Types.ObjectId, ref: 'Examiner' }, // not required in initial creation
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }
});

const ScheduleModel = mongoose.model('Schedule', ScheduleSchema);

module.exports = ScheduleModel;