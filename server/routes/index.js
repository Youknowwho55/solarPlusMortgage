/** @format */

const express = require("express");
const router = express.Router();
const dashController = require("../controllers/dashController");
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middleware/checkAuth");
/**
 * App Routes
 */
router.get("/", checkAuthenticated, dashController.dashSales);
router.get("/solar", dashController.dashSolar);

router.get("/admin", dashController.getAdmin);
router.get("/processing", dashController.dashProcessing);
router.get("/settings", checkAuthenticated, dashController.dashSettings);

//possible Manager dashboard

module.exports = router;
