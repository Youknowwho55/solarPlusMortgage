/** @format */

const mongoose = require("mongoose");

const propertiesSchema = new mongoose.Schema({
  borrowerMtg: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BorrowerMtg", // Adjust the reference to match your model name
  },

  street: String,
  streetLine2: String,
  city: String,
  state: String,
  zipCode: String,
  occupancy: String,
  mortgageHolder: String,
  originalAmount: Number,
  loanAmount: Number,
  dateOpened: Date,
  rate: Number,
  term: Number,
  mortgagePayment: Number,
  propertyTax: Number,
  propertyInsurance: Number,
  propertyHOA: Number,
});

module.exports = mongoose.model("Properties", propertiesSchema);
