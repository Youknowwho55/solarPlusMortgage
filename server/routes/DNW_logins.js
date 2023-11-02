/** @format */

const express = require("express");
const User = require("../models/user");
const router = express.Router();
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

router.get("/", (req, res) => {
  res.render("register/login", { user: new User() });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "mainDashboard/index",
    failureRedirect: "register/login",
  })
);

router.get("/login", function (req, res, next) {
  res.render("register/login");
});

function setUser(req, res, next) {
  const userId = request.body.userID;
  if (userId) {
    req.user = user.find((user) => user.id === userId);
  }
  next();
}

function authUser(req, res, next) {
  if (req.user == null) {
    res.status(403);
    return res.send("You need to sign in");
  }
}

function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== null) {
      res.status(401);
      return res.send("Not Allowed");
    }
    next();
  };
}

//router.get('/login', authUser,  function(req, res, next) {

module.exports = router;
