const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');

mongoose.connect('mongodb://localhost:27017/shiftappens'); 

// login schema
const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	}
});

const StudentSchema = extendSchema(UserSchema, {
	email: {
		type: String,
		required: true,
		unique: true,
	}
});

const SchoolSchema = extendSchema(UserSchema, {});

const IMTSchema = UserSchema;

const UserModel = mongoose.model('User', UserSchema);
const StudentModel = mongoose.model('Student', StudentSchema);
const SchoolModel = mongoose.model('School', SchoolSchema);
const IMTModel = mongoose.model('IMT', IMTSchema);

module.exports = { UserModel, StudentModel, SchoolModel, IMTModel };