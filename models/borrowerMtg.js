const mongoose = require('mongoose')


const borrowerMtgSchema = new mongoose.Schema(
    {
  name:{
    type: String,
    required: true
  },
  address:{
    type: String
  },
  lender: {
    type: String,default: "TBD"
  },
  loanNumber: {
    type: Number
  },
  initialDocsSigned: {
    type: Date
  },  
  closingDicsSigned: {
    type: Date
  },  
  referral: {
    type: String
  },
  loanStatus: {
    type: String, default: "NEW"
   },
  createdAt: {
    type: Date, default: Date.now
   }
})


module.exports = mongoose.model('BorrowerMtg', borrowerMtgSchema)