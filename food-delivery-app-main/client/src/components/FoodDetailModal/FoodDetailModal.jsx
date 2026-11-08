import React, { useContext, useEffect } from "react";
import "./FoodDetailModal.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const FoodDetailModal = ({ item, isOpen, onClose }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const itemId = item._id || item.id;
  const quantity = cartItems[itemId] || cartItems[String(itemId)] || 0;

  return (
    <div className="food-detail-overlay" onClick={onClose}>
      <div
        className="food-detail-card"
        onClick={(e) => e.stopPropagation()}>
        <button className="food-detail-close-btn" onClick={onClose} title="Close (Esc)">
          ✕
        </button>

        <div className="food-detail-media">
          <img
            src={`${url}/images/${item.image}`}
            alt={item.name}
            className="food-detail-img"
          />
          {item.category && (
            <span className="food-detail-badge">{item.category}</span>
          )}
        </div>

        <div className="food-detail-content">
          <div className="food-detail-header">
            <div>
              <h2 className="food-detail-title">{item.name}</h2>
              <div className="food-detail-rating">
                <img src={assets.rating_starts} alt="Rating" />
                <span>(4.8 / 5 • 120+ reviews)</span>
              </div>
            </div>
            <div className="food-detail-price">₹{item.price}</div>
          </div>

          <p className="food-detail-desc">{item.description}</p>

          <div className="food-detail-features">
            <div className="food-feature-pill">🌱 Fresh Ingredients</div>
            <div className="food-feature-pill">⏱ 25-35 Mins Delivery</div>
            <div className="food-feature-pill">👨‍🍳 Chef Special</div>
          </div>

          <div className="food-detail-actions">
            {quantity === 0 ? (
              <button
                className="food-detail-add-btn"
                onClick={() => addToCart(itemId)}>
                Add to Cart • ₹{item.price}
              </button>
            ) : (
              <div className="food-detail-counter-box">
                <div className="food-detail-counter">
                  <button
                    className="counter-btn"
                    onClick={() => removeFromCart(itemId)}>
                    −
                  </button>
                  <span className="counter-val">{quantity}</span>
                  <button
                    className="counter-btn"
                    onClick={() => addToCart(itemId)}>
                    +
                  </button>
                </div>
                <span className="counter-total">Total: ₹{item.price * quantity}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailModal;
