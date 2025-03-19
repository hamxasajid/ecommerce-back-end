import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Product.css";
import { Link } from "react-router-dom";

const CategoryProducts = () => {
  const { category } = useParams(); // Get category from URL
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("categoryCurrentPage")) || 1
  );
  const productsPerPage = 8;

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch(() => {
        console.log("API Not Found");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("categoryCurrentPage", currentPage);
  }, [currentPage]);

  // Filter products by category
  const filteredData = data.filter(
    (item) => item.category.toLowerCase().replace(/\s+/g, "-") === category
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("categoryCurrentPage", pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Capitalize category name for the heading
  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ");

  return (
    <>
      <div className="container parentContainer">
        <div className="head">
          <h1 className="display-5 fw-bold text-Dark">
            {formattedCategory} <span className="text-primary">Products</span>
          </h1>
        </div>
      </div>

      <div className="container productContainer">
        {loading ? (
          <p>Loading...</p>
        ) : (
          currentProducts.map((item) => (
            <div className="card" key={item.id}>
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
                        color:
                          index < (item.rating?.rate || 0) ? "#FFD700" : "#ccc",
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
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="container">
          <nav aria-label="Product Pagination">
            <ul className="pagination justify-content-between">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
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
      )}
    </>
  );
};

export default CategoryProducts;
