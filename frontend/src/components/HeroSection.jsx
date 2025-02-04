import React from "react";
import { Link } from "react-router-dom"; // For navigation


const HeroSection = () => {
  return (
    <section className="text-center py-24 bg-gradient-to-r from-teal-100 to-blue-50">
      <h2 className="text-5xl font-bold text-gray-800 mb-4">
        Find Trusted Workers for Your Home Services
      </h2>
      <p className="text-gray-600 text-lg mb-8">
        Get skilled professionals for cleaning, plumbing, repair, and more – at your doorstep!
      </p>

      <div className="space-x-4">
        {/* Button to find a worker */}
        <Link to="/workers">
          <button className="bg-teal-500 text-white px-8 py-3 rounded-lg hover:bg-teal-600 transition duration-300">
            Find a Worker
          </button>
        </Link>
        
        {/* Button to find a service */}
        <Link to="/services">
          <button className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
            Find a Service
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
