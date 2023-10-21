const express = require('express')
const BorrowerMtg = require('./../models/borrowerMtg')
const router = express.Router()





// router.get('/new', (req, res) => {
//   res.render('borrowersMtg/new', { borrowerMtg: new BorrowerMtg() })
// })

router.get('/edit/:id', async (req, res) => {
  const borrowerMtg = await BorrowerMtg.findById(req.params.id)
  res.render('borrowersMtg/edit', { borrowerMtg: borrowerMtg })
})


router.get('/:id', async (req, res) => {
  const borrowerMtg = await BorrowerMtg.findById(req.params.id )
  if (borrowerMtg == null) res.redirect('/')
  //UPDATED TO HAVE MAIN FILE INSTEAD OF /SHOW
  res.render('borrowersMtg/mainFile', { borrowerMtg: borrowerMtg })
})





router.post('/', async (req, res, next) => {
  req.borrowerMtg = new BorrowerMtg()
  next()
}, saveBorrowerMtgAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  req.borrowerMtg = await BorrowerMtg.findById(req.params.id)
  next()
}, saveBorrowerMtgAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
  await BorrowerMtg.findByIdAndDelete(req.params.id)
  res.redirect('/')
})
 

function saveBorrowerMtgAndRedirect(path) {
  return async (req, res) => {
    let borrowerMtg = req.borrowerMtg
    borrowerMtg.firstName = req.body.firstName
    borrowerMtg.lastName = req.body.lastName
    borrowerMtg.phoneNumber = req.body.phoneNumber
    borrowerMtg.email = req.body.email

    try {
      borrowerMtg = await borrowerMtg.save()
      res.redirect(`/borrowersMtg/${borrowerMtg.id}`)
    } catch (e) {
      res.render(`borrowersMtg/${path}`, { borrowerMtg: borrowerMtg })
    }
  }
}




// //NEED TO REMOVE THE SLUG FROM HERE
// function saveArticleAndRedirect(path) {
//     return async (req, res) => {
//       let article = req.article
//       article.title = req.body.title
//       article.description = req.body.description
//       try {
//         article = await article.save()
//         res.redirect(`/articles/${article.id}`)
//       } catch (e) {
//         res.render(`articles/${path}`, { article: article })
//       }
//     }
//   }
  




//do it need to rename this a new router
module.exports = router