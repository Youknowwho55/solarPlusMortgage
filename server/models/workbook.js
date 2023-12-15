/** @format */

// models/loanData.js
const mongoose = require("mongoose");

const workbookSchema = new mongoose.Schema({
  monthlySavings: Number,
  annualSavings: Number,
  debtPaid: Number,
  paymentmReduction: Number,
  recoup: Number,
  PropertyType: String,
  occupancy: String,
  loanType: String,
  newTerm: Number,
  loanPurpose: String,
  appraisalWaiver: Boolean,
  loanBalance1: Number,
  payment1: Number,
  oldTerm1: Number,
  oldRate1: Number,
  sub1: Boolean,
  // Add more fields based on your template
  // ...

  // Add fields for other sections, such as 'newLoan', 'benetobwr', 'otherFees', etc.
  marketValue: Number,
  salesPrice: Number,
  downPayment: Number,
  baseLoanAmount: Number,
  subordinatedAmount: Number,
  ffUmip: Number,
  umipRefund: Number,
  totalLoanAmount: Number,
  noteRate: Number,

  // Add fields for other sections like 'benetobwr', 'otherFees', 'pricingSection', etc.
  // ...

  // Add fields for 'ConsumerDebt1' section
  consumerDebt: [
    {
      debtorName: String,
      creditType: String,
      balanceTotal: Number,
      monthlyDebtPayment: Number,
      termDebt: Number,
      rateDebt: Number,
      omitDebt: Boolean,
      paydebt: Boolean,
    },
  ],

  // Add fields for 'IncomeSection' section
  borrowersIncome: Number,
  coborrowersIncome: Number,
  frontRatio: Number,
  backRatio: Number,

  // Add more fields based on your template
  // ...
});

module.exports = {
  Workbook: mongoose.model("WorkbookDB", workbookSchema),
};
