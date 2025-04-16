import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Details.css";
import { FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Details = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products`)
      .then((response) => {
        // Find product using 'id' instead of '_id'
        const foundProduct = response.data.find(
          (item) => item.id === parseInt(productId) // Ensure ID comparison works
        );
        setProduct(foundProduct);

        if (foundProduct) {
          // Filter related products based on category
          const filteredProducts = response.data.filter(
            (item) =>
              item.category === foundProduct.category &&
              item.id !== foundProduct.id
          );
          setRelatedProducts(filteredProducts);
        }
      })
      .catch(() => console.error("Error fetching product data"));
  }, [productId]);

  const addToCart = (item) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      // Redirect if not logged in
      window.location.href = "/sigin"; // change to your actual sign-in page
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((cartItem) => cartItem.id === item.id);

    if (!exists) {
      cart.push({ ...item, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Product added successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      toast.error("Product already in cart!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="details-page">
      <div className="head">
        <h1 className="display-5 fw-bold text-Dark">
          Product <span className="text-primary">Details</span>
        </h1>
      </div>

      {product ? (
        <>
          <div className="product-detail-container">
            <div className="product-image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="product-info">
              <p className="text-primary text-uppercase">{product.category}</p>
              <h2 className="product-title">{product.title}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">
                <strong>Price: </strong>${(product.price * quantity).toFixed(2)}
              </p>

              <div className="product-quantity">
                <label htmlFor="quantity">Quantity: </label>
                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      setQuantity((prevQuantity) =>
                        prevQuantity > 1 ? prevQuantity - 1 : 1
                      )
                    }
                    className="btn-quantity"
                  >
                    -
                  </button>
                  <div className="quantity-display">{quantity}</div>
                  <button
                    onClick={() =>
                      setQuantity((prevQuantity) =>
                        prevQuantity < 5 ? prevQuantity + 1 : 5
                      )
                    }
                    className="btn-quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="product-actions">
                <Link to="/cart" className="btn go-to-checkout">
                  <button
                    className="btn add-to-cart"
                    onClick={() => addToCart(product)}
                  >
                    Go To Cart {""}
                    <FaShoppingCart size={20} />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="container related-products py-4">
            <h2 className="related-title">Related Products</h2>
            <div className="related-container">
              {relatedProducts.length > 0 ? (
                relatedProducts.slice(0, 4).map((item) => (
                  <div className="related-card" key={item.id}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="related-img"
                    />
                    <p className="card-related-price mt-2 px-3 mb-0">
                      ${item.price}
                    </p>
                    <h3 className="card-related-title px-3">
                      {item.title.split(" ").slice(0, 4).join(" ")}
                    </h3>

                    {/* Rating Section */}
                    <div className="Card-rating text-start mb-3">
                      <span className="rating-stars px-3 fs-6">
                        {Array.from({ length: 5 }, (_, index) => (
                          <span
                            key={index}
                            style={{
                              color:
                                index < item.rating.rate ? "#FFD700" : "#ccc",
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </span>
                    </div>

                    <div className="btns d-flex justify-content-between align-items-center px-3">
                      <Link to={`/productdetails/${item.id}`}>
                        <button className="btn-view-more mt-3">
                          View Details
                        </button>
                      </Link>

                      <button
                        className="btn-cart mt-3 border border-primary p-2 rounded text-primary"
                        onClick={() => addToCart(item)}
                      >
                        <FaShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No related products found.</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default Details;
