/** @format */

const express = require("express");
const router = express.Router();
const dashController = require("../controllers/dashController");
// const multer = require("multer");
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middleware/checkAuth");
/**
 * App Routes
 */
router.get("/", checkAuthenticated, dashController.dashSales);
router.get("/solar", checkAuthenticated, dashController.dashSolar);

router.get("/admin", checkAuthenticated, dashController.getAdmin);
router.get("/processing", checkAuthenticated, dashController.dashProcessing);
router.get("/settings", checkAuthenticated, dashController.dashSettings);

// router.post(
//   "/profileUpload",
//   upload.single("profilePhoto"),
//   dashController.postProfileUpload
// );

//possible Manager dashboard

module.exports = router;
