const mongoose = require("mongoose");

const db = mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

module.exports = mongoose;
