/** @format */

const express = require("express");
const BorrowerMtg = require("../models/comment");
const router = express.Router();

router.post("/submit-comment", (req, res) => {
  const username = req.body.username; // Get the username from the form data
  const commentText = req.body.commentText; // Get the comment text from the form data

  // Save the comment to the database, associating it with the username
  // ... (save to MongoDB or your chosen database)
});

router.post(
  "/newComment",
  async (req, res, next) => {
    req.borrowerMtg = new BorrowerMtg();
    next();
  },
  saveCommentMtgAndRedirect("new")
);

function saveCommentMtgAndRedirect() {
  return async (req, res) => {
    let comment = req.comment;
    comment.username = req.body.username;
    comment.comment = req.body.comment;
    //      comment.date = req.body.email

    try {
      comment = await comment.save();
      res.redirect(`/borrowersMtg/${borrowerMtg.id}`);
    } catch (e) {
      res.render(`borrowersMtg/${borrowerMtg.id}`, { comment: comment });
    }
  };
}

module.exports = router;
