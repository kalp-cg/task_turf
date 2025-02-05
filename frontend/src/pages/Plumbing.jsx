import React from "react";

const Plumbing = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Professional Plumbing Services</h1>
        <p className="text-lg mb-6">
          Keep your home and office plumbing systems in top condition with our expert plumbing services. Affordable,
          reliable, and efficient.
        </p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-100 transition">
          Book a Plumbing Service
        </button>
      </header>

      {/* Service Cards Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Residential Plumbing */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">Residential Plumbing</h3>
            <p className="text-gray-700 mb-6">
              Our residential plumbing service ensures all your home's plumbing needs are met. From leak repairs to
              water heater installations, we handle it all with precision and care.
            </p>
            <a href="#" className="text-blue-600 font-semibold hover:underline">
              Learn More
            </a>
          </div>
          {/* Commercial Plumbing */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">Commercial Plumbing</h3>
            <p className="text-gray-700 mb-6">
              Maintain a professional and functional workspace with our commercial plumbing services. We offer flexible
              scheduling to minimize disruption to your business operations.
            </p>
            <a href="#" className="text-blue-600 font-semibold hover:underline">
              Learn More
            </a>
          </div>
          {/* Emergency Plumbing */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">Emergency Plumbing</h3>
            <p className="text-gray-700 mb-6">
              Plumbing emergencies can happen anytime. Our team is available 24/7 to handle leaks, clogs, and other
              urgent plumbing issues to get your life back on track.
            </p>
            <a href="#" className="text-blue-600 font-semibold hover:underline">
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
                Perfect for small plumbing fixes like leaky faucets or minor clogs.
              </p>
              <p className="text-3xl font-bold mb-6">$50/service</p>
              <ul className="text-gray-700 mb-6 space-y-2">
                <li>✓ Leak repairs</li>
                <li>✓ Faucet replacement</li>
                <li>✓ Minor drain cleaning</li>
              </ul>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
                Choose Plan
              </button>
            </div>
            {/* Standard Plan */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-4">Standard</h3>
              <p className="text-gray-700 mb-6">
                Ideal for medium-sized plumbing needs, such as water heater maintenance or toilet repairs.
              </p>
              <p className="text-3xl font-bold mb-6">$80/service</p>
              <ul className="text-gray-700 mb-6 space-y-2">
                <li>✓ Everything in Basic</li>
                <li>✓ Water heater maintenance</li>
                <li>✓ Toilet repairs</li>
              </ul>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
                Choose Plan
              </button>
            </div>
            {/* Premium Plan */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-4">Premium</h3>
              <p className="text-gray-700 mb-6">
                Best for large spaces, offices, or recurring plumbing needs.
              </p>
              <p className="text-3xl font-bold mb-6">$120/service</p>
              <ul className="text-gray-700 mb-6 space-y-2">
                <li>✓ Everything in Standard</li>
                <li>✓ Sewer line inspection</li>
                <li>✓ Pipe replacement</li>
              </ul>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Fix Your Plumbing Issues?</h2>
        <p className="text-lg mb-6">
          Book a plumbing service today and experience the difference of a professionally maintained plumbing system.
        </p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-100 transition">
          Get Started Now
        </button>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p className="text-sm">
          © 2023 Plumbing Services. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          123 Pipe Street, Suite 456, Plumbing City, PC 78910
        </p>
        <p className="text-sm mt-2">
          Email: info@plumbingservices.com | Phone: (123) 456-7890
        </p>
      </footer>
    </div>
  );
};

export default Plumbing;