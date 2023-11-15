/** @format */

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: new Date().toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }),
  },
  borrowersMtg: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "borrowersMtg",
  },
});

module.exports = mongoose.model("Comment", commentSchema);
