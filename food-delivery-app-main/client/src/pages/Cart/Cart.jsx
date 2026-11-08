import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, getTotalCartCount, url } =
    useContext(StoreContext);

  const navigate = useNavigate();
  const totalAmount = getTotalCartAmount();
  const totalCount = getTotalCartCount ? getTotalCartCount() : 0;
  const deliveryFee = totalAmount === 0 ? 0 : 99;

  return (
    <>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Item</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {totalCount === 0 ? (
            <div style={{ textAlign: "center", padding: "50px 0", color: "#666" }}>
              <h3 style={{ color: "#1b1e28", fontSize: "20px" }}>Your cart is empty!</h3>
              <p style={{ marginTop: "8px", color: "#5e6573" }}>Explore our menu to add your favourite dishes.</p>
              <button
                onClick={() => navigate("/")}
                style={{
                  marginTop: "20px",
                  padding: "12px 28px",
                  backgroundColor: "#ff4a22",
                  color: "white",
                  border: "none",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  boxShadow: "0 4px 14px rgba(255, 74, 34, 0.25)"
                }}>
                Browse Menu
              </button>
            </div>
          ) : (
            food_list.map((item) => {
              const itemId = item._id || item.id;
              const quantity = cartItems[itemId] || cartItems[String(itemId)] || 0;
              if (quantity > 0) {
                return (
                  <div key={itemId}>
                    <div className="cart-items-title cart-items-item">
                      <img src={`${url}/images/${item.image}`} alt={item.name} />
                      <p>{item.name}</p>
                      <p>₹{item.price}</p>
                      <p>{quantity}</p>
                      <p>₹{item.price * quantity}</p>
                      <p
                        onClick={() => removeFromCart(itemId)}
                        className="cross"
                        title="Remove item">
                        ✕
                      </p>
                    </div>
                    <hr />
                  </div>
                );
              }
              return null;
            })
          )}
        </div>

        {totalCount > 0 && (
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Total</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>₹{totalAmount}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>₹{deliveryFee}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>₹{totalAmount + deliveryFee}</b>
                </div>
              </div>
              <button onClick={() => navigate("/order")}>
                PROCEED TO CHECKOUT
              </button>
            </div>
            <div className="cart-promocode">
              <div>
                <p>Have a promo code? Enter it here</p>
                <div className="cart-promocode-input">
                  <input type="text" placeholder="Promo code (e.g. CHULHA50)" />
                  <button type="button" onClick={() => alert("Promo code will be applied during final checkout!")}>
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
