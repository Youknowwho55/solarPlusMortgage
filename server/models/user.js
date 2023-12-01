/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const ROLE = {
  ADMIN: "admin",
  LO: "lo",
  MANAGER: "manager",
  ALLSALES: "allSales",
  PROCESSOR: "processor",
};

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true, required: true },
  company: { type: String },
  role: { type: String },
  nmls: { type: String },
  createdAtUser: {
    type: Date,
    default: Date.now,
  },
  googleId: { type: String },
  borrowerMtg: [{ type: mongoose.Schema.Types.ObjectId, ref: "BorrowerMtg" }],
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", UserSchema);
