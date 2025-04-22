import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./Checkout.css";

const Checkout = () => {
  const [data, setData] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  // Fetch cart items from the server
  useEffect(() => {
    const fetchCartData = async () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn !== "true") {
        window.location.href = "/signin";
        return;
      }

      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get("http://localhost:5000/all-cart", {
          headers: { userId },
        });
        if (response.status === 200) {
          setData(response.data);
        }
      } catch {
        toast.info("Your cart is empty!", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    };

    fetchCartData();
  }, []);

  // Update subtotal when cart data changes
  useEffect(() => {
    const total = data.reduce(
      (acc, item) => acc + item.product.quantity * item.product.price,
      0
    );
    setSubtotal(total);
  }, [data]);

  // Increase quantity
  const handleIncrease = (id) => {
    const updatedData = data.map((item) =>
      item._id === id
        ? {
            ...item,
            product: {
              ...item.product,
              quantity: item.product.quantity + 1,
            },
          }
        : item
    );
    setData(updatedData);
  };

  // Decrease quantity
  const handleDecrease = (id) => {
    const updatedData = data.map((item) => {
      if (item._id === id && item.product.quantity > 1) {
        return {
          ...item,
          product: {
            ...item.product,
            quantity: item.product.quantity - 1,
          },
        };
      }
      return item;
    });
    setData(updatedData);
  };

  // Remove product
  const handleRemoveProduct = async (productId) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      window.location.href = "/signin";
      return;
    }

    try {
      const userId = localStorage.getItem("userId");

      const response = await axios.delete(
        `http://localhost:5000/carts/${productId}`,
        {
          headers: { userId },
        }
      );

      console.log("Delete response:", response);

      if (response.status === 200 && response.data.success) {
        setData((prevData) =>
          prevData.filter((item) => item._id !== productId)
        );

        // 🟢 Toast after updating state
        toast.success(response.data.message || `Product removed from cart!`, {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.error(response.data.error || "Failed to remove product!", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Delete error:", error);

      toast.error(error?.response?.data?.error || "Error removing product!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleCheckout = () => {
    toast.success("Proceeding to checkout...", {
      position: "top-right",
      autoClose: 2000,
    });
    window.location.href = "/payment";
  };

  return (
    <div className="container">
      <div className="head">
        <h1 className="display-5 fw-bold text-Dark">
          Cart <span className="text-primary">Page</span>
        </h1>
      </div>

      {data.length > 0 ? (
        <div>
          <h3 className="text-start">Your Shopping Cart</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {data.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={product.product.image}
                        alt={`Product ${product._id}`}
                        className="product-image1"
                      />
                    </td>
                    <td>
                      <div className="quantity-controls">
                        <button onClick={() => handleDecrease(product._id)}>
                          -
                        </button>
                        <span style={{ width: "30px" }}>
                          {product.product.quantity}
                        </span>
                        <button onClick={() => handleIncrease(product._id)}>
                          +
                        </button>
                      </div>
                    </td>
                    <td>{product.product.title.slice(0, 20)}</td>
                    <td>${product.product.price}</td>
                    <td>
                      $
                      {(
                        product.product.quantity * product.product.price
                      ).toFixed(2)}
                    </td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveProduct(product._id)}
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="subtotal">
            Subtotal: <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      ) : (
        <p>Your cart is empty!</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default Checkout;
