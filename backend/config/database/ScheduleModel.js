const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shiftappens'); 

const ScheduleSchema = mongoose.Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  status: { type: String, enum: ['disponivel', 'conducao', 'codigo'], required: true },
});

const ScheduleModel = mongoose.model('Schedule', ScheduleSchema);

module.exports = ScheduleModel;