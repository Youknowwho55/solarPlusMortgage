/** @format */

const express = require("express");
const router = express.Router();

const incomeCalcController = require("../controllers/incomeCalcController");

const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middleware/checkAuth");

router.get("/w2", incomeCalcController.getW2);
// router.get("/scheduleC", incomeController.getScheduleC);
// router.get("/realestate", incomeController.getRealEstate);
// router.get("/corporate", incomeController.getCorporate);
// router.get("/partnership", incomeController.getPartner);
// router.get("/1099", incomeController.get1099Income);

//put to update income
// router.put("/w2", incomeController.putW2);
// router.put("/scheduleC", incomeController.putScheduleC);
// router.put("/realestate", incomeController.putRealEstate);
// router.put("/corporate", incomeController.putCorporate);
// router.put("/partnership", incomeController.putPartner);
// router.put("/1099", incomeController.put1099Income);

module.exports = router;
