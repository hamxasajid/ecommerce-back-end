import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Product.css";
import { Link } from "react-router-dom";

const CategoryProducts = () => {
  const { category } = useParams(); // Get category from URL
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
          data
            .filter(
              (item) =>
                item.category.toLowerCase().replace(/\s+/g, "-") === category
            )
            .map((item) => (
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
                            index < (item.rating?.rate || 0)
                              ? "#FFD700"
                              : "#ccc",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </span>
                </div>
                <Link to={`/productdetails/${item._id}`}>
                  <button className="btn-view-more mt-3">View Details</button>
                </Link>
              </div>
            ))
        )}
      </div>
    </>
  );
};

export default CategoryProducts;
