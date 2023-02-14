const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authSchema = new Schema({
  //유저정보
  username: String,
  password: String,
});

module.exports = mongoose.model("auth", authSchema);
