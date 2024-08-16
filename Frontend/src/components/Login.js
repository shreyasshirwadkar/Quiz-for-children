import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaHome, FaArrowLeft } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // New state for message type

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://quiz-for-children-1.onrender.com/api/v1/users/loginUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // This ensures cookies are sent with the request
          body: JSON.stringify({
            userName: username,
            password: password,
          }),
        }
      );

      if (response.ok) {
        setMessage("Login successful!");
        setMessageType("success"); // Set message type to success
        // Redirect to the question input page after a short delay
        setTimeout(() => {
          navigate("/quizzes");
        }, 2000);
      } else {
        setMessage("Login failed. Please check your credentials and try again.");
        setMessageType("error"); // Set message type to error
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Login failed. Please check your credentials and try again.");
      setMessageType("error"); // Set message type to error
    }
  };

  // Define message styles based on messageType
  const messageStyles = messageType === "success" 
    ? "mt-4 text-center text-green-500" 
    : "mt-4 text-center text-red-500";

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="absolute top-4 left-4 flex items-center space-x-4">
        <Link
          to="/"
          className="text-blue-900 hover:text-black transition-shadow bg-zinc-200 rounded-lg p-2 flex items-center justify-center"
        >
          <FaHome size={30} />
        </Link>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-900 hover:text-black transition-shadow bg-zinc-200 rounded-lg p-2 mt-0 flex items-center justify-center"
        >
          <FaArrowLeft size={30} />
        </button>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xs w-full">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        {message && <p className={messageStyles}>{message}</p>}
      </div>
    </div>
  );
};

export default Login;
