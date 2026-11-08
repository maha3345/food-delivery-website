import React, { useContext, useEffect, useState } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState("Verifying payment...");

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", {
        success,
        orderId,
      });
      if (response.data.success) {
        setStatusMessage("Payment successful! Redirecting to your orders...");
        setTimeout(() => navigate("/myorders"), 1200);
      } else {
        setStatusMessage("Payment cancelled or failed. Redirecting to home...");
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (err) {
      console.error(err);
      setStatusMessage("Verification error. Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <>
      <div className="verify" style={{ textAlign: "center", minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "20px" }}>
        <div className="spinner"></div>
        <h3 style={{ color: "#333" }}>{statusMessage}</h3>
        <p style={{ color: "#777", fontSize: "14px" }}>Please do not refresh or close this window.</p>
      </div>
    </>
  );
};

export default Verify;
