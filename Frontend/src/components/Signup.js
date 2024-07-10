// src/components/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/AuthForm.css";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // Handle signup logic here (e.g., API call to register user)
    // Assuming signup is successful:
    navigate("/QuestionInput");
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form-card">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
