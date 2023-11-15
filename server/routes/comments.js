/** @format */

const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.put("/newComment/:id", commentController.addComment);

module.exports = router;
