import React from "react";

const Babysitting = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Header Section */}
      <header className="bg-pink-500 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Trusted Babysitting Services</h1>
        <p className="text-lg mb-6">
          Providing safe, caring, and professional babysitting services for your little ones. Reliable and affordable.
        </p>
        <button className="bg-white text-pink-500 px-6 py-3 rounded-md font-semibold hover:bg-pink-100 transition">
          Book a Babysitter
        </button>
      </header>

      {/* Service Cards Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Infant Care */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">Infant Care</h3>
            <p className="text-gray-700 mb-6">
              Specialized babysitters trained to handle newborns and infants with the utmost care and safety.
            </p>
            <a href="#" className="text-pink-500 font-semibold hover:underline">
              Learn More
            </a>
          </div>
          {/* Toddler Care */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">Toddler Care</h3>
            <p className="text-gray-700 mb-6">
              Fun and engaging babysitting services for toddlers, ensuring a safe and playful environment.
            </p>
            <a href="#" className="text-pink-500 font-semibold hover:underline">
              Learn More
            </a>
          </div>
          {/* Overnight Babysitting */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">Overnight Babysitting</h3>
            <p className="text-gray-700 mb-6">
              Need a night out? Our trusted babysitters provide overnight care for your little ones.
            </p>
            <a href="#" className="text-pink-500 font-semibold hover:underline">
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
              <p className="text-gray-700 mb-6">
                Ideal for occasional babysitting needs, up to 3 hours.
              </p>
              <p className="text-3xl font-bold mb-6">₹30/session</p>
              <button className="bg-pink-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-pink-600 transition">
                Choose Plan
              </button>
            </div>
            {/* Standard Plan */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-4">Standard</h3>
              <p className="text-gray-700 mb-6">
                Perfect for daily babysitting needs, up to 6 hours.
              </p>
              <p className="text-3xl font-bold mb-6">₹50/session</p>
              <button className="bg-pink-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-pink-600 transition">
                Choose Plan
              </button>
            </div>
            {/* Premium Plan */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-4">Premium</h3>
              <p className="text-gray-700 mb-6">
                Full-day babysitting with meal preparation and activities.
              </p>
              <p className="text-3xl font-bold mb-6">₹80/session</p>
              <button className="bg-pink-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-pink-600 transition">
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-pink-500 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Looking for Reliable Babysitting?</h2>
        <p className="text-lg mb-6">
          Book a babysitter today and ensure a safe, caring, and fun environment for your child.
        </p>
        <button className="bg-white text-pink-500 px-6 py-3 rounded-md font-semibold hover:bg-pink-100 transition">
          Get Started Now
        </button>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p className="text-sm">© 2023 Babysitting Services. All rights reserved.</p>
        <p className="text-sm mt-2">456 Care Street, Suite 789, Babysitting City, BC 12345</p>
        <p className="text-sm mt-2">Email: info@babysittingservices.com | Phone: (987) 654-3210</p>
      </footer>
    </div>
  );
};

export default Babysitting;