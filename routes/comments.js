const express = require('express')
const BorrowerMtg = require('../models/comment')
const router = express.Router()



router.post('/newComment', async (req, res, next) => {
    req.borrowerMtg = new BorrowerMtg()
    next()
  }, saveCommentMtgAndRedirect('new'))




  function saveCommentMtgAndRedirect() {
    return async (req, res) => {
      let comment = req.comment
      comment.username = "User"
      comment.comment = req.body.comment
//      comment.date = req.body.email
  
      try {
        comment = await comment.save()
        res.redirect(`/borrowersMtg/${borrowerMtg.id}`)
      } catch (e) {
        res.render(`borrowersMtg/${borrowerMtg.id}`, { comment: comment })
      }
    }
  }


  module.exports = router