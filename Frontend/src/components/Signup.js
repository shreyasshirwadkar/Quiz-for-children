import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/AuthForm.css";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/registerUser", {
        userName: name,
        password: password
      });
      if (response.status === 200) {
        setMessage("Signup successful!");
        // Redirect after a short delay to show the message
        setTimeout(() => {
          navigate("/Login");
        }, 1000);
      } else {
        setMessage("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Signup failed. Please try again.");
    }
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
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Signup;
