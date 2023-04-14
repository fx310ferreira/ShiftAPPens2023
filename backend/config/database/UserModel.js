const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shiftappens'); 

// Schema for users
const userSchema = mongoose.Schema({
	username: String,
	password: String
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;