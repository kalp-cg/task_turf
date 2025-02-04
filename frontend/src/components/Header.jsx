import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-teal-500 to-blue-400 shadow-lg p-4 flex justify-between items-center px-8 sticky top-0 z-50">
      <h1 className="text-3xl font-extrabold text-white">Taskturf</h1>
      <nav className="space-x-6">
        <Link to="/services" className="text-white hover:text-yellow-300 transition duration-300">Services</Link>
        <Link to="/how-it-works" className="text-white hover:text-yellow-300 transition duration-300">How it Works</Link>
        <Link to="/workers" className="text-white hover:text-yellow-300 transition duration-300">Workers</Link>
        <Link to="/about" className="text-white hover:text-yellow-300 transition duration-300">About Us</Link>
        <Link to="/contact" className="text-white hover:text-yellow-300 transition duration-300">Contact</Link>
      </nav>
      <div className="space-x-4">
        <Link to="/login">
          <button className="border border-white px-6 py-2 rounded-lg text-white hover:bg-white hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105">
            Register
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
