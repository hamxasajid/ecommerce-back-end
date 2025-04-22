// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  contact: { type: String, unique: true, required: true },
  password: String,
  address: String,
  isLoggedIn: { type: Boolean, default: false }, // 👈 Add this line
});

module.exports = mongoose.model("users", userSchema);
