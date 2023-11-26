/** @format */
const passport = require("passport");

// Passport
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const passportLocalMongoose = require("passport-local-mongoose");

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);

      if (!user) {
        return done(null, false, { message: "No user with that email" });
      }

      // Log the user object to check its structure
      console.log("User object:", user);

      // Use passport-local-mongoose's authenticate method for comparing passwords
      user.authenticate(password, (err, isValid) => {
        if (err) {
          return done(err);
        }

        if (isValid) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Password incorrect" });
        }
      });
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id);
      done(null, user);
    } catch (e) {
      return done(e);
    }
  });
}

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("User is authenticated.");
    return next();
  }

  console.log("User is not authenticated.");
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

module.exports = { initialize, checkAuthenticated, checkNotAuthenticated };
