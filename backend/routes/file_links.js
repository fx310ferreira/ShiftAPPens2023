require("dotenv").config();
require("../config/passport");
const express = require("express");
const { UserModel, StudentModel, TeacherModel, ExaminerModel, SchoolModel, IMTModel } = require("../config/database/UserModel");
const ScheduleModel = require("../config/database/ScheduleModel");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const router = express.Router();

const loginFunction = (req, res, user) => {
  if (!user) return res.status(401).send({ sucess: false, message: "User not found!" });
  if (req.body.password != user.password) return res.status(401).send({ sucess: false, message: "Wrong password" });
  const payload = { username: user.username, id: user._id };
  const token = jwt.sign(payload, process.env.PASSWORD, { expiresIn: "1h" });
  return res.status(200).send({ sucess: true, message: "Loged in!", token: "Bearer " + token });
}

// Default route
router.get('/', (req, res) => {
  res.send("Hello World!");
});

/* POST request to login */
router.post('/login', (req, res) => {
  if (req.body.type == "student") {
    StudentModel.findOne({ username: req.body.username }).then((user) => loginFunction(req, res, user));
  } else if (req.body.type == "school") {
    SchoolModel.findOne({ username: req.body.username }).then((user) => loginFunction(req, res, user));
  } else if (req.body.type == "imt") {
    IMTModel.findOne({ username: req.body.username }).then((user) => loginFunction(req, res, user));
  }
});

/* POST request to register */
router.post('/register', (req, res) => {
  if (req.body.type == 'student') {
    StudentModel.create(req.body)
    .then((user) => {
      UserModel.create({ type: 'student', id: user._id })
      .then((user) => res.status(200).send({ sucess: true, message: "Student created!"}))
      .catch((err) => res.status(401).send({ sucess: false, message: "Creating student!"}));
    })
    .catch((err) => res.status(401).send({sucess: false, message: "Creating student!"}));
  } else if (req.body.type == 'school') {
    SchoolModel.create(req.body)
    .then((user) => {
      UserModel.create({ type: 'school', id: user._id })
      .then((user) => res.status(200).send({ sucess: true, message: "School created!"}))
      .catch((err) => res.status(401).send({ sucess: false, message: "Creating school!"}));
    })
    .catch((err) => res.status(401).send({sucess: false, message: "Creating school!"}));
  }
});

// post request to register examiner
router.post('/register/examiner', (req, res) => {
  ExaminerModel.create(req.body)
  .then((user) => res.status(200).send({sucess: true, message: "Examiner created!" }))
  .catch((err) => res.status(401).send({ sucess: false, message: "ERROR: Creating examiner!" }));
});

// post request to register school
router.post('/register/school', (req, res) => {
  SchoolModel.create(req.body)
  .then((user) => res.status(200).send({ sucess: true, message: "School created!" }))
  .catch((err) => res.status(401).send({ sucess: false, message: "ERROR: Creating school!" }));
});

/* POST request to add schedule */
const addSchedule = (req, res, user) => {
  if (!user) return res.status(401).send({ sucess: false, message: "User not found!" });
  ScheduleModel.create(req.body.schedule)
  .then((schedule) => {
    user.schedules.push(schedule);
    user.save();
  })
  return res.status(200).send({ sucess: true, message: "Schedule added!" });
}

router.post('/add/schedule/', (req, res) => { // look for user
  if (req.body.type == 'student') {
    StudentModel.find({ email: req.body.email }).then((user) => addSchedule(req, res, user[0]))
  } else if (req.body.type == 'teacher') {
    TeacherModel.find({ email: req.body.email }).then((user) => addSchedule(req, res, user[0]));
  } else if (req.body.type == 'examiner') {
    ExaminerModel.find({ email: req.body.email }).then((user) => addSchedule(req, res, user[0]));
  }
});

// post request to add exam to student, examiner (and teacher [optional])
router.post('/add/exam/', async (req, res) => {
  const user = await StudentModel.findById(req.body.studentId);
  const examiner = await ExaminerModel.findById(req.body.examinerId);
  const teacher = await TeacherModel.findById(req.body.teacherId);
  if (!user || !examiner) return res.status(401).send({ sucess: false, message: "Invalid request!" });

  user.exams.push(req.body);
  examiner.exams.push(req.body);
  if (teacher) {
    teacher.exams.push(req.body);
    teacher.save();
  }
  user.save();
  examiner.save();

  return res.status(200).send({ sucess: true, message: "Exam added!" });
});

// get all exams using imt token
router.get('/exams', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(req.headers);
});

module.exports = router;
