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
  FaSearch, // Import search icon
} from "react-icons/fa";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [offCanvasOpen, setOffCanvasOpen] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();

        // Only show products that start with the search term
        const filtered = data
          .filter((item) =>
            item.title.toLowerCase().startsWith(searchTerm.toLowerCase())
          )
          .slice(0, 5)
          .map((item) => item.title);

        setSuggestions(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search_result?query=${searchTerm}`);
      setSearchTerm("");
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (title) => {
    navigate(`/search_result?query=${title}`);
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
          <Link className="navbar-brand text-dark text-decoration-none" to="/">
            Style<span className="text-primary fw-bold">Fusion</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form
            className="d-none d-lg-flex mx-auto w-50"
            onSubmit={handleSearch}
          >
            <div className="position-relative w-100 d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn btn-primary ms-2">
                <FaSearch />
              </button>

              {suggestions.length > 0 && (
                <ul
                  className="list-group position-absolute w-100 shadow-sm z-3"
                  style={{ marginTop: "40px" }}
                >
                  {suggestions.map((title, index) => (
                    <li
                      key={index}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleSuggestionClick(title)}
                    >
                      {title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </form>

          <div className="d-flex align-items-center">
            <Link
              to="/wishlist"
              className={`nav-link-nav me-3 ${isActive("/wishlist")}`}
            >
              <FaHeart size={20} />
            </Link>
            <Link
              to="/cart"
              className={`nav-link-nav me-3 ${isActive("/cart")}`}
            >
              <FaShoppingCart size={20} />
            </Link>
            <Link
              to="/sigin"
              className={`nav-link-nav me-3 ${isActive("/sigin")}`}
            >
              <FaUser size={20} />
            </Link>
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

      {/* Mobile Search */}
      <div className="d-lg-none px-3 py-2">
        <form className="position-relative d-flex" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" className="btn btn-primary ms-2">
            <FaSearch />
          </button>

          {suggestions.length > 0 && (
            <ul
              className="list-group position-absolute w-100 shadow-sm z-3"
              style={{ marginTop: "40px" }}
            >
              {suggestions.map((title, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSuggestionClick(title)}
                >
                  {title}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>

      <div className="bg-light py-2 d-none d-lg-flex justify-content-center border-bottom">
        <Link className={`mx-3 text-decoration-none ${isActive("/")}`} to="/">
          <FaHome className="nav-link-nav me-1" /> Home
        </Link>
        <Link
          className={`mx-3 text-decoration-none ${isActive("/about")}`}
          to="/about"
        >
          <FaInfo className="nav-link-nav me-1" /> About
        </Link>
        <Link
          className={`mx-3 text-decoration-none ${isActive("/products")}`}
          to="/products"
        >
          <FaBoxOpen className="nav-link-nav me-1" /> Products
        </Link>
        <Link
          className={`mx-3 text-decoration-none ${isActive("/contact")}`}
          to="/contact"
        >
          <FaEnvelope className="nav-link-nav me-1" /> Contact
        </Link>
      </div>

      {/* Off-Canvas Navbar */}
      {offCanvasOpen && (
        <div className="offcanvas offcanvas-end show">
          <div className="offcanvas-header">
            <button className="btn" onClick={() => setOffCanvasOpen(false)}>
              <FaTimes size={24} />
            </button>
          </div>
          <div className="offcanvas-body">
            <Link
              className={`d-block mb-3 nav-link-nav-products ${isActive(
                "/sigin"
              )}`}
              to="/sigin"
              onClick={() => setOffCanvasOpen(false)}
            >
              <FaUser className=" me-2" /> Login
            </Link>
            <Link
              className={`d-block mb-3 nav-link-nav-products ${isActive("/")}`}
              to="/"
              onClick={() => setOffCanvasOpen(false)}
            >
              <FaHome className="me-2" /> Home
            </Link>
            <Link
              className={`d-block mb-3 nav-link-nav-products ${isActive(
                "/products"
              )}`}
              to="/products"
              onClick={() => setOffCanvasOpen(false)}
            >
              <FaBoxOpen className="me-2" /> Products
            </Link>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Nav;
