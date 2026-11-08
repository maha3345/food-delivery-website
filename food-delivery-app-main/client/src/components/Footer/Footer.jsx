import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <>
      <div id="footer" className="footer">
        <div className="footer-content">
          <div className="footer-content-left">
            <h2 style={{ color: "#ff4a22", fontSize: "32px", fontWeight: "800", letterSpacing: "-0.5px" }}>
              Chulha<span style={{ color: "white" }}>.</span>
            </h2>
            <p>
              Chulha brings you the best home-style food, delivered fresh and
              fast. We partner with local kitchens to serve wholesome meals
              made with love and the finest ingredients. Order now and taste
              the difference.
            </p>
          </div>
          <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>+91 9876543210</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="footer-copyright">
          Copyright 2026 © Chulha - All Rights Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
