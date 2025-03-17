require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./Connection.js");
const Product = require("./Models/productModel.js");

db;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching products", error });
  }
});

app.post("/addproducts", async (req, res) => {
  try {
    const products = await Product.insertMany(req.body);
    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
