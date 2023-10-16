const express = require('express')
const BorrowerMtg = require('../models/borrowerMtg')
const router = express.Router()


router.get('/', (req, res) => {
    res.render('mainDashboard/index', { borrowerMtg: new BorrowerMtg() })
  })




  module.exports = router