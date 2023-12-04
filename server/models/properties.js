/** @format */

const mongoose = require("mongoose");

const propertiesSchema = new mongoose.Schema({
  borrowersMtg: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "borrowersMtg",
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
