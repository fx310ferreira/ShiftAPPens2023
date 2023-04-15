const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');

mongoose.connect('mongodb://localhost:27017/shiftappens'); 

// login schema
const UserSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

const StudentSchema = extendSchema(UserSchema, {
	exams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }],
	schedules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }],
});

const TeacherSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	phone: { type: String, required: true },
	exams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }],
	schedules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }]
});

const ExaminerSchema = TeacherSchema;

const SchoolSchema = extendSchema(UserSchema, {
	name: { type: String, required: true },
	phone: { type: String, required: true },
	teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teachers' }]
});

const IMTSchema = extendSchema(UserSchema, {
	phone: { type: String, required: true },
	examiners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Examiners' }]
});

const StudentModel = mongoose.model('Student', StudentSchema);
const TeacherModel = mongoose.model('Teacher', TeacherSchema);
const ExaminerModel = mongoose.model('Examiner', ExaminerSchema);
const SchoolModel = mongoose.model('School', SchoolSchema);
const IMTModel = mongoose.model('IMT', IMTSchema);

module.exports = { StudentModel, TeacherModel, ExaminerModel, SchoolModel, IMTModel };