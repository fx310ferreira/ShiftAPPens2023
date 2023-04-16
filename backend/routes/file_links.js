require("dotenv").config();
require("../config/passport");
const express = require("express");
const { UserModel, StudentModel, TeacherModel, ExaminerModel, SchoolModel, IMTModel } = require("../config/database/UserModel");
const ScheduleModel = require("../config/database/ScheduleModel");
const ExamModel = require("../config/database/ExamModel");
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
    StudentModel.create(req.body).then((user) => {
      UserModel.create({ type: 'student', id: user._id })
      .then((user) => res.status(200).send({ sucess: true, message: "Student created!"}))
      .catch((err) => res.status(401).send({ sucess: false, message: "Creating student!"}));
    }).catch((err) => res.status(401).send({sucess: false, message: "Creating student!"}));
  } else if (req.body.type == 'school') {
    SchoolModel.create(req.body).then((user) => {
      UserModel.create({ type: 'school', id: user._id })
      .then((user) => res.status(200).send({ sucess: true, message: "School created!"}))
      .catch((err) => res.status(401).send({ sucess: false, message: "Creating school!"}));
    }).catch((err) => res.status(401).send({sucess: false, message: "Creating school!"}));
  }
});

/* POST request to register examiner and teacher */
router.post('/register/et', (req, res) => {
  if (req.body.type == 'examiner') {
    ExaminerModel.create(req.body.data)
    .then((user) => res.status(200).send({ sucess: true, message: "Examiner created!" }))
    .catch((err) => res.status(401).send({ sucess: false, message: "ERROR: Creating examiner!" }));
  } else if (req.body.type == 'teacher') {
    TeacherModel.create(req.body.data)
    .then((user) => res.status(200).send({ sucess: true, message: "Teacher created!" }))
    .catch((err) => res.status(401).send({ sucess: false, message: "ERROR: Creating teacher!" }));
  }
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

/* GET request to get schedules */
router.get('/schedules', (req, res) => {
  ScheduleModel.find({})
  .then((schedules) => res.status(200).send(schedules))
  .catch((err) => res.status(401).send({ sucess: false, message: "Getting schedules!" }));
});

/* POST request to get schedules by status, month and year */
router.post('/schedules/sym', (req, res) => {
  ScheduleModel.find({})
  .then((schedules) => {
    const schedulesStatus = schedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.start);
      return (scheduleDate.getMonth() == req.body.month) && (scheduleDate.getFullYear() == req.body.year) && (schedule.status == req.body.status);
    });
    res.status(200).send(schedulesStatus);
  }).catch((err) => res.status(401).send({ sucess: false, message: "Getting schedules!" }));
});

/* POST request to add exam */
router.post('/add/exam/', async (req, res) => {
  ExamModel.create(req.body)
  .then((exam) => res.status(200).send({ sucess: true, message: "Exam added!" }))
  .catch((err) => res.status(401).send({ sucess: false, message: "Adding exam!" }));
});

/* GET request to get exams */
router.get('/exams', (req, res) => {
  ExamModel.find({}).then((exams) => res.status(200).send(exams)).catch((err) => res.status(401).send({ sucess: false, message: "Getting exams!" }));
});

/* POST request to get exams by month */
router.post('/exams/ym', (req, res) => {
  ExamModel.find({})
  .then((exams) => {
    const examsByMonth = exams.filter((exam) => {
      const examDate = new Date(exam.date);
      return (examDate.getMonth() == req.body.month) && (examDate.getFullYear() == req.body.year);
    });
    res.status(200).send(examsByMonth);
  }).catch((err) => res.status(401).send({ sucess: false, message: "Getting exams!" }));
});

/* GET request to get schedule by id */
router.get('/schedule/:id', (req, res) => {
  ScheduleModel.findById(req.params.id)
  .then((schedule) => res.status(200).send(schedule))
  .catch((err) => res.status(401).send({ sucess: false, message: "Getting schedule!" }));
});

module.exports = router;
