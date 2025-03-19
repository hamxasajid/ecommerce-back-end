import { useState, useEffect } from "react";
import axios from "axios";
import "./Product.css";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage")) || 1
  );
  const productsPerPage = 8;

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

            <Link to={`/productdetails/${item.id}`}>
              <button className="btn-view-more mt-3">View Details</button>
            </Link>
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
    </>
  );
};

export default AllProducts;
