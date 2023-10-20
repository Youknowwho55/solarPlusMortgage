const express = require('express')
const BorrowerMtg = require('../models/borrowerMtg')
const router = express.Router()
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


router.get('/messages', (req, res) => {
    res.render('sidebar/messages', { borrowerMtg: new BorrowerMtg() })
  })

  router.get('/analytics', (req, res) => {
    res.render('sidebar/analytics', { borrowerMtg: new BorrowerMtg() })
  })

  router.get('/guides', (req, res) => {
    res.render('sidebar/guides', { borrowerMtg: new BorrowerMtg() })
  })

  router.get('/marketData', (req, res) => {
    res.render('sidebar/marketData', { borrowerMtg: new BorrowerMtg() })
  })







  module.exports = router