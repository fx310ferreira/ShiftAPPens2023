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

/* GET request to get examiners */
router.get('/examiners', (req, res) => {
  ExaminerModel.find({})
  .then((examiners) => res.status(200).send(examiners))
  .catch((err) => res.status(401).send({ sucess: false, message: "Getting examiners!" }));
});

/* GET request to get teachers */
router.get('/teachers', (req, res) => {
  TeacherModel.find({})
  .then((teachers) => res.status(200).send(teachers))
  .catch((err) => res.status(401).send({ sucess: false, message: "Getting teachers!" }));
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

/* POST request to connect student/teacher to school */
router.post('/connect/school', (req, res) => {
  SchoolModel.findOne({ email: req.body.school }).then((school) => {
    if (!school) return res.status(401).send({ sucess: false, message: "School not found!" });
    if (req.body.type == 'student') {
      StudentModel.findOne({ email: req.body.email }).then((student) => {
        if (!student) return res.status(401).send({ sucess: false, message: "Student not found!" });
        school.students.push(student);
        school.save();
        return res.status(200).send({ sucess: true, message: "Student connected!" });
      }).catch((err) => res.status(401).send({ sucess: false, message: "Connecting student!" }));
    } else if (req.body.type == 'teacher') {
      TeacherModel.findOne({ email: req.body.email }).then((teacher) => {
        if (!teacher) return res.status(401).send({ sucess: false, message: "Teacher not found!" });
        school.teachers.push(teacher);
        school.save();
        return res.status(200).send({ sucess: true, message: "Teacher connected!" });
      }).catch((err) => res.status(401).send({ sucess: false, message: "Connecting teacher!" }));
    }
  }).catch((err) => res.status(401).send({ sucess: false, message: "Finding school!" }));
});

/* POST request to change exam approval: 'accepted', 'rejected' */
router.post('/exam/approval', (req, res) => {
  ExamModel.findById(req.body.exam).then((exam) => {
    if (!exam) return res.status(401).send({ sucess: false, message: "Exam not found!" });
    exam.approval = req.body.approval;
    exam.save();
    return res.status(200).send({ sucess: true, message: "Exam approval changed!" });
  }).catch((err) => res.status(401).send({ sucess: false, message: "Changing exam approval!" }));
});

/* POST request to connect student/teacher/examiner to exam */
router.post('/connect/exam', (req, res) => {
  ExamModel.findById(req.body.exam).then((exam) => {
    if (!exam) return res.status(401).send({ sucess: false, message: "Exam not found!" });
    if (req.body.type == 'student') {
      StudentModel.findOne({ email: req.body.email }).then((student) => {
        if (!student) return res.status(401).send({ sucess: false, message: "Student not found!" });
        student.schedules.forEach((s) => {
          const scheduleDate = new Date(s.start);
          const examDate = new Date(exam.date);
          if (scheduleDate.toISOString().slice(0, 13) == examDate.toISOString().slice(0, 13)) {
            s.student = student;
            s.status = exam.type;
            exam.students.push(student);
            student.exams.push(exam);
            s.save();
            exam.save();
            student.save();
            return res.status(200).send({ sucess: true, message: "Examiner connected!" });
          }
        });
      }).catch((err) => res.status(401).send({ sucess: false, message: "Connecting student!" }));
    } else if (req.body.type == 'teacher') {
      TeacherModel.findOne({ email: req.body.email }).then((teacher) => {
        if (!teacher) return res.status(401).send({ sucess: false, message: "Teacher not found!" });
        teacher.schedules.forEach((s) => {
          const scheduleDate = new Date(s.start);
          const examDate = new Date(exam.date);
          if (scheduleDate.toISOString().slice(0, 13) == examDate.toISOString().slice(0, 13)) {
            s.teacher = teacher;
            s.status = exam.type;
            exam.teacher = teacher;
            teacher.exams.push(exam);
            s.save();
            exam.save();
            teacher.save();
            return res.status(200).send({ sucess: true, message: "Teacher connected!" });
          }
        });
      }).catch((err) => res.status(401).send({ sucess: false, message: "Connecting teacher!" }));
    } else if (req.body.type == 'examiner') {
      ExaminerModel.findOne({ email: req.body.email }).then((examiner) => {
        if (!examiner) return res.status(401).send({ sucess: false, message: "Examiner not found!" });
        examiner.schedules.forEach((schedule) => {
          ScheduleModel.findById(schedule).then((s) => {
            const scheduleDate = new Date(s.start);
            const examDate = new Date(exam.date);
            if (scheduleDate.toISOString().slice(0, 13) == examDate.toISOString().slice(0, 13)) {
              s.examiner = examiner;
              s.status = exam.type;
              exam.examiner = examiner;
              examiner.exams.push(exam);
              s.save();
              exam.save();
              examiner.save();
              return res.status(200).send({ sucess: true, message: "Examiner connected!" });
            }
            return res.status(401).send({ sucess: false, message: "Examiner is not available!" });
          }).catch((err) => res.status(401).send({ sucess: false, message: "Could not find schedule!" }));
        });
      }).catch((err) => res.status(401).send({ sucess: false, message: "Connecting examiner!" }));
    }
  }).catch((err) => res.status(401).send({ sucess: false, message: "Finding exam!" }));
});

module.exports = router;
