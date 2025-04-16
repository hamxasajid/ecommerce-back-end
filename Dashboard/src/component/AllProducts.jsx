import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const deleted = await response.json();
        setProducts(products.filter((product) => product.id !== deleted.id));
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("❌ Error deleting product:", error);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-2 fw-bold text-center">📦 All Products</h2>
      <p className=" text-muted">
        Total Products: <strong>{products.length}</strong>
      </p>
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column align-items-start">
                <img
                  src={product.image}
                  alt={product.title}
                  className="mb-3"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                    flexShrink: 0,
                  }}
                />
                <h5 className="card-title fw-bold">{product.title}</h5>
                <p className="text-muted mb-1">Category: {product.category}</p>
                <p className="mb-3">${product.price}</p>
                <p className="mb-3" style={{ flex: 1 }}>
                  {product.description}
                </p>

                <div className="row w-100 mt-auto">
                  <div className="col-6">
                    <button
                      className="btn btn-sm btn-primary w-100 d-flex justify-content-center align-items-center gap-1"
                      onClick={() => handleEdit(product.id)}
                    >
                      <FaEdit /> Edit
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      className="btn btn-sm btn-danger w-100 d-flex justify-content-center align-items-center gap-1"
                      onClick={() => handleDelete(product.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="text-center mt-5">
            <p>No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
