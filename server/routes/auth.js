/** @format */

const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/User", authController.getUser);

router.get("/login", authController.getLogin);

// router.post("/", mainController.postlogin);
router.post("/AddUser", authController.addUser);
router.post("/logout", authController.postLogout);

//Edit
// router.get("/EditUser", mainController.editUser);

module.exports = router;

// // passport.use(new GoogleStrategy({
// //     clientID: process.env.CLIENT_ID,
// //     clientSecret: process.env.CLIENT_SECRET,
// //     callbackURL: "http://localhost:3000/auth/google/secrets",
// //     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
// //   },
// //   function(accessToken, refreshToken, profile, cb) {
// //     console.log(profile);

// //     User.findOrCreate({ googleId: profile.id }, function (err, user) {
// //       return cb(err, user);
// //     });
// //   }
// // ));

// // app.get("/auth/google",
// //   passport.authenticate('google', { scope: ["profile"] })
// // );

// // app.get("/auth/google/secrets",
// //   passport.authenticate('google', { failureRedirect: "/login" }),
// //   function(req, res) {
// //     // Successful authentication, redirect to secrets.
// //     res.redirect("/secrets");
// //   });

// app.get("/submit", function(req, res){
//   if (req.isAuthenticated()){
//     res.render("submit");
//   } else {
//     res.redirect("/login");
//   }
// });

// app.post("/submit", function(req, res){
//   const submittedSecret = req.body.secret;

//Once the user is authenticated and their session gets saved, their user details are saved to req.user.
// console.log(req.user.id);

//   User.findById(req.user.id, function(err, foundUser){
//     if (err) {
//       console.log(err);
//     } else {
//       if (foundUser) {
//         foundUser.secret = submittedSecret;
//         foundUser.save(function(){
//           res.redirect("/secrets");
//         });
//       }
//     }
//   });
// // });

//   passport.serializeUser(function(user, cb) {
//     process.nextTick(function() {
//       cb(null, { id: user.id, username: user.username });
//     });
//   });

//   passport.deserializeUser(function(user, cb) {
//     process.nextTick(function() {
//       return cb(null, user);
//     });
//   });
