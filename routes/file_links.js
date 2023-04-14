require("dotenv").config();
require("../config/passport");
const express = require("express");
const UserModel = require("../config/database/UserModel");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const bucket_name = "freeride-ridereports-dev";
const bucketParams = { Bucket: bucket_name };

const router = express.Router();

// Default route
router.get("/", (req, res) => {
  res.send("Hello World!");
});

// post request to login
router.post("/login", (req, res) => {
  UserModel.findOne({ username: req.body.username }).then((user) => {
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
      token: "Bearer " + token,
    });
  });
});

module.exports = router;
