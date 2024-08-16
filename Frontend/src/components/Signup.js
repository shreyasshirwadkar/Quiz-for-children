import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaHome, FaArrowLeft } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://quiz-for-children-1.onrender.com/api/v1/users/registerUser", {
        userName: name,
        password: password
      });
      if (response.status === 200) {
        setMessage("Signup successful!");
        // Redirect after a short delay to show the message
        setTimeout(() => {
          navigate("/login");
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
    <div className="relative flex items-center justify-center min-h-screen ">
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
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            Signup
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Signup;
