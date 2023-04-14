require("dotenv").config();
require("../config/passport");
const express = require("express");
const { UserModel, StudentModel, SchoolModel, IMTModel } = require("../config/database/UserModel");
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

module.exports = router;
