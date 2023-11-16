/** @format */

const models = require("../models/borrowerMtg");
const BorrowerMtg = models.BorrowerMtg;

const user = require("../models/user");
const User = models.user;

exports.getAdmin = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAtUser: "desc" });
    const locals = {
      title: "Admin",
      description: "Admin Dashboard",
    };
    res.render("mainDashboard/adminDashboard", { locals, users });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getRegister = async (req, res) => {
  try {
    const locals = {
      title: "Register",
      description: "Admin Dashboard",
    };
    res.render("register/register", { locals, users: users, layout: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.postRegister = async (req, res) => {
  User.register(
    new User({ email: req.body.email, username: req.body.username }),
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

exports.getLogin = async (req, res) => {
  try {
    const locals = {
      title: "Login",
      description: "login",
    };
    res.render("register/login", { locals, layout: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
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
