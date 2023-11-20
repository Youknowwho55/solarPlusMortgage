/** @format */

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate");
const crypto = require("crypto");
const LocalStrategy = require("passport-local").Strategy;
const logger = require("morgan");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const User = require("./server/models/user");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");

//app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.use(
  session({
    secret: "This is a test Secret",
    resave: false,
    saveUninitialized: false,
    //NEED TO UPDATE THIS
    // store: MongoStore.create({
    //   mongoUrl: process.env.MONGODB_URI
  })
);
app.use(passport.authenticate("session"));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//END OF PASSPORT

app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// All routes
app.use("/borrowersMtg", require("./server/routes/borrowersMtg"));
app.use("/", require("./server/routes/modules"));
app.use("/comments", require("./server/routes/comments"));
app.use("/", require("./server/routes/auth"));
app.use("/", require("./server/routes/index"));
app.use("/", require("./server/routes/404"));

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
