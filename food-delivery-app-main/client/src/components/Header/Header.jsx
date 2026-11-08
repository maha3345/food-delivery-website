import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="header-contents">
          <h2>Order your favourite food here</h2>
          <p>
            Discover a wide variety of delicious dishes crafted with fresh
            ingredients, delivered straight to your door. From hearty meals to
            light bites — Chulha brings the taste of home to you.
          </p>
          <a href="#explore-menu"><button>View Menu</button></a>
        </div>
      </div>
    </>
  );
};

export default Header;
