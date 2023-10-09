const express = require('express')
const BorrowerMtg = require('./../models/borrowerMtg')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('borrowersMtg/new', { borrowerMtg: new BorrowerMtg() })
})

router.get('/edit/:id', async (req, res) => {
  const borrowerMtg = await BorrowerMtg.findById(req.params.id)
  res.render('borrowersMtg/edit', { borrowerMtg: borrowerMtg })
})
// continue here

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
//THIS IS WHAT NEEDS TO BE UPDATED WITH A TON OF THE INFO
borrowerMtg.name = req.body.borrowerName
    try {
      borrowerMtg = await borrowerMtg.save()
      res.redirect(`/borrowersMtg/${borrowerMtg.id}`)
    } catch (e) {
      res.render(`borrowersMtg/${path}`, { borrowerMtg: borrowerMtg })
    }
  }
}


//do it need to rename this a new router
module.exports = router