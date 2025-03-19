import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./SubComponenet/Product.css";

const Products = () => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);

  // Fetch products and extract categories dynamically
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products"); // Fetch products instead of categories
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Function to check if a link is active
  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <>
      <div className="container parentContainer-nav">
        <div className="head">
          <div className="productNav">
            <nav className="navbar bg-body-tertiary rounded-3 navContainer">
              <div className="container d-flex justify-content-center">
                <ul className="navbar-nav flex-row gap-3 flex-nowrap">
                  <li className="nav-item">
                    <Link
                      className={`nav-link-nav ${isActive("/products")}`}
                      to="/products"
                    >
                      All Products
                    </Link>
                  </li>
                  {categories.length > 0 ? (
                    categories.map((category, index) => (
                      <li className="nav-item" key={index}>
                        <Link
                          className={`nav-link-nav ${isActive(
                            `/products/${category
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`
                          )}`}
                          to={`/products/${category
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                          {/* Capitalize first letter */}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="nav-item">
                      <span className="nav-link-nav">
                        Loading categories...
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Products;
