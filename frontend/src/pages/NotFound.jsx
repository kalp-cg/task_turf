import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-gray-700">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;