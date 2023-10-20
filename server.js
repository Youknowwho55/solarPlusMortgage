// what is app.set('views', path.join(__dirname, 'views'))????/


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const ejs = require("ejs");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy; 
const logger = require('morgan');






const app = express()
const port = process.env.PORT || 3000;


const BorrowerMtg = require('./models/borrowerMtg')
const Comment = require('./models/comment')
const User = require('./models/user')



const borrowerMtgRouter = require('./routes/borrowersMtg')
const commentRouter = require('./routes/comments')
const dashboardRouter = require('./routes/dashboards')
//const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')


mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true, useUnifiedTopology: true 
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layouts/layout')


app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'This is a test Secret',
  resave: false,
  saveUninitialized: false,
  //NEED TO UPDATE THIS
//  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
app.use(passport.authenticate('session'));

app.use(passport.initialize());
app.use(passport.session());


passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//END OF PASSPORT

// All the same code
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));
app.use(express.static("public"));


app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))
app.use(expressLayouts)
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


//this renders the main page of the dashboars. Might need to change to have individual users
app.get('/', async (req, res) => {
  const borrowermtgs = await BorrowerMtg.find().sort({ createdAt: 'desc' })
  res.render('mainDashboard/index', { borrowermtgs: borrowermtgs })
})




app.use('/borrowersMtg', borrowerMtgRouter)
app.use('/', dashboardRouter)
app.use('/comment', commentRouter)
app.use('/', authRouter)






passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));





app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
 });
 


//brew services start mongodb-community@7.0
//brew services stop mongodb-community@7.0

// mongosh
// show dbs


//db.borrowermtgs.find()









