/** @format */

const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const {
  checkAuthenticated,
  checkNotAuthenticated,
  authRole,
} = require("../middleware/checkAuth");

router.get("/User", authRole("admin"), authController.getUserAdmin);
router.get("/login", checkNotAuthenticated, authController.getLogin);
router.get("/auth/google", authController.getGoogle);

router.get(
  "/auth/google/solarplusmtg",

  authController.getGoogleRedirect
);

// router.post("/", mainController.postlogin);
router.post("/AddUser", authController.addUser);
router.post("/login", checkNotAuthenticated, authController.postLogin);

router.post("/logout", authController.postLogout);
router.get("/logout", authController.getLogout);

//Edit
// router.get("/EditUser", mainController.editUser);

router.get("/ghl/initiate", require("../middleware/GHL/initiate"));

router.get("/ghl/refresh", require("../middleware/GHL/refresh"));

router.get("/ghl/oauth/callback", require("../middleware/GHL/callback"));

module.exports = router;
