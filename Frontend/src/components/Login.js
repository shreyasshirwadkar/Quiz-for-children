import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/AuthForm.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/loginUser",
        {
          userName: username,
          password: password,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setMessage("Login successful!");
        // Redirect to the question input page after a short delay
        setTimeout(() => {
          navigate("/QuestionInput");
        }, 2000);
      } else {
        setMessage("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Login failed. Please check your credentials and try again.");
    }
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
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Login;
