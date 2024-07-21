// src/components/AuthPage.js
import React from "react";
import { Link } from "react-router-dom";
import "./styles/AuthPage.css";

const AuthPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-container" style={{ maxWidth: "350px" }}> {/* Inline style */}
        <h2>Welcome</h2>
        <Link to="/login" className="auth-button">
          Login
        </Link>
        <Link to="/signup" className="auth-button"> 
          Signup
        </Link>
      </div>
    </div>
  );
};

export default AuthPage;
