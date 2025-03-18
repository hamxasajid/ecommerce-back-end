import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const title = new URLSearchParams(location.search).get("title");
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    if (!title) return;

    fetch("http://localhost:5000/products") // Fetch all products
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);

        // Find the searched product
        const selected = data.find(
          (item) => item.title.toLowerCase() === title.toLowerCase()
        );

        if (selected) {
          // Get all products from the same category
          let related = data.filter(
            (item) => item.category === selected.category
          );

          // Sort the searched product to be first in the list
          related = [
            selected,
            ...related.filter((item) => item.title !== selected.title),
          ];

          setCategoryProducts(related);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [title]);

  return (
    <div className="container mt-4">
      {categoryProducts.length > 0 ? (
        <>
          <h2 className="mb-4 text-center text-primary">
            Search Result For <span className="fw-bold">{title}</span>
          </h2>
          <div className="row">
            {categoryProducts.map((product) => (
              <div key={product._id} className="col-md-4 mb-4">
                <div
                  className={`card shadow-sm border-0 ${
                    product.title.toLowerCase() === title.toLowerCase()
                      ? "border border-primary"
                      : ""
                  }`}
                >
                  <img
                    src={product.image || "https://via.placeholder.com/300"}
                    className="card-img-top"
                    alt={product.title}
                    style={{ height: "200px", objectFit: "contain" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title text-dark">{product.title}</h5>
                    <p className="text-muted">Category: {product.category}</p>
                    <button className="btn btn-primary w-100">
                      View Product
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h2 className="text-center text-danger py-5">No products found!</h2>
      )}
    </div>
  );
};

export default SearchResults;
