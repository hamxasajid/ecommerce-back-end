import { Link, Outlet, useLocation } from "react-router-dom";
import "./SubComponenet/Product.css";

const Products = () => {
  const location = useLocation(); // Get current route

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <>
      <div className="container parentContainer-nav">
        <div className="head">
          <div className="productNav">
            <nav className="navbar bg-body-tertiary rounded-3">
              <div className="container d-flex justify-content-center">
                <ul className="navbar-nav flex-row gap-3">
                  <li className="nav-item">
                    <Link
                      className={`nav-link-nav ${isActive("/products")}`}
                      to="/products"
                    >
                      All Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link-nav ${isActive(
                        "/products/men-fashion"
                      )}`}
                      to="/products/men-fashion"
                    >
                      Men Fashion
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link-nav ${isActive(
                        "/products/women-fashion"
                      )}`}
                      to="/products/women-fashion"
                    >
                      Women Fashion
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link-nav ${isActive(
                        "/products/jewelry"
                      )}`}
                      to="/products/jewelry"
                    >
                      Jewelry
                    </Link>
                  </li>
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
