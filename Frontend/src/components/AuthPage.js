import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // Import Font Awesome home icon

const AuthPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
       <div className="absolute top-4 left-4 flex items-center space-x-4">
        <Link
          to="/"
          className="text-blue-900 hover:text-black transition-shadow bg-zinc-200 rounded-lg p-2 flex items-center justify-center"
        >
          <FaHome size={30} />
        </Link>
       
      </div>
      <div className="relative bg-white p-10 rounded-lg shadow-md text-center w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6">Welcome</h1>
        <Link
          to="/login"
          className="block bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-600 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
        >
          Signup
        </Link>
      </div>
    </div>
  );
};

export default AuthPage;
