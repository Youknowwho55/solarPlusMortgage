/** @format */

const express = require("express");
const router = express.Router();
const dashController = require("../controllers/dashController");

/**
 * App Routes
 */
router.get("/", dashController.dashSales);
router.get("/solar", dashController.dashSolar);

router.get("/admin", dashController.getAdmin);
router.get("/processing", dashController.dashProcessing);
router.get("/settings", dashController.dashSettings);

//possible Manager dashboard

module.exports = router;
