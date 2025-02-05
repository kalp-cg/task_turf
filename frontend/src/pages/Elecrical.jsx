import React from "react";

const Electrical = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Header Section */}
      <header className="bg-yellow-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Professional Electrical Services</h1>
        <p className="text-lg mb-6">
          Ensure the safety and efficiency of your home and office with our expert electrical services. Reliable, affordable, and high-quality solutions.
        </p>
        <button className="bg-white text-yellow-600 px-6 py-3 rounded-md font-semibold hover:bg-yellow-100 transition">
          Book an Electrical Service
        </button>
      </header>

      {/* Service Cards Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Residential Electrical */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">Residential Electrical</h3>
            <p className="text-gray-700 mb-6">
              From wiring installations to lighting fixtures, we ensure your home's electrical systems are safe and efficient.
            </p>
            <a href="#" className="text-yellow-600 font-semibold hover:underline">
              Learn More
            </a>
          </div>
          {/* Commercial Electrical */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">Commercial Electrical</h3>
            <p className="text-gray-700 mb-6">
              Keep your business powered with our expert commercial electrical services, from panel upgrades to wiring maintenance.
            </p>
            <a href="#" className="text-yellow-600 font-semibold hover:underline">
              Learn More
            </a>
          </div>
          {/* Emergency Electrical */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">Emergency Electrical</h3>
            <p className="text-gray-700 mb-6">
              Our 24/7 emergency electrical services handle power outages, circuit failures, and urgent repairs.
            </p>
            <a href="#" className="text-yellow-600 font-semibold hover:underline">
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
              <p className="text-gray-700 mb-6">Ideal for small electrical repairs and troubleshooting.</p>
              <p className="text-3xl font-bold mb-6">$60/service</p>
              <ul className="text-gray-700 mb-6 space-y-2">
                <li>✓ Outlet repair</li>
                <li>✓ Switch replacement</li>
                <li>✓ Minor wiring fixes</li>
              </ul>
              <button className="bg-yellow-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-yellow-700 transition">
                Choose Plan
              </button>
            </div>
            {/* Standard Plan */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-4">Standard</h3>
              <p className="text-gray-700 mb-6">Perfect for panel upgrades and larger electrical needs.</p>
              <p className="text-3xl font-bold mb-6">$100/service</p>
              <ul className="text-gray-700 mb-6 space-y-2">
                <li>✓ Everything in Basic</li>
                <li>✓ Circuit breaker replacement</li>
                <li>✓ Panel upgrades</li>
              </ul>
              <button className="bg-yellow-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-yellow-700 transition">
                Choose Plan
              </button>
            </div>
            {/* Premium Plan */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-4">Premium</h3>
              <p className="text-gray-700 mb-6">Best for large-scale electrical projects and smart home automation.</p>
              <p className="text-3xl font-bold mb-6">$150/service</p>
              <ul className="text-gray-700 mb-6 space-y-2">
                <li>✓ Everything in Standard</li>
                <li>✓ Smart home wiring</li>
                <li>✓ Whole-house rewiring</li>
              </ul>
              <button className="bg-yellow-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-yellow-700 transition">
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-yellow-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Need Expert Electrical Services?</h2>
        <p className="text-lg mb-6">Book an appointment today and let our professionals handle your electrical needs.</p>
        <button className="bg-white text-yellow-600 px-6 py-3 rounded-md font-semibold hover:bg-yellow-100 transition">
          Get Started Now
        </button>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p className="text-sm">© 2023 Electrical Services. All rights reserved.</p>
        <p className="text-sm mt-2">456 Voltage Avenue, Suite 789, Electric City, EC 56789</p>
        <p className="text-sm mt-2">Email: info@electricalservices.com | Phone: (987) 654-3210</p>
      </footer>
    </div>
  );
};

export default Electrical;
