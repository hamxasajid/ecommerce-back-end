import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    stock: "",
    rate: "",
    count: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      id: product.id,
      title: product.title,
      price: parseFloat(product.price),
      description: product.description,
      category: product.category,
      image: product.image,
      stock: parseInt(product.stock),
      rating: {
        rate: parseFloat(product.rate),
        count: parseInt(product.count),
      },
    };

    try {
      const response = await fetch("http://localhost:5000/addproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Product added:", result);
        alert("Product added successfully!");

        // Reset form
        setProduct({
          id: "",
          title: "",
          price: "",
          description: "",
          category: "",
          image: "",
          stock: "",
          rate: "",
          count: "",
        });
      } else {
        const errorText = await response.text();
        console.error("❌ Error:", errorText);
        alert("Failed to add product: " + errorText);
      }
    } catch (error) {
      console.error("❌ Network Error:", error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2
        className="text-center text-white py-3"
        style={{ backgroundColor: "#ff4f00" }}
      >
        Add Product
      </h2>
      <div className="card p-4" style={{ backgroundColor: "#f8f9fa" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">ID</label>
            <input
              type="text"
              className="form-control"
              name="id"
              value={product.id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={product.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Price</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Category</label>
            <input
              type="text"
              className="form-control"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Image URL</label>
            <input
              type="text"
              className="form-control"
              name="image"
              value={product.image}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Stock</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Rating (Rate)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                className="form-control"
                name="rate"
                value={product.rate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Rating (Count)</label>
              <input
                type="number"
                className="form-control"
                name="count"
                value={product.count}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100 text-white fw-bold"
            style={{ backgroundColor: "#ff7f50" }}
          >
            <i className="bi bi-plus-circle me-2"></i> Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
