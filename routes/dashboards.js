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






  router.get('/workbook/:id', async (req, res) => {
    const borrowerMtg = await BorrowerMtg.findById(req.params.id)
    res.render('borrowersMtg/workbook', { borrowerMtg: borrowerMtg })
  })
  
  
  router.get('/conditions/:id', async (req, res) => {
    const borrowerMtg = await BorrowerMtg.findById(req.params.id)
    res.render('borrowersMtg/conditions', { borrowerMtg: borrowerMtg })
  })
  
  router.get('/documents/:id', async (req, res) => {
    const borrowerMtg = await BorrowerMtg.findById(req.params.id)
    res.render('borrowersMtg/documents', { borrowerMtg: borrowerMtg })
  })
  
  //this is the Bene maker with making it easy for the borrower to see savings
  
  router.get('/benefit/:id', async (req, res) => {
    const borrowerMtg = await BorrowerMtg.findById(req.params.id)
    res.render('borrowersMtg/benefit', { borrowerMtg: borrowerMtg })
  })
  
  router.get('/incomeCalc/:id', async (req, res) => {
    const borrowerMtg = await BorrowerMtg.findById(req.params.id)
    res.render('borrowersMtg/incomeCalc', { borrowerMtg: borrowerMtg })
  })
  







//if borrower is selected

  /// We are assuming the client is already on the borrowers page so dont need to search for ID again

  module.exports = router


