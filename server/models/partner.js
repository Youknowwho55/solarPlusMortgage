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
  business: { type: String }, // Assuming business is a string, not a date
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
});

module.exports = mongoose.model("Partners", PartnerSchema);
