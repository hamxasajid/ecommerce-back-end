const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  rating: {
    rate: { type: Number, required: true },
    count: { type: Number, required: true },
  },
});

module.exports = mongoose.model("products", productSchema);
