/** @format */

const BorrowerMtg = require("../models/borrowerMtg");

const User = require("../models/user");

//Direct to the Login
exports.getLogin = async (req, res) => {
  try {
    const locals = {
      title: "Login",
      description: "login",
    };
    res.render("register/login", { locals, layout: false, users: users });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//Direct to the Users ID Page
exports.getUser = async (req, res) => {
  try {
    const users = await User.findById(req.params.id);

    const locals = {
      title: "User",
      description: "View the User Information",
      users: users,
    };

    res.render("user/userIndex", locals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Post Route to Add User
exports.addUser = async (req, res) => {
  User.register(
    new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      company: req.body.company,
      role: req.body.role,
    }),
    req.body.password,
    function (err, user) {
      if (err) {
        res.json({
          success: false,
          message: "Your account could not be saved. Error: " + err,
        });
      } else {
        req.login(user, (er) => {
          if (er) {
            res.json({ success: false, message: er });
          } else {
            res.json({ success: true, message: "Your account has been saved" });
            res.render("mainDashboard/index");
          }
        });
      }
    }
  );
};

// exports.postLogin = async (req, res) => {
//   try {
//     const locals = {
//       title: "Login",
//       description: "login",
//     };
//     passport.authenticate("local", {
//       failureRedirect: "/login",
//       locals,
//       layout: false,
//     }),
//       res.redirect("/");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };

exports.postLogout = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

/// update here

// NEED TO MAKE SURE THIS REDIRECTS TO THE DASHBOARD PAGE
// ADD TD FOR USER TO LOGIN TO THEIR OWN DASHBOARD
//   .post("/login", function (req, res) {
// 	if (!req.body.username) {
// 		res.json({ success: false, message: "Username was not given" })
// 	}
// 	else if (!req.body.password) {
// 		res.json({ success: false, message: "Password was not given" })
// 	}
// 	else {
// 		passport.authenticate("local", function (err, user, info) {
// 			if (err) {
// 				res.json({ success: false, message: err });
// 			}
// 			else {
// 				if (!user) {
// 					res.json({ success: false, message: "username or password incorrect" });
// 				}
// 				else {
// 					const token = jwt.sign({ userId: user._id, username: user.username }, secretkey, { expiresIn: "24h" });
// 					res.json({ success: true, message: "Authentication successful", token: token });
//                     res.render("mainDashboard/index")
// 				}
// 			}
// 		})(req, res);
// 	}
// });
