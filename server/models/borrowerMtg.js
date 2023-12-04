/** @format */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
      required: true,
    },
    streetLine2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
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
    ref: "MortgageLoan",
  },

  employer: {
    type: Schema.Types.ObjectId,
    ref: "Employer",
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

const employerSchema = new mongoose.Schema({
  employerName: { type: String },
  employerStreet: { type: Number },
  employerStreetLine2: { type: Number },
  employerCity: { type: Number },
  employerState: { type: Number },
  employerZipCode: { type: Number },
  incomeType: { type: String },
  monthlyAmount: { type: Number },
});

module.exports = {
  BorrowerMtg: mongoose.model("BorrowerMtg", borrowerMtgSchema),
  MortgageLoan: mongoose.model("MortgageLoan", mortgageLoanSchema),
  Employer: mongoose.model("Employer", employerSchema),
};

// module.exports = mongoose.model('mtgConditions', mtgConditionsSchema)
