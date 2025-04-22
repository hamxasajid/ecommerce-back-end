// models/Cart.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  product: {
    title: String,
    price: Number,
    image: String,
    quantity: {
      type: Number,
      default: 1,
    },
  },
});

module.exports = mongoose.model("carts", cartSchema);
