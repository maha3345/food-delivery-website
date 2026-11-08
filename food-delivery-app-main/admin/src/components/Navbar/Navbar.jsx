import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
          <h2 style={{ color: "#ff4a22", fontSize: "28px", fontWeight: "800", margin: 0 }}>
            Chulha<span style={{ color: "#2e384d" }}>.</span>
          </h2>
          <span style={{ fontSize: "14px", color: "#666", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>
            Admin Panel
          </span>
        </div>
        <img className="profile" src={assets.profile_image} alt="" />
      </div>
    </>
  );
};

export default Navbar;
