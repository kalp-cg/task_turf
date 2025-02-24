import React from "react";

const Gardening = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Header Section */}
      <header className="bg-green-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Professional Gardening Services</h1>
        <p className="text-lg mb-6">
          Enhance the beauty of your home with our expert gardening services. Affordable, reliable, and eco-friendly.
        </p>
        <button className="bg-white text-green-600 px-6 py-3 rounded-md font-semibold hover:bg-green-100 transition">
          Book a Gardening Service
        </button>
      </header>

      {/* Service Cards Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Lawn Maintenance */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">Lawn Maintenance</h3>
            <p className="text-gray-700 mb-6">
              Keep your lawn lush and green with our professional maintenance services, including mowing, watering, and fertilizing.
            </p>
            <a href="#" className="text-green-600 font-semibold hover:underline">
              Learn More
            </a>
          </div>
          {/* Planting & Landscaping */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">Planting & Landscaping</h3>
            <p className="text-gray-700 mb-6">
              Transform your garden with our expert planting and landscaping services tailored to your style and needs.
            </p>
            <a href="#" className="text-green-600 font-semibold hover:underline">
              Learn More
            </a>
          </div>
          {/* Tree & Shrub Care */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">Tree & Shrub Care</h3>
            <p className="text-gray-700 mb-6">
              Ensure the health of your trees and shrubs with our trimming, pruning, and disease prevention services.
            </p>
            <a href="#" className="text-green-600 font-semibold hover:underline">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-4">Basic</h3>
              <p className="text-gray-700 mb-6">Perfect for small gardens and regular maintenance.</p>
              <p className="text-3xl font-bold mb-6">₹50/service</p>
              <ul className="text-gray-700 mb-6 space-y-2">
                <li>✓ Lawn mowing</li>
                <li>✓ Basic plant care</li>
                <li>✓ Weed removal</li>
              </ul>
              <button className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition">
                Choose Plan
              </button>
            </div>
            {/* Standard Plan */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-4">Standard</h3>
              <p className="text-gray-700 mb-6">Best for medium-sized gardens needing extra care.</p>
              <p className="text-3xl font-bold mb-6">₹80/service</p>
              <ul className="text-gray-700 mb-6 space-y-2">
                <li>✓ Everything in Basic</li>
                <li>✓ Tree and shrub care</li>
                <li>✓ Soil fertilization</li>
              </ul>
              <button className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition">
                Choose Plan
              </button>
            </div>
            {/* Premium Plan */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-4">Premium</h3>
              <p className="text-gray-700 mb-6">Ideal for large gardens and complete landscaping solutions.</p>
              <p className="text-3xl font-bold mb-6">₹120/service</p>
              <ul className="text-gray-700 mb-6 space-y-2">
                <li>✓ Everything in Standard</li>
                <li>✓ Custom landscaping</li>
                <li>✓ Pest control</li>
              </ul>
              <button className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition">
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-green-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Garden?</h2>
        <p className="text-lg mb-6">Book a gardening service today and bring life to your outdoor space.</p>
        <button className="bg-white text-green-600 px-6 py-3 rounded-md font-semibold hover:bg-green-100 transition">
          Get Started Now
        </button>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p className="text-sm">© 2023 Gardening Services. All rights reserved.</p>
        <p className="text-sm mt-2">123 Green Street, Suite 789, Garden City, GC 56789</p>
        <p className="text-sm mt-2">Email: info@gardeningservices.com | Phone: (123) 456-7890</p>
      </footer>
    </div>
  );
};

export default Gardening;
