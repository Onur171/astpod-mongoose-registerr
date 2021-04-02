const mongoose = require("mongoose");

const member = mongoose.Schema({
  SunucuID: String,
  userID: String,
  isimler: Array,
  yetkili: String,
  teyitci: { erkek: { type: Number, default: 0 }, kız: { type: Number, default: 0 }, members: Array }
});

module.exports = mongoose.model("members", member);
