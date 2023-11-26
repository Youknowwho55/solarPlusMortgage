/** @format */

const express = require("express");
const router = express.Router();
const borrowerMtgController = require("../controllers/borrowerMtgController");
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middleware/checkAuth");

// need to look at old routes/borrowersMtg.js  This code is gonna be fucked and not save
// router.get("/edit/:id", borrowerMtgController.getBorrowerMtgEdit);
router.get(
  "/:id",
  checkAuthenticated,
  borrowerMtgController.getBorrowerMtgById
);
router.post("/", borrowerMtgController.createBorrowerMtg);
router.get("/Modal/:id", borrowerMtgController.getBorrowerMtgModal);
router.post("/Modal/:id", borrowerMtgController.updateBorrowerMtgModal);
router.put("/:id", borrowerMtgController.updateBorrowerMtg);
router.put("/people/:id", borrowerMtgController.updatePeople);
router.delete("/:id", borrowerMtgController.deleteBorrowerMtg);

module.exports = router;
