import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Product.css";
import { FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryProducts = () => {
  const { category } = useParams(); // Get category from URL
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Helper function to format category names consistently
  const formatCategory = (str) =>
    str.toLowerCase().replace(/\s+/g, "-").replace(/['"]/g, "");

  // fetch product data from the server
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        console.log("Fetched products:", response.data); // Debugging
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API Not Found:", error);
        setLoading(false);
      });
  }, []);

  // Filter products by category
  const filteredData = data.filter(
    (item) => formatCategory(item.category) === formatCategory(category)
  );

  console.log("Category from URL:", category);
  console.log("Filtered Products:", filteredData);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Capitalize category name for heading
  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ");

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
      <div className="container parentContainer">
        <div className="head">
          <h1 className="display-5 fw-bold text-dark">
            {formattedCategory} <span className="text-primary">Products</span>
          </h1>
        </div>
      </div>

      <div className="container productContainer">
        {loading ? (
          <p>Loading...</p>
        ) : filteredData.length === 0 ? (
          <p className="no-products">No products found in this category.</p>
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
      <ToastContainer />
    </>
  );
};

export default CategoryProducts;
