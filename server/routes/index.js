/** @format */

const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

/**
 * App Routes
 */
router.get("/", mainController.dashboardSales);
router.get("/", mainController.dashboardSettings);

module.exports = router;