import React from "react";

const Cooking = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Header Section */}
      <header className="bg-red-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Professional Cooking Services</h1>
        <p className="text-lg mb-6">
          Enhance your culinary skills with our expert cooking classes and catering services.
        </p>
        <button className="bg-white text-red-600 px-6 py-3 rounded-md font-semibold hover:bg-red-100 transition">
          Book a Cooking Session
        </button>
      </header>

      {/* Service Cards Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cooking Classes */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">Cooking Classes</h3>
            <p className="text-gray-700 mb-6">
              Learn to cook delicious meals with our professional chefs through hands-on training.
            </p>
            <a href="#" className="text-red-600 font-semibold hover:underline">
              Learn More
            </a>
          </div>
          {/* Catering Services */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">Catering Services</h3>
            <p className="text-gray-700 mb-6">
              Make your events memorable with our high-quality catering services tailored to your needs.
            </p>
            <a href="#" className="text-red-600 font-semibold hover:underline">
              Learn More
            </a>
          </div>
          {/* Meal Prepping */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">Meal Prepping</h3>
            <p className="text-gray-700 mb-6">
              Stay healthy with our customized meal prepping services designed for your lifestyle.
            </p>
            <a href="#" className="text-red-600 font-semibold hover:underline">
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
              <p className="text-gray-700 mb-6">Ideal for beginners wanting to learn simple recipes.</p>
              <p className="text-3xl font-bold mb-6">₹50/session</p>
              <ul className="text-gray-700 mb-6 space-y-2">
                <li>✓ Basic cooking techniques</li>
                <li>✓ Ingredient selection</li>
                <li>✓ Simple meal preparation</li>
              </ul>
              <button className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition">
                Choose Plan
              </button>
            </div>
            {/* Standard Plan */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-4">Standard</h3>
              <p className="text-gray-700 mb-6">Best for home cooks looking to enhance their skills.</p>
              <p className="text-3xl font-bold mb-6">₹80/session</p>
              <ul className="text-gray-700 mb-6 space-y-2">
                <li>✓ Everything in Basic</li>
                <li>✓ Intermediate recipes</li>
                <li>✓ Meal presentation skills</li>
              </ul>
              <button className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition">
                Choose Plan
              </button>
            </div>
            {/* Premium Plan */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-4">Premium</h3>
              <p className="text-gray-700 mb-6">Perfect for aspiring chefs and gourmet enthusiasts.</p>
              <p className="text-3xl font-bold mb-6">₹120/session</p>
              <ul className="text-gray-700 mb-6 space-y-2">
                <li>✓ Everything in Standard</li>
                <li>✓ Advanced techniques</li>
                <li>✓ Exclusive gourmet recipes</li>
              </ul>
              <button className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition">
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-red-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Master Your Cooking Skills?</h2>
        <p className="text-lg mb-6">Join our cooking classes and explore a world of flavors.</p>
        <button className="bg-white text-red-600 px-6 py-3 rounded-md font-semibold hover:bg-red-100 transition">
          Get Started Now
        </button>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p className="text-sm">© 2023 Cooking Services. All rights reserved.</p>
        <p className="text-sm mt-2">123 Culinary Street, Suite 456, Food City, FC 78910</p>
        <p className="text-sm mt-2">Email: info@cookingservices.com | Phone: (987) 654-3210</p>
      </footer>
    </div>
  );
};

export default Cooking;
