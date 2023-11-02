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
    type: Date,
    default: Date.now,
  },

  //  id: {
  //    type: String,
  //   }
});

// {
//   "_id": ObjectId,
//   "lead_id": ObjectId,
//   "user_id": ObjectId,
//   "username": String,    // Username of the commenter
//   "comment": String,
//   "date": Date
// }

module.exports = mongoose.model("Comment", commentSchema);
