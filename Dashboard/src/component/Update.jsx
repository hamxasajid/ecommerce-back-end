import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct({
            id: data.id,
            title: data.title,
            price: data.price,
            description: data.description,
            category: data.category,
            image: data.image,
            stock: data.stock,
            rate: data.rating?.rate || "",
            count: data.rating?.count || "",
          });
        } else {
          alert("❌ Failed to fetch product");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Error fetching product data.");
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
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
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (res.ok) {
        alert("✅ Product updated successfully!");
        navigate("/allProducts");
      } else {
        const errText = await res.text();
        alert("❌ Failed to update: " + errText);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2
        className="text-center text-white py-3"
        style={{ backgroundColor: "#1C45C1" }}
      >
        Update Product
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
              disabled // ID should not be editable
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
            style={{ backgroundColor: "#1C45C1" }}
          >
            <i className="bi bi-pencil-square me-2"></i> Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
