/** @format */
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const passport = require("passport");

// Passport
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("../models/user");

function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401);
      return res.send("Not allowed");
    }

    next();
  };
}

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);

      if (!user) {
        return done(null, false, { message: "No user with that email" });
      }

      // // Log the user object to check its structure
      // console.log("User object:", user);

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
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

//Google Oauth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/solarplusmtg",
      passReqToCallback: true, // Add this line
    },
    async function (req, accessToken, refreshToken, profile, done) {
      try {
        // Check if the user is already authenticated
        if (req.isAuthenticated()) {
          // The user is already logged in, link their Google account
          const user = req.user;

          // Check if the user already has a Google ID linked
          if (!user.googleId) {
            // Update the user with the Google ID
            user.googleId = profile.id;

            // Save the user to the database
            await user.save();

            return done(null, user);
          } else {
            // Google ID is already linked to this account
            return done(null, user);
          }
        } else {
          // The user is not authenticated, check if there's an existing user with the Google ID
          const existingUser = await User.findOne({ googleId: profile.id });

          if (existingUser) {
            // User with this Google ID already exists, log them in
            return done(null, existingUser);
          } else {
            // No existing user with this Google ID, create a new user or handle as needed
            // You may choose to create a new user or handle this case based on your requirements
            // For now, let's create a new user with the Google ID
            const newUser = new User({
              googleId: profile.id,
              // Add other properties as needed
            });

            // Save the new user to the database
            await newUser.save();

            return done(null, newUser);
          }
        }
      } catch (error) {
        console.error(error);
        return done(error, null);
      }
    }
  )
);

module.exports = {
  initialize,
  checkAuthenticated,
  checkNotAuthenticated,
  authRole,
};
