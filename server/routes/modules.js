/** @format */

const User = require("../models/user");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const express = require("express");
const router = express.Router();
const modulesController = require("../controllers/modulesController");

router.get("/messages", modulesController.getMessages);
router.get("/analytics", modulesController.getAnalytics);
router.get("/guides", modulesController.getGuides);
router.get("/marketData", modulesController.getMarketData);
router.get("/partners", modulesController.getPartners);

router.get("/workbook/:id", modulesController.getWorkbookID);
router.get("/conditions/:id", modulesController.getConditionsID);
router.get("/documents/:id", modulesController.getDocumentsID);
router.get("/benefit/:id", modulesController.getBenefitID);
router.get("/income/:id", modulesController.getIncomeID);
// router.get("/income/employer/:id", dashboardController.getEmployerID);
// router.get("/income/calculate/:id", dashboardController.getIncomeCalcID);

//postroute
router.post("/conditions/:id", modulesController.postConditions);
router.put("/conditions/:id", modulesController.putConditionsID);

module.exports = router;
