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
app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('mainDashboard/index', { articles: articles })
})

app.get('/', async (req, res) => {
  const borrowersMtg = await BorrowerMtg.find().sort({ createdAt: 'desc' })
  res.render('mainDashboard/index', { borrowersMtg: borrowersMtg })
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





// <!-- <% borrowersMtg.forEach(borrowerMtg => { %>
//   <div class="card mt-4">
//     <div class="card-body">
//       <h4 class="card-title"><%= borrowerMtg.name %></h4>
//       <div class="card-subtitle text-muted mb-2">
//         <%= borrowerMtg.createdAt.toLocaleDateString() %>
//       </div>
//       <a href="borrowerMtg/<%= borrowerMtg.id %>" class="btn btn-primary">Enter</a>
      
//     </div>
//   </div>
// <% }) %>--> 