const express = require('express')
const User = require('../models/user')
const router = express.Router()
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");



router.get('/login', function(req, res, next) {
    res.render('register/login', { layout: false });
  });



  // NEED TO MAKE SURE THIS REDIRECTS TO THE DASHBOARD PAGE
  // ADD ID FOR USER TO LOGIN TO THEIR OWN DASHBOARD
  router.post("/login", function (req, res) { 
	if (!req.body.username) { 
		res.json({ success: false, message: "Username was not given" }) 
	} 
	else if (!req.body.password) { 
		res.json({ success: false, message: "Password was not given" }) 
	} 
	else { 
		passport.authenticate("local", function (err, user, info) { 
			if (err) { 
				res.json({ success: false, message: err }); 
			} 
			else { 
				if (!user) { 
					res.json({ success: false, message: "username or password incorrect" }); 
				} 
				else { 
					const token = jwt.sign({ userId: user._id, username: user.username }, secretkey, { expiresIn: "24h" }); 
					res.json({ success: true, message: "Authentication successful", token: token }); 
                    res.render("mainDashboard/index")
				} 
			} 
		})(req, res); 
	} 
}); 


  


  //THIS ISNT WORKING
  router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });



  router.get('/register', function(req, res, next) {
    res.render('register/register', { layout: false });
  });



  //NEED TO ADD IN RES.REDIRECT!!!

  router.post("/register", function (req, res) { 
	User.register(new User({ email: req.body.email, username: req.body.username }), req.body.password, function (err, user) { 
		if (err) { 
			res.json({ success: false, message: "Your account could not be saved. Error: " + err }); 
		} 
		else { 
			req.login(user, (er) => { 
				if (er) { 
					res.json({ success: false, message: er }); 
				} 
				else { 
					res.json({ success: true, message: "Your account has been saved" }); 
                    res.render("mainDashboard/index")
				} 
			}); 
		} 
	}); 
}); 




// user is your result from userschema using mongoose id TO SET PASSWORD
// user.setPassword(req.body.password, function(err, user){ ..


// // user is your result from userschema using mongoose id to change password
// user.changePassword(req.body.oldpassword, req.body.newpassword, function(err) ...






  module.exports = router






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
