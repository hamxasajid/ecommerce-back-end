import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./SubComponenet/Product.css";

const SearchResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query")?.trim().toLowerCase();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (!query) return;
        setLoading(true);

        const response = await fetch("http://localhost:5000/products");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        const queryWords = query.split(" ");

        const filteredProducts = data
          .filter((item) => {
            const title = item.title.toLowerCase();
            const titleWords = title.split(" ");
            const category = item.category?.toLowerCase() || "";

            const startsWithQuery = titleWords.some((word) =>
              queryWords.some((q) => word.startsWith(q))
            );

            const containsAllWords = queryWords.every((q) => title.includes(q));
            const matchesCategory = category.includes(query);

            return startsWithQuery || containsAllWords || matchesCategory;
          })
          .sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();

            if (titleA.startsWith(query) && !titleB.startsWith(query))
              return -1;
            if (!titleA.startsWith(query) && titleB.startsWith(query)) return 1;
            return 0;
          });

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  // Calculate pagination details
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle Pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container">
      <h5 className="text-primary fs-6">Search Results for {query}</h5>

      {loading ? (
        <div className="loading-container">
          <p>Loading...</p>
        </div>
      ) : products.length > 0 ? (
        <>
          <div className="container productContainer">
            {currentProducts.map((item) => (
              <div key={item._id} className="card">
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
        </>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchResult;
