const express = require('express')
const User = require('../models/user')
const router = express.Router()
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


router.post("/", function(req, res){

    User.register({username: req.body.username}, req.body.password, function(err, user){
      if (err) {
        console.log(err);
        res.redirect("/register/register");
      } else {
        passport.authenticate("local")(req, res, function(){
          res.redirect("mainDashboard/index");
        });
      }
    });
  
  });

  router.get("/", function(req, res, next){
    res.render("register/register");
  });
  


  module.exports = router
  