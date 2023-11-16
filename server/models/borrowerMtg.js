/** @format */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LOANSTATS = {
  NEW: "new", // new
  NOS: "nos", //no sale - remove
  SOLD: "sold", // sold - keeping in process
  DOCO: "do", // docs out
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

  mtgConditions: {
    type: Schema.Types.ObjectId,
    ref: "mtgConditions",
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
});

const mtgConditionsSchema = new mongoose.Schema({
  conditions: { type: String },
  requestedDate: { type: Date },
  CpmpletedDate: { type: Date },
  clearedDate: { type: Date },
  conditionNotes: { type: String },
});

module.exports = {
  BorrowerMtg: mongoose.model("BorrowerMtg", borrowerMtgSchema),
  MortgageLoan: mongoose.model("MortgageLoan", mortgageLoanSchema),
  Employer: mongoose.model("Employer", employerSchema),
  mtgConditions: mongoose.model("mtgConditions", mtgConditionsSchema),
};

// module.exports = mongoose.model('mtgConditions', mtgConditionsSchema)
