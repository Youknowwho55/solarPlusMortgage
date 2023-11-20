/** @format */

const mongoose = require("mongoose");

const conditionsSchema = new mongoose.Schema({
  condition: {
    type: String,
  },
  description: {
    type: String,
  },
  notes: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  requestedDate: { type: Date },
  requestedBy: { type: String },
  CompletedDate: { type: Date },
  CompletedBy: { type: String },
  clearedDate: { type: Date },
  clearedBy: { type: String },
  borrowersMtg: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "borrowersMtg",
  },
});

module.exports = mongoose.model("Conditions", conditionsSchema);
