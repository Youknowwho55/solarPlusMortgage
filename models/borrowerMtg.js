/** @format */

const mongoose = require("mongoose");

const LOANSTATS = {
  NEW: "new", // new
  NOS: "nos", //no sale - remove
  SOLD: "sold", // sold - keeping in process
  do: "do", // docs out
  AWC: "awc", // approved with conditions
  UND: "und", // with underwriting
  CTC: "ctc", // clear to close
  FUN: "fun", // funded
  COMP: "comp", // completed -- remove
};

const borrowerMtgSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  lender: {
    type: String,
    default: "TBD",
  },
  loanNumber: {
    type: Number,
  },
  initialDocsSigned: {
    type: Date,
  },
  closingDicsSigned: {
    type: Date,
  },
  referral: {
    type: String,
  },
  loanStatus: {
    type: String,
    default: "NEW",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  loanOfficer: {
    type: String,
    default: "",
  },
  processor: {
    type: String,
    default: "",
  },
  referral: {
    type: String,
    default: "",
  },
});

const mortgageLoanSchema = new mongoose.Schema({
  name: { type: String },
  baseLoanAmount: { type: Number },
  fundingFee: { type: Number },
  totalLoanAmount: { type: Number },
  interestRate: { type: Number },
  amortizedMonths: { type: Number, default: 360 },
});

// const mtgConditionsSchema = new mongoose.Schema(
//   {
//   _id:{type: String},
//   conditions:{type: String},
//   requestedDate: {type: Date},
//   CpmpletedDate: {type: Date},
//   clearedDate: {type: Date},
//   conditionNotes: {type: String}
//   })

module.exports = mongoose.model("MortgageLoanSchema", mortgageLoanSchema);
module.exports = mongoose.model("BorrowerMtg", borrowerMtgSchema);
// module.exports = mongoose.model('mtgConditions', mtgConditionsSchema)
