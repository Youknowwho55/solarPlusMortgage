const mongoose = require('mongoose')


const borrowerMtgSchema = new mongoose.Schema(
    {
  name:{
    type: string,
    required: true
  },

  lender: {
    type: String,default: TBD
  },
  loanNumber: {
    type: number,default: ""
  },
  initialDocsSigned: {
    type: date,
  },  
  closingDicsSigned: {
    type: date,
  },  
  referral: {
    type: String,required: true
  },
  createdAt: {
    type: Date, default: Date.now
   }

})


module.exports = mongoose.model('borrowerMtg', borrowerMtgSchema)