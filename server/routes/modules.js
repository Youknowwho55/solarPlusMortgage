/** @format */

const User = require("../models/user");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middleware/checkAuth");
const express = require("express");
const router = express.Router();
const modulesController = require("../controllers/modulesController");

router.get("/messages", checkAuthenticated, modulesController.getMessages);
router.get("/analytics", checkAuthenticated, modulesController.getAnalytics);
router.get("/guides", checkAuthenticated, modulesController.getGuides);
router.get("/marketData", checkAuthenticated, modulesController.getMarketData);
router.get("/partners", checkAuthenticated, modulesController.getPartners);
router.get("/todo", checkAuthenticated, modulesController.getToDo);
router.get("/testTable", modulesController.getTestTable);

router.get(
  "/dashboard/search",
  checkAuthenticated,
  modulesController.getDashSearch
);

router.get(
  "/conditions/:id",
  checkAuthenticated,
  modulesController.getConditionsID
);
router.get(
  "/documents/:id",
  checkAuthenticated,
  modulesController.getDocumentsID
);
//Google
router.get(
  "/documents/:id",
  checkAuthenticated,
  modulesController.downloadGoogle
);

router.get("/benefit/:id", checkAuthenticated, modulesController.getBenefitID);
router.get("/income/:id", checkAuthenticated, modulesController.getIncomeID);
router.get(
  "/properties/:id",
  checkAuthenticated,
  modulesController.getPropertiesID
);
//tthis ID is that of the property  ID
router.get(
  "/propertieInfo/:id",
  checkAuthenticated,
  modulesController.getPropertieInfo
);

// router.get("/income/employer/:id", dashboardController.getEmployerID);
// router.get("/income/calculate/:id", dashboardController.getIncomeCalcID);

//postroute
router.post("/conditions/:id", modulesController.postConditions);
router.put("/conditions/:id", modulesController.putConditionsID);

router.get(
  "/workbook/:id",
  checkAuthenticated,
  modulesController.getWorkbookID
);

router.post(
  "/workbook/:id",
  checkAuthenticated,
  modulesController.postWorkbookID
);

router.post("/addIncome/:id", modulesController.postAddIncome);
router.post("/addProperties/:id", modulesController.postProperties);

router.post("/addPartner", modulesController.postAddPartner);

module.exports = router;
