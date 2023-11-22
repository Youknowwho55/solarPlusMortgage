/** @format */

const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  email: { type: String },
  business: { type: Date },
});

module.exports = mongoose.model("Partners", PartnerSchema);
