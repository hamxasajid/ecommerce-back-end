import axios from "axios";
import { useEffect, useState } from "react";
import "./Product.css";
import { Link } from "react-router-dom";

const Men = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {
        console.log("Api Not Found");
      });
  });
  return (
    <>
      <div className="parentContainer">
        <div className="head">
          <h1 className="display-5 fw-bold text-Dark">
            Men <span className="text-primary">Fashion</span>
          </h1>
        </div>
      </div>

      <div className="container productContainer">
        {data
          .filter((item) => {
            return item.category === "men's clothing";
          })
          .map((item) => (
            <div className="card" key={item.id}>
              <div className="Card-img">
                <img src={item.image} className="img" />
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
              <Link to={`/productdetails/${item._id}`}>
                <button className="btn-view-more mt-3">View Details</button>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default Men;
