import React from "react";

const Painting = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Professional Painting Services</h1>
        <p className="text-lg mb-6">
          Transform your space with our expert painting services, delivering quality and precision.
        </p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-100 transition">
          Book a Painting Service
        </button>
      </header>

      {/* Service Cards Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Interior Painting */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">Interior Painting</h3>
            <p className="text-gray-700 mb-6">
              Enhance your home's interiors with high-quality paint and professional finishes.
            </p>
            <a href="#" className="text-blue-600 font-semibold hover:underline">
              Learn More
            </a>
          </div>
          {/* Exterior Painting */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">Exterior Painting</h3>
            <p className="text-gray-700 mb-6">
              Protect and beautify your home's exterior with durable and weather-resistant paint.
            </p>
            <a href="#" className="text-blue-600 font-semibold hover:underline">
              Learn More
            </a>
          </div>
          {/* Custom Art & Murals */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">Custom Art & Murals</h3>
            <p className="text-gray-700 mb-6">
              Personalize your space with unique murals and artistic designs tailored to your taste.
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
              <p className="text-gray-700 mb-6">Ideal for single-room painting projects.</p>
              <p className="text-3xl font-bold mb-6">$100/room</p>
              <ul className="text-gray-700 mb-6 space-y-2">
                <li>✓ Wall painting</li>
                <li>✓ Basic touch-ups</li>
                <li>✓ Standard color options</li>
              </ul>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
                Choose Plan
              </button>
            </div>
            {/* Standard Plan */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-4">Standard</h3>
              <p className="text-gray-700 mb-6">Perfect for multi-room or detailed projects.</p>
              <p className="text-3xl font-bold mb-6">$300/project</p>
              <ul className="text-gray-700 mb-6 space-y-2">
                <li>✓ Everything in Basic</li>
                <li>✓ Multiple color choices</li>
                <li>✓ Minor wall repairs</li>
              </ul>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
                Choose Plan
              </button>
            </div>
            {/* Premium Plan */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-4">Premium</h3>
              <p className="text-gray-700 mb-6">Best for full home makeovers and custom designs.</p>
              <p className="text-3xl font-bold mb-6">$700/project</p>
              <ul className="text-gray-700 mb-6 space-y-2">
                <li>✓ Everything in Standard</li>
                <li>✓ Custom designs & murals</li>
                <li>✓ Premium paint & finishes</li>
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
        <h2 className="text-3xl font-bold mb-4">Ready to Refresh Your Space?</h2>
        <p className="text-lg mb-6">Book our painting services and bring your vision to life.</p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-100 transition">
          Get Started Now
        </button>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p className="text-sm">© 2023 Painting Services. All rights reserved.</p>
        <p className="text-sm mt-2">456 Art Street, Suite 101, Design City, DC 12345</p>
        <p className="text-sm mt-2">Email: info@paintingservices.com | Phone: (555) 987-6543</p>
      </footer>
    </div>
  );
};

export default Painting;
