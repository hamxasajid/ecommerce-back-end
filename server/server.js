require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const db = require("./Connection.js");
const Product = require("./Models/productModel.js");
const User = require("./Models/userModel.js");

const app = express();
app.use(express.json());
app.use(cors());

// Signin Route
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  // Check password validity
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid password" });
  }

  res.json({ success: true, message: "Login successfully", user });
});

// Signup Route
app.post("/signup", async (req, res) => {
  const { name, email, contact, password, address } = req.body;

  try {
    // Check if email or contact already exists
    const existingUser = await User.findOne({ $or: [{ email }, { contact }] });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email or Contact Number Already Exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      contact,
      password: hashedPassword,
      address,
    });
    await newUser.save();

    res.status(200).json({ success: true, message: "User created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Product Routes (Optional)
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
    const product = await Product.create(req.body); // ⬅️ this is for a single object
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET product by id (for update prefill)
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ id: parseInt(id) });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching product", error });
  }
});

// PUT update product
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: parseInt(id) },
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "❌ Error updating product", error });
  }
});

app.delete("/products/:id", async (req, res) => {
  // Delete by 'id' field
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findOneAndDelete({ id: parseInt(id) });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: "❌ Error deleting product", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
