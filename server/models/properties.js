/** @format */

const mongoose = require("mongoose");

const propertiesSchema = new mongoose.Schema({
  street: { type: String },
  streetLine2: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  occupancy: { type: String },
  mortgageHolder: { type: String },
  originalAmount: { type: Number },
  loanAmount: { type: Number },
  dateOpened: { type: Date },
  rate: { type: Number },
  term: { type: Number },
  mortgagePayment: { type: Number },
  propertyTax: { type: Number },
  propertyInsurance: { type: Number },
  propertyHOA: { type: Number },
  borrowersMtg: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "borrowersMtg",
  },
});

module.exports = mongoose.model("Properties", propertiesSchema);
