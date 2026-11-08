import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import FoodDetailModal from "../FoodDetailModal/FoodDetailModal";

const FoodItem = ({ id, name, price, description, image, category }) => {
  const { cartItems, addToCart, removeFromCart, url, getImageUrl } =
    useContext(StoreContext);
  const [showModal, setShowModal] = useState(false);

  const quantity = cartItems[id] || cartItems[String(id)] || 0;

  return (
    <>
      <div
        className="food-item"
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer" }}
        title="Click to view details">
        <div className="food-item-img-container">
          <img
            className="food-item-image"
            src={getImageUrl ? getImageUrl(image) : `/images/${image}`}
            alt={name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `/images/${image}`;
            }}
          />
          <div onClick={(e) => e.stopPropagation()}>
            {quantity === 0 ? (
              <img
                className="add"
                onClick={() => addToCart(id)}
                src={assets.add_icon_white}
                alt="Add to cart"
              />
            ) : (
              <div className="food-item-counter">
                <img
                  onClick={() => removeFromCart(id)}
                  src={assets.remove_icon_red}
                  alt="Remove one"
                />
                <p>{quantity}</p>
                <img
                  onClick={() => addToCart(id)}
                  src={assets.add_icon_green}
                  alt="Add one"
                />
              </div>
            )}
          </div>
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="Rating" />
          </div>
          <p className="food-item-desc">{description}</p>
          <p className="food-item-price">₹{price}</p>
        </div>
      </div>

      <FoodDetailModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        item={{ id, name, price, description, image, category }}
      />
    </>
  );
};

export default FoodItem;
