import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaBars,
  FaTimes,
  FaHome,
  FaInfo,
  FaBoxOpen,
  FaEnvelope,
} from "react-icons/fa";

const Nav = () => {
  const [offCanvasOpen, setOffCanvasOpen] = useState(false);
  const location = useLocation();

  // Active function checks if the current path starts with the given path
  const isActive = (path) => {
    if (path === "/products") {
      return location.pathname.startsWith("/products")
        ? "text-primary fw-bold"
        : "text-dark";
    }
    return location.pathname === path ? "text-primary fw-bold" : "text-dark";
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* Logo */}
          <Link className="navbar-brand text-dark text-decoration-none" to="/">
            Style<span className="text-primary fw-bold">Fusion</span>
          </Link>

          {/* Search Bar - Visible on Desktop */}
          <form className="d-none d-lg-flex mx-auto w-50">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
            />
          </form>

          {/* Icons */}
          <div className="d-flex align-items-center">
            <Link
              to="/wishlist"
              className={`nav-link me-3 text-decoration-none ${isActive(
                "/wishlist"
              )}`}
            >
              <FaHeart size={20} />
            </Link>
            <Link
              to="/cart"
              className={`nav-link me-3 text-decoration-none ${isActive(
                "/cart"
              )}`}
            >
              <FaShoppingCart size={20} />
            </Link>
            <Link
              to="/login"
              className={`nav-link me-3 text-decoration-none ${isActive(
                "/login"
              )}`}
            >
              <FaUser size={20} />
            </Link>

            {/* Hamburger Icon for Small Screens */}
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setOffCanvasOpen(true)}
            >
              <FaBars size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Search Bar - Visible on Mobile */}
      <div className="d-lg-none px-3 py-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
        />
      </div>

      {/* Menu below Navbar */}
      <div className="bg-light py-2 d-none d-lg-flex justify-content-center border-bottom">
        <Link
          className={`mx-3 text-decoration-none d-flex align-items-center ${isActive(
            "/"
          )}`}
          to="/"
        >
          <FaHome className="me-1" /> Home
        </Link>
        <Link
          className={`mx-3 text-decoration-none d-flex align-items-center ${isActive(
            "/about"
          )}`}
          to="/about"
        >
          <FaInfo className="me-1" /> About
        </Link>
        <Link
          className={`mx-3 text-decoration-none d-flex align-items-center ${isActive(
            "/products"
          )}`}
          to="/products"
        >
          <FaBoxOpen className="me-1" /> Products
        </Link>
        <Link
          className={`mx-3 text-decoration-none d-flex align-items-center ${isActive(
            "/contact"
          )}`}
          to="/contact"
        >
          <FaEnvelope className="me-1" /> Contact
        </Link>
      </div>

      {/* Off-Canvas Navbar for Small Screens */}
      <div className={`offcanvas offcanvas-end ${offCanvasOpen ? "show" : ""}`}>
        <div className="offcanvas-header">
          <button className="btn" onClick={() => setOffCanvasOpen(false)}>
            <FaTimes size={24} />
          </button>
        </div>
        <div className="offcanvas-body">
          <Link
            className={`d-block mb-3 text-decoration-none ${isActive(
              "/login"
            )}`}
            to="/login"
            onClick={() => setOffCanvasOpen(false)}
          >
            <FaUser className="me-2" /> Login
          </Link>
          <Link
            className={`d-block mb-3 text-decoration-none ${isActive("/")}`}
            to="/"
            onClick={() => setOffCanvasOpen(false)}
          >
            <FaHome className="me-2" /> Home
          </Link>
          <Link
            className={`d-block mb-3 text-decoration-none ${isActive(
              "/about"
            )}`}
            to="/about"
            onClick={() => setOffCanvasOpen(false)}
          >
            <FaInfo className="me-2" /> About
          </Link>
          <Link
            className={`d-block mb-3 text-decoration-none ${isActive(
              "/products"
            )}`}
            to="/products"
            onClick={() => setOffCanvasOpen(false)}
          >
            <FaBoxOpen className="me-2" /> Products
          </Link>
          <Link
            className={`d-block mb-3 text-decoration-none ${isActive(
              "/contact"
            )}`}
            to="/contact"
            onClick={() => setOffCanvasOpen(false)}
          >
            <FaEnvelope className="me-2" /> Contact
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Nav;
