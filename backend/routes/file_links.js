require("dotenv").config();
require("../config/passport");
const express = require("express");
const { StudentModel, TeacherModel, ExaminerModel, SchoolModel, IMTModel } = require("../config/database/UserModel");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const router = express.Router();

const loginFunction = (req, res, user) => {
  if (!user) {
    return res.status(401).send({
      sucess: false,
      message: "User not found!",
    });
  }

  if (req.body.password != user.password) {
    return res.status(401).send({
      sucess: false,
      message: "Wrong password",
    });
  }

  const payload = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.PASSWORD, { expiresIn: "1h" });

  return res.status(200).send({
    sucess: true,
    message: "Loged in!",
    token: "Bearer " + token
  });
}

// Default route
router.get('/', (req, res) => {
  res.send("Hello World!");
});

// post request to login student
router.post('/login/student', (req, res) => {
  StudentModel.findOne({ username: req.body.username }).then((user) => loginFunction(req, res, user));
});

// post request to login school
router.post('/login/school', (req, res) => {
  SchoolModel.findOne({ username: req.body.username }).then((user) => loginFunction(req, res, user));
});

// post request to login imt
router.post('/login/imt', (req, res) => {
  IMTModel.findOne({ username: req.body.username }).then((user) => loginFunction(req, res, user));
});

// post request to register student
router.post('/register/student', (req, res) => {
  StudentModel.create(req.body)
  .then((user) => {
    return res.status(200).send({
      sucess: true,
      message: "Student created!",
    });
  })
  .catch((err) => {
    return res.status(401).send({
      sucess: false,
      message: "ERROR: Creating student!",
    });
  });
});

// post request to register teacher
router.post('/register/teacher', (req, res) => {
  TeacherModel.create(req.body)
  .then((user) => {
    return res.status(200).send({
      sucess: true,
      message: "Teacher created!",
    });
  })
  .catch((err) => {
    return res.status(401).send({
      sucess: false,
      message: "ERROR: Creating teacher!",
    });
  });
});

// post request to register examiner
router.post('/register/examiner', (req, res) => {
  ExaminerModel.create(req.body)
  .then((user) => {
    return res.status(200).send({
      sucess: true,
      message: "Examiner created!",
    });
  })
  .catch((err) => {
    return res.status(401).send({
      sucess: false,
      message: "ERROR: Creating examiner!",
    });
  });
});

// post request to register school
router.post('/register/school', (req, res) => {
  SchoolModel.create(req.body)
  .then((user) => {
    return res.status(200).send({
      sucess: true,
      message: "School created!",
    });
  })
  .catch((err) => {
    console.log(err);
    return res.status(401).send({
      sucess: false,
      message: "ERROR: Creating school!",
    });
  });
});

// post request to add schedule to student/teacher/examiner
const addSchedule = (req, res, user) => {
  if (!user) {
    return res.status(401).send({
      sucess: false,
      message: "User not found!",
    });
  };

  user.schedules.push(req.body);
  user.save();

  return res.status(200).send({
    sucess: true,
    message: "Schedule added!",
  });
}

router.post('/add/schedule/:id', (req, res) => { // look for user
  StudentModel.findById(req.param.id).then((user) => addSchedule(req, res, user));
  TeacherModel.findById(req.param.id).then((user) => addSchedule(req, res, user));
  ExaminerModel.findById(req.param.id).then((user) => addSchedule(req, res, user));
});

// post request to add exam to student, examiner (and teacher [optional])
router.post('/add/exam/', async (req, res) => {
  const user = await StudentModel.findById(req.body.studentId);
  const examiner = await ExaminerModel.findById(req.body.examinerId);
  const teacher = await TeacherModel.findById(req.body.teacherId);
  if (!user || !examiner) {
    return res.status(401).send({
      sucess: false,
      message: "Invalid request!",
    });
  };

  user.exams.push(req.body);
  examiner.exams.push(req.body);
  if (teacher) {
    teacher.exams.push(req.body);
    teacher.save();
  }
  user.save();
  examiner.save();

  return res.status(200).send({
    sucess: true,
    message: "Exam added!",
  });
});

// get all exams using imt token
router.get('/exams', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(req.user);
});

module.exports = router;
