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
const flash = require("express-flash");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const users = require("./server/models/user");
const {
  initialize,
  checkAuthenticated,
  checkNotAuthenticated,
} = require("./server/middleware/checkAuth");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");
app.use(flash());

app.use(express.static("public"));

//passport
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//initialize Passport

initialize(
  passport,
  async (email) => {
    try {
      const user = await users.findOne({ email: email });
      return user;
    } catch (error) {
      throw error;
    }
  },
  async (id) => {
    try {
      const user = await users.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
);

app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// All routes
app.use("/borrowersMtg", require("./server/routes/borrowersMtg"));
app.use("/", require("./server/routes/modules"));
app.use("/comments", require("./server/routes/comments"));
app.use("/", require("./server/routes/auth"));
app.use("/", require("./server/routes/index"));
app.use("/", require("./server/routes/404"));
app.use("/", require("./server/routes/incomeCalc"));

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
