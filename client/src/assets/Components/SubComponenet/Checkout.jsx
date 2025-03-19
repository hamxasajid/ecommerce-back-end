import { useEffect, useState } from "react";
import "./Checkout.css";

const Checkout = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setData(cartData);
  }, []);

  const calculateSubtotal = () => {
    return data.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );
  };

  const handleRemoveProduct = (productId) => {
    const updatedData = data.filter((product) => product.id !== productId);
    setData(updatedData);
    localStorage.setItem("cart", JSON.stringify(updatedData));
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
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={product.image}
                        alt={`Product ${product.id}`}
                        className="product-image1"
                      />
                    </td>
                    <td>{product.quantity}</td>
                    <td>{product.title}</td>
                    <td>${product.price}</td>
                    <td>${(product.quantity * product.price).toFixed(2)}</td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveProduct(product.id)}
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
            Subtotal: <strong>${calculateSubtotal().toFixed(2)}</strong>
          </div>
          <button className="checkout-btn">Checkout</button>
        </div>
      ) : (
        <p>Your cart is empty!</p>
      )}
    </div>
  );
};

export default Checkout;
