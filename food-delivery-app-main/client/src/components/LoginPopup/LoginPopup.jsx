import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg("");
  };

  const fillDemo = () => {
    setCurrState("Login");
    setData({
      name: "",
      email: "demo@chulha.com",
      password: "password123",
    });
    setErrorMsg("");
  };

  const onLogin = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        setErrorMsg(response.data.message || "Authentication failed");
      }
    } catch (err) {
      setErrorMsg("Network error. Please make sure the server is running.");
    }
  };

  return (
    <>
      <div className="login-popup">
        <form onSubmit={onLogin} className="login-popup-container">
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt="Close"
            />
          </div>
          {errorMsg && (
            <p style={{ color: "red", fontSize: "13px", margin: "5px 0" }}>
              {errorMsg}
            </p>
          )}
          <div className="login-popup-inputs">
            {currState === "Login" ? null : (
              <input
                onChange={onChangeHandler}
                name="name"
                value={data.name}
                type="text"
                placeholder="Your Full Name"
                required
              />
            )}
            <input
              onChange={onChangeHandler}
              name="email"
              value={data.email}
              type="email"
              placeholder="Your email address"
              required
            />
            <input
              onChange={onChangeHandler}
              name="password"
              value={data.password}
              type="password"
              placeholder="Password (min 8 characters)"
              required
            />
          </div>
          <button type="submit">
            {currState === "Sign Up" ? "Create Account" : "Login"}
          </button>

          <button
            type="button"
            onClick={fillDemo}
            style={{
              backgroundColor: "#f4f4f4",
              color: "#333",
              border: "1px dashed #999",
              padding: "8px",
              borderRadius: "4px",
              fontSize: "13px",
              cursor: "pointer",
              marginTop: "5px",
            }}>
            ⚡ Quick Demo Fill (demo@chulha.com)
          </button>

          <div className="login-popup-condition">
            <input type="checkbox" required defaultChecked />
            <p>By continuing, I agree to the terms of use and privacy policy</p>
          </div>
          {currState === "Login" ? (
            <p>
              Create a new account?
              <span onClick={() => { setCurrState("Sign Up"); setErrorMsg(""); }}> Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => { setCurrState("Login"); setErrorMsg(""); }}> Login here</span>{" "}
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPopup;
