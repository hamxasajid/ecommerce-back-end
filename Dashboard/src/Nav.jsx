import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      {/* Navbar with Hamburger Menu */}
      <nav className="navbar" style={{ backgroundColor: "#ff4f00" }}>
        <div className="container-fluid">
          {/* Hamburger Button */}
          <button
            className="btn text-white"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <i className="bi bi-list fs-3"></i> {/* Bootstrap Hamburger Icon */}
          </button>

          <Link className="navbar-brand text-white ms-2" to="/">
            <i className="bi bi-speedometer2 me-2"></i> {/* Dashboard Icon */}
            Admin Dashboard
          </Link>
        </div>
      </nav>

      {/* Off-Canvas Sidebar */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        style={{ backgroundColor: "#f8f9fa" }} // Sidebar background
      >
        <div className="offcanvas-header">
          <h5
            className="offcanvas-title"
            id="offcanvasNavbarLabel"
            style={{ color: "#ff7f50" }}
          >
            <i className="bi bi-menu-button-wide me-2"></i> {/* Menu Icon */}
            <span>Menu</span>
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-dark fw-bold" to="/">
                <i
                  className="bi bi-house-door me-2 "
                  style={{ color: "#ff7f50" }}
                ></i>{" "}
                {/* Home Icon */}
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-bold" to="/addproduct">
                <i
                  className="bi bi-plus-circle me-2"
                  style={{ color: "#ff7f50" }}
                ></i>{" "}
                {/* Add Product Icon */}
                Add Product
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Nav;
