import { Link, Outlet } from "react-router-dom";
import "./SubComponenet/Product.css";

const Products = () => {
  return (
    <>
      <div className="parentContainer">
        <div className="head">
          <div className="productNav p-2">
            <nav className="navbar bg-body-tertiary rounded-3">
              <div className="container d-flex justify-content-center">
                <ul className="navbar-nav flex-row gap-4">
                  <li className="nav-item">
                    <Link className="nav-link" to="/products">
                      All Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/products/men-fashion">
                      Men Fashion
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/products/women-fashion">
                      Women Fashion
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/products/jewelry">
                      jewelery
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
