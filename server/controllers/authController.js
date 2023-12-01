/** @format */

const BorrowerMtg = require("../models/borrowerMtg");

const User = require("../models/user");
const passport = require("passport");

//Direct to the Login
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

exports.postLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    if (!user) {
      // Authentication failed
      req.flash("error", info.message); // assuming you're using flash messages
      return res.redirect("/login");
    }

    // Authentication succeeded
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return res.status(500).send("Internal Server Error");
      }

      // If "Remember Me" is checked, set a longer-lasting session
      if (req.body.rememberMe) {
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
      }

      return res.redirect("/");
    });
  })(req, res, next);
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

exports.postLogout = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/register/login");
  });
};

exports.getLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      // Handle error, if any
      console.error(err);
      return res.redirect("/");
    }

    // Redirect to the home page or a login page
    res.redirect("/");
  });
};

// OAuth with Google
exports.getGoogle = passport.authenticate("google", { scope: ["profile"] });

// Callback route after Google has authenticated the user
(exports.getGoogleRedirect = passport.authenticate("google", {
  failureRedirect: "/",
})),
  (req, res) => {
    // Successful authentication, redirect to the desired page
    res.redirect("/"); // Replace "/desired-page" with the actual route you want to redirect to
  };
