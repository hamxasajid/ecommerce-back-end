require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const db = require("./Connection.js");
const Product = require("./Models/productModel.js");
const User = require("./Models/userModel.js");
const Cart = require("./Models/Cart.js");

const app = express();
app.use(express.json());
app.use(cors());

// In your Signin Route (e.g. in routes or app.js)

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid password" });
  }

  // ✅ Update user's login status in database
  user.isLoggedIn = true;
  await user.save();

  res.json({
    success: true,
    message: "Login successfully",
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
  });
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

app.post("/add-to-cart", async (req, res) => {
  try {
    const { userId, product } = req.body;

    // 🛑 Check if user exists and is logged in
    const user = await User.findById(userId);

    if (!user || !user.isLoggedIn) {
      return res
        .status(401)
        .json({ error: "Unauthorized. Please login first." });
    }

    // ✅ Save item to cart
    const newItem = new Cart({ userId, product }); // store userId and product inside Cart
    await newItem.save();

    res.json({ success: true, message: "Item added to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to add item" });
  }
});

app.get("/all-cart", async (req, res) => {
  try {
    const userId = req.headers.userid; // read from headers (lowercase!)

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const cartItems = await Cart.find({ userId });

    if (!cartItems.length) {
      return res.status(404).json({ message: "No items in the cart" });
    }

    res.json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

app.delete("/carts/:productId", async (req, res) => {
  const userId = req.headers.userid;
  const productId = req.params.productId;

  if (!userId || !productId) {
    return res
      .status(400)
      .json({ error: "User ID and Product ID are required" });
  }

  try {
    const result = await Cart.deleteOne({
      _id: productId,
      userId: userId,
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found in cart" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Product removed from cart" });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    return res
      .status(500)
      .json({ success: false, error: "Server error while removing product" });
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
