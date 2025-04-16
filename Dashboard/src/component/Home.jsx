import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlusCircle, FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-5">👋 Welcome, Admin!</h2>

      <div className="row justify-content-center g-4">
        {/* New Product Card */}
        <div className="col-md-4">
          <div className="card text-center shadow-sm border-0 h-100">
            <div className="card-body py-4">
              <FaPlusCircle size={50} className="text-primary mb-3" />
              <h5 className="card-title fw-bold">New Product</h5>
              <p className="card-text">Add a new product to your store.</p>
              <Link to="/addproduct" className="btn btn-primary px-4">
                Add Product
              </Link>
            </div>
          </div>
        </div>

        {/* View All Products Card */}
        <div className="col-md-4">
          <div className="card text-center shadow-sm border-0 h-100">
            <div className="card-body py-4">
              <FaBoxOpen size={50} className="text-success mb-3" />
              <h5 className="card-title fw-bold">View All Products</h5>
              <p className="card-text">Check and manage existing products.</p>
              <Link to="/allProducts" className="btn btn-success px-4">
                View Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
