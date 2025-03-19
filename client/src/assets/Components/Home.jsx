import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./SubComponenet/Product.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [randomElectronics, setRandomElectronics] = useState([]);

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
      // Filter and shuffle electronics only once per data update
      const electronics = data.filter(
        (item) =>
          item.category === "electronics" ||
          item.category === "electronicgadget"
      );
      const shuffled = [...electronics].sort(() => Math.random() - 0.5);
      setRandomElectronics(shuffled.slice(0, 8));
    }
  }, [data]); // Runs only when `data` changes

  return (
    <>
      {/* Hero Section */}
      <div className="bg-dark text-secondary px-4 py-5 text-center">
        <div className="py-5">
          <h3 className="fs-1 fs-md-6 fw-bold text-white">
            Your Ultimate Shopping Destination
            <span className="text-primary fs-1">.</span>
          </h3>
          <p className="fs-5 fs-md-4 fs-lg-3 mb-4 ">
            Discover the latest trends in <b>Men Fashion, Women Fashion,</b> and{" "}
            <b>Jewelry.</b>
            Shop with confidence and experience quality like never before.
            Elevate your style today!
          </p>
          <div className="col-lg-6 mx-auto">
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link
                to="/products"
                className="btn btn-outline-light btn-lg px-4"
              >
                Explore Categories
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="container">
        <div className="parentContainer">
          <div className="head">
            <h1 className="display-5 fw-bold text-dark">
              Featured <span className="text-primary">Products</span>
            </h1>
          </div>
        </div>

        <div className="productContainer">
          {data.slice(0, 4).map((item) => (
            <div className="card position-relative" key={item.id}>
              {/* Bootstrap Badge for Featured Products */}
              <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
                Featured
              </span>

              <div className="Card-img">
                <img src={item.image} className="img" alt={item.title} />
              </div>
              <div className="Card-price px-3">
                <p className="card-text">${item.price}</p>
              </div>
              <div className="Card-title px-3">
                <h3 className="card-title fs-6">
                  {item.title.split(" ").slice(0, 3).join(" ")}
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

        {/* Button to View All Products */}
        <div className="text-center m-4">
          <Link to="/products" className="btn btn-primary btn-lg">
            View All Products
          </Link>
        </div>

        {/* Electronics Category Section */}
        <div className="parentContainer">
          <div className="head">
            <h1 className="display-5 fw-bold text-dark">
              Electronics <span className="text-primary">Collection</span>
            </h1>
          </div>
        </div>

        <div className="productContainer">
          {randomElectronics.map((item) => (
            <div className="card position-relative" key={item.id}>
              {/* Bootstrap Badge for Electronics */}
              <span className="badge bg-info text-dark position-absolute top-0 start-0 m-2">
                Electronics
              </span>

              <div className="Card-img">
                <img src={item.image} className="img" alt={item.title} />
              </div>

              <div className="Card-price px-3">
                <p className="card-text">${item.price}</p>
              </div>
              <div className="Card-title px-3">
                <h3 className="card-title fs-6">
                  {item.title.split(" ").slice(0, 3).join(" ")}
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

        {/* Button to View All Electronics */}
        <div className="text-center m-4">
          <Link to="/products/electronics" className="btn btn-primary btn-lg">
            View All Electronics
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
