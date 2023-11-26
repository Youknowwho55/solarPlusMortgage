/** @format */

const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middleware/checkAuth");

router.put("/newComment/:id", commentController.addComment);

module.exports = router;
