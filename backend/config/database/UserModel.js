const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');

mongoose.connect('mongodb://localhost:27017/shiftappens'); 

// login schema
const UserSchema = mongoose.Schema({
	type: { type: String, enum: ['student', 'school', 'imt'], required: true },
	id: { type: String, required: true, unique: true }
});

const AuthenticateSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

const StudentSchema = extendSchema(AuthenticateSchema, {
	exams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }],
	schedules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }],
	school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' }
});

const PersonSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	phone: { type: String, required: true },
	exams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }],
	schedules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }]
});

const ExaminerSchema = PersonSchema;

const TeacherSchema = extendSchema(PersonSchema, {
	email: { type: String, required: true, unique: true },
	phone: { type: String, required: true },
	exams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }],
	schedules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }],
	school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' }
});

const SchoolSchema = extendSchema(AuthenticateSchema, {
	name: { type: String },
	phone: { type: String },
	teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
	students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

const IMTSchema = extendSchema(AuthenticateSchema, {
	phone: { type: String },
	examiners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Examiners' }]
});

const StudentModel = mongoose.model('Student', StudentSchema);
const TeacherModel = mongoose.model('Teacher', TeacherSchema);
const ExaminerModel = mongoose.model('Examiner', ExaminerSchema);
const SchoolModel = mongoose.model('School', SchoolSchema);
const IMTModel = mongoose.model('IMT', IMTSchema);
const UserModel = mongoose.model('User', UserSchema);

module.exports = { UserModel, StudentModel, TeacherModel, ExaminerModel, SchoolModel, IMTModel };