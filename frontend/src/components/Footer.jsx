import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 text-center">
      <div className="flex justify-center gap-6 mb-6">
        <a href="#" className="text-gray-400 hover:text-white transition duration-300"><FaFacebook /></a>
        <a href="#" className="text-gray-400 hover:text-white transition duration-300"><FaTwitter /></a>
        <a href="#" className="text-gray-400 hover:text-white transition duration-300"><FaInstagram /></a>
        <a href="#" className="text-gray-400 hover:text-white transition duration-300"><FaLinkedin /></a>
      </div>
      <p className="text-gray-400">&copy; 2025 TaskTurf. All rights reserved.</p>
      <div className="mt-4">
        <a href="#" className="text-gray-400 hover:text-white transition duration-300 mx-2">Privacy Policy</a>
        <a href="#" className="text-gray-400 hover:text-white transition duration-300 mx-2">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
