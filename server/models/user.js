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
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true, required: true },
  company: { type: String },
  role: { type: String, default: "lo" },
  createdAtUser: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", UserSchema);