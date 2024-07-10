// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/AuthForm.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here (e.g., API call for authentication)
    // Assuming the login is successful:
    navigate("/QuestionInput");
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="auth-input"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              required
            />
          </div>
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
