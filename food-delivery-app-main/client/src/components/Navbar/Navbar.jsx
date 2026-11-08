import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import ProfileModal from "../ProfileModal/ProfileModal";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { getTotalCartAmount, token, setToken, buttonRef, searchQuery, setSearchQuery } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (window.location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <>
      <div className="navbar">
        <Link to="/" className="navbar-brand">
          <span className="brand-chulha">Chulha</span><span className="brand-dot">.</span>
        </Link>

        <ul className="navbar-menu">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}>
            Home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}>
            Menu
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}>
            Contact Us
          </a>
        </ul>

        <div className="navbar-right">
          <div className="navbar-search-wrapper" style={{ display: "flex", alignItems: "center" }}>
            {showSearch ? (
              <div style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f4f5f8",
                borderRadius: "25px",
                padding: "6px 14px",
                border: "1px solid #ff6347",
                gap: "8px"
              }}>
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  autoFocus
                  style={{
                    border: "none",
                    background: "transparent",
                    outline: "none",
                    fontSize: "14px",
                    width: "160px",
                    color: "#333"
                  }}
                />
                {searchQuery && (
                  <span
                    onClick={() => setSearchQuery("")}
                    style={{ cursor: "pointer", color: "#888", fontSize: "14px", fontWeight: "bold" }}>
                    ✕
                  </span>
                )}
                <span
                  onClick={() => setShowSearch(false)}
                  style={{ cursor: "pointer", color: "#ff6347", fontSize: "12px", fontWeight: "600" }}>
                  Close
                </span>
              </div>
            ) : (
              <img
                src={assets.search_icon}
                alt="Search"
                onClick={() => {
                  setShowSearch(true);
                  if (window.location.pathname !== "/") {
                    navigate("/");
                  }
                }}
                style={{ cursor: "pointer", width: "22px" }}
                title="Search menu"
              />
            )}
          </div>

          <div className="navbar-search-icon">
            <Link to="/cart">
              <img src={assets.basket_icon} alt="Cart" />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>

          {!token ? (
            <button ref={buttonRef} onClick={() => setShowLogin(true)}>
              Sign In
            </button>
          ) : (
            <div className="navbar-profile">
              <img
                src={assets.profile_icon}
                alt="Profile"
                onClick={() => setShowProfile(true)}
                style={{ cursor: "pointer" }}
                title="Click to view/edit profile"
              />
              <ul className="nav-profile-dropdown">
                <li onClick={() => setShowProfile(true)}>
                  <span style={{ fontSize: "16px", marginRight: "4px" }}>👤</span>
                  <p>My Profile</p>
                </li>
                <hr />
                <li
                  onClick={() => {
                    navigate("/myorders");
                  }}>
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {showProfile && (
        <ProfileModal
          isOpen={showProfile}
          onClose={() => setShowProfile(false)}
        />
      )}
    </>
  );
};

export default Navbar;
