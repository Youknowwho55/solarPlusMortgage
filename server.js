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


const app = express()
const port = process.env.PORT || 3000;


const BorrowerMtg = require('./models/borrowerMtg')
const borrowerMtgRouter = require('./routes/borrowersMtg')

const dashboardRouter = require('./routes/dashboards')


mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true, useUnifiedTopology: true 
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layouts/layout')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));


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


app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
 });
 


//brew services start mongodb-community@7.0
//brew services stop mongodb-community@7.0

// mongosh
// show dbs


//db.borrowermtgs.find()



