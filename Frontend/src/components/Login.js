import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/AuthForm.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/users/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // This ensures cookies are sent with the request
        body: JSON.stringify({
          userName: username,
          password: password,
        })
      });

      if (response.ok) {
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
