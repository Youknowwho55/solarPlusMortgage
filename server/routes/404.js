/** @format */

const express = require("express");
const router = express.Router();
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middleware/checkAuth");

router.get("*", checkAuthenticated, function (req, res) {
  res.render("404");
});

module.exports = router;
