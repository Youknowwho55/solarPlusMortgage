/** @format */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//need to add this in
const LOANSTATS = {
  NEW: "new", // new
  NOS: "nos", //no sale - remove
  SOLD: "sold", // sold - keeping in process
  DOCO: "doco", // docs out
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
    street: {
      type: String,
    },
    streetLine2: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: String,
    },
  },
  lender: {
    type: String,
    default: "TBD",
  },
  loanNumber: {
    type: Number,
  },
  initialDocsSigned: {
    type: String,
  },
  closingDocsSigned: {
    type: String,
  },
  referralSource: {
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
  user: {
    type: Schema.ObjectId,
    ref: "user",
  },
  mortgageLoan: {
    type: Schema.Types.ObjectId,
    ref: "workbook",
  },

  incomes: [
    {
      employerName: String,
      incomeType: String,
      monthlyAmount: Number,
    },
  ],
});

const mortgageLoanSchema = new mongoose.Schema({
  name: { type: String },
  baseLoanAmount: { type: Number },
  fundingFee: { type: Number },
  totalLoanAmount: { type: Number },
  interestRate: { type: Number },
  amortizedMonths: { type: Number, default: 360 },
});

module.exports = {
  BorrowerMtg: mongoose.model("BorrowerMtg", borrowerMtgSchema),
};
