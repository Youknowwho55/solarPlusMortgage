if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')


const port = 3000;


const Article = require('./models/article')
const articleRouter = require('./routes/articles')


const BorrowerMtg = require('./models/borrowerMtg')
const borrowerMtgRouter = require('./routes/borrowersMtg')


const app = express()

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))


mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true, useUnifiedTopology: true, 
})

//useCreateIndex: true
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))



//WILL NEED TO UPDATE THIS TO THE SAHBOARD ISTES
//cant have both being rendered at once?
// app.get('/', async (req, res) => {
//   const articles = await Article.find().sort({ createdAt: 'desc' })
//   res.render('mainDashboard/index', { articles: articles })
// })

app.get('/', async (req, res) => {
  const borrowermtgs = await BorrowerMtg.find().sort({ createdAt: 'desc' })
  res.render('mainDashboard/index', { borrowermtgs: borrowermtgs })
})




app.use('/articles', articleRouter)
app.use('/borrowersMtg', borrowerMtgRouter)


app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
 });
 


//brew services start mongodb-community@7.0
//brew services stop mongodb-community@7.0

// mongosh
// show dbs


//db.borrowermtgs.find()



//https://github.com/Youknowwho55/solarPlusMortgage.git

