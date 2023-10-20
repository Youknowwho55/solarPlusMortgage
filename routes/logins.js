const express = require('express')
const User = require('../models/user')
const router = express.Router()
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

router.get('/', (req, res) => {
    res.render('register/login', { user: new User() })
  })

  router.post('/login', passport.authenticate('local', {
    successRedirect: 'mainDashboard/index',
    failureRedirect: "register/login"
  }));
  
  
  
  router.get('/login', function(req, res, next) {
    res.render("register/login");
  });





  module.exports = router