import { useState, useEffect } from "react";
import axios from "axios";
import "./Product.css";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllProducts = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage")) || 1
  );
  const productsPerPage = 8;

  // fetch product data from the server
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {
        console.log("API Not Found");
      });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const totalPages = Math.ceil(data.length / productsPerPage);

      // Ensure the stored page is within valid range
      if (currentPage > totalPages) {
        setCurrentPage(1);
      } else {
        setCurrentPage(parseInt(localStorage.getItem("currentPage")) || 1);
      }
    }
  }, [data, currentPage]);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / productsPerPage);

  // Get the products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle Pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("currentPage", pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = async (product) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("userId");

    if (!isLoggedIn || !userId) {
      window.location.href = "/sigin";
      return;
    }

    // post product data to the server collection "cart"
    const response = await fetch("http://localhost:5000/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, product }),
    });

    const data = await response.json();
    console.log("Response from add-to-cart:", data);

    if (data.success) {
      toast.success(`${product.title.slice(0, 20)} added to cart!`);
    } else {
      toast.error(data.message || "Failed to add item");
    }
  };

  return (
    <>
      <div className="container parentContainer-nav">
        <div className="head">
          <h1 className="display-5 fw-bold text-Dark">
            All <span className="text-primary">Products</span>
          </h1>
        </div>
      </div>

      <div className="container productContainer">
        {currentProducts.map((item) => (
          <div className="card" key={item._id}>
            <div className="Card-img">
              <img src={item.image} className="img" alt={item.title} />
            </div>

            <div className="Card-price px-3">
              <p className="card-text">${item.price}</p>
            </div>
            <div className="Card-title px-3">
              <h3 className="card-title">
                {item.title.split(" ").slice(0, 5).join(" ")}
              </h3>
            </div>

            {/* Rating Section */}
            <div className="Card-rating text-start">
              <span className="rating-stars px-3 fs-5">
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    style={{
                      color: index < item.rating.rate ? "#FFD700" : "#ccc",
                    }}
                  >
                    ★
                  </span>
                ))}
              </span>
            </div>

            <div className="btns d-flex justify-content-between align-items-center px-3">
              <Link to={`/productdetails/${item.id}`}>
                <button className="btn-view-more mt-3">View Details</button>
              </Link>

              <button
                className="btn-cart mt-3 border border-primary p-2 rounded text-primary"
                onClick={() => handleAddToCart(item)}
              >
                <FaShoppingCart size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="container">
        <nav aria-label="Product Pagination">
          <ul className="pagination justify-content-between">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link fs-4 btn btn-primary"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &laquo;
              </button>
            </li>

            <div className="d-flex">
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </div>

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link fs-4"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <ToastContainer />
    </>
  );
};

export default AllProducts;
