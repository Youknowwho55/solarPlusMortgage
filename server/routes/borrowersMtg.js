/** @format */

const express = require("express");
const router = express.Router();
const borrowerMtgController = require("../controllers/borrowerMtgController");

// need to look at old routes/borrowersMtg.js  This code is gonna be fucked and not save
// router.get("/edit/:id", borrowerMtgController.getBorrowerMtgEdit);
router.get("/:id", borrowerMtgController.getBorrowerMtgById);
router.post("/", borrowerMtgController.createBorrowerMtg);
router.put("/:id", borrowerMtgController.updateBorrowerMtg);
router.put("/people/:id", borrowerMtgController.updatePeople);
router.delete("/:id", borrowerMtgController.deleteBorrowerMtg);

module.exports = router;
