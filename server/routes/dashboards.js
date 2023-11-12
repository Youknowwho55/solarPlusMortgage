/** @format */

const User = require("../models/user");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

router.get("/messages", dashboardController.getMessages);
router.get("/analytics", dashboardController.getAnalytics);
router.get("/guides", dashboardController.getGuides);
router.get("/marketData", dashboardController.getMarketData);

router.get("/workbook/:id", dashboardController.getWorkbookID);
router.get("/conditions/:id", dashboardController.getConditionsID);
router.get("/documents/:id", dashboardController.getDocumentsID);
router.get("/benefit/:id", dashboardController.getBenefitID);
router.get("/income/:id", dashboardController.getIncomeID);
// router.get("/income/employer/:id", dashboardController.getEmployerID);
// router.get("/income/calculate/:id", dashboardController.getIncomeCalcID);

module.exports = router;
