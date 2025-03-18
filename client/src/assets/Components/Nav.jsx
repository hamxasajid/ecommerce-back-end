import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [offCanvasOpen, setOffCanvasOpen] = useState(false);

  // Fetch product suggestions from API
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length > 0) {
        try {
          const response = await fetch("http://localhost:5000/products");
          const data = await response.json();

          if (!Array.isArray(data)) {
            console.error("Invalid API response:", data);
            return;
          }

          // Filter products by name and limit to 6 suggestions
          const filtered = data
            .filter((item) =>
              item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(0, 6);

          setSuggestions(filtered);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search_result?query=${searchTerm}`);
      setSearchTerm("");
      setSuggestions([]);
    }
  };

  // Handle clicking a suggestion
  const handleSuggestionClick = (title) => {
    navigate(`/search_result?title=${title}`);
    setSearchTerm("");
    setSuggestions([]);
  };

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
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* Logo */}
          <Link className="navbar-brand text-dark text-decoration-none" to="/">
            Style<span className="text-primary fw-bold">Fusion</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form
            className="d-none d-lg-flex mx-auto w-50"
            onSubmit={handleSearch}
          >
            <div className="position-relative w-100">
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {suggestions.length > 0 && (
                <ul className="list-group position-absolute w-100 shadow-sm z-3">
                  {suggestions.map((item) => (
                    <li
                      key={item.id}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleSuggestionClick(item.title)}
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
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

            {/* Hamburger Icon */}
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

      {/* Search Bar - Mobile */}
      <div className="d-lg-none px-3 py-2">
        <form className="position-relative" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
          />
          {suggestions.length > 0 && (
            <ul className="list-group position-absolute w-100 shadow-sm z-100">
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSuggestionClick(item.title)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>

      {/* Navigation Links */}
      <div className="bg-light py-2 d-none d-lg-flex justify-content-center border-bottom">
        <Link className={`mx-3 text-decoration-none ${isActive("/")}`} to="/">
          <FaHome className="me-1" /> Home
        </Link>
        <Link
          className={`mx-3 text-decoration-none ${isActive("/about")}`}
          to="/about"
        >
          <FaInfo className="me-1" /> About
        </Link>
        <Link
          className={`mx-3 text-decoration-none ${isActive("/products")}`}
          to="/products"
        >
          <FaBoxOpen className="me-1" /> Products
        </Link>
        <Link
          className={`mx-3 text-decoration-none ${isActive("/contact")}`}
          to="/contact"
        >
          <FaEnvelope className="me-1" /> Contact
        </Link>
      </div>

      {/* Off-Canvas Navbar */}
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
              "/products"
            )}`}
            to="/products"
            onClick={() => setOffCanvasOpen(false)}
          >
            <FaBoxOpen className="me-2" /> Products
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Nav;
