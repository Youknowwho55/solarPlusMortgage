const mongoose = require('mongoose')


const borrowerMtgSchema = new mongoose.Schema(
    {
    firstName:{
    type: String,
    required: true
  },
    lastName:{
    type: String,
    required: true
  },
    phoneNumber:{
    type: String,
  },
    email:{
    type: String,
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



const mortgageLoanSchema = new mongoose.Schema(
  {
  name:{type: String},
  baseLoanAmount:{type: Number},
  fundingFee: {type: Number},
  totalLoanAmount: {type: Number}, 
  interestRate: {type: Number},
  amortizedMonths: {type: Number,default: 360}
  })
  
  
  
  
  
  
module.exports = mongoose.model('MortgageLoanSchema', mortgageLoanSchema)
module.exports = mongoose.model('BorrowerMtg', borrowerMtgSchema)