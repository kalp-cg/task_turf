import React from "react";

const Plumbing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-white text-gray-800">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-300 text-white py-12">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-5xl font-semibold mb-4">Professional Plumbing Services</h1>
          <p className="text-xl mb-8">
            Keep your home and office plumbing systems in top condition with our expert plumbing services. Affordable, reliable, and efficient.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300">
            Book a Plumbing Service
          </button>
        </div>
      </div>

      {/* Service Cards Section */}
      <div className="container mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-4">Residential Plumbing</h2>
            <p className="text-gray-600 mb-6">
              Our residential plumbing service ensures all your home's plumbing needs are met. From leak repairs to water heater installations, we handle it all with precision and care.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Learn More
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-4">Commercial Plumbing</h2>
            <p className="text-gray-600 mb-6">
              Maintain a professional and functional workspace with our commercial plumbing services. We offer flexible scheduling to minimize disruption to your business operations.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Learn More
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-4">Emergency Plumbing</h2>
            <p className="text-gray-600 mb-6">
              Plumbing emergencies can happen anytime. Our team is available 24/7 to handle leaks, clogs, and other urgent plumbing issues to get your life back on track.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4">Basic</h3>
              <p className="text-gray-600 mb-6">Perfect for small plumbing fixes like leaky faucets or minor clogs.</p>
              <p className="text-4xl font-bold mb-6">₹50<span className="text-lg text-gray-600">/service</span></p>
              <ul className="text-left mb-6">
                <li className="mb-2">✓ Leak repairs</li>
                <li className="mb-2">✓ Faucet replacement</li>
                <li className="mb-2">✓ Minor drain cleaning</li>
              </ul>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Choose Plan
              </button>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8 text-center border-2 border-blue-600">
              <h3 className="text-2xl font-semibold mb-4">Standard</h3>
              <p className="text-gray-600 mb-6">Ideal for medium-sized plumbing needs, such as water heater maintenance or toilet repairs.</p>
              <p className="text-4xl font-bold mb-6">₹80<span className="text-lg text-gray-600">/service</span></p>
              <ul className="text-left mb-6">
                <li className="mb-2">✓ Everything in Basic</li>
                <li className="mb-2">✓ Water heater maintenance</li>
                <li className="mb-2">✓ Toilet repairs</li>
              </ul>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Choose Plan
              </button>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4">Premium</h3>
              <p className="text-gray-600 mb-6">Best for large spaces, offices, or recurring plumbing needs.</p>
              <p className="text-4xl font-bold mb-6">₹120<span className="text-lg text-gray-600">/service</span></p>
              <ul className="text-left mb-6">
                <li className="mb-2">✓ Everything in Standard</li>
                <li className="mb-2">✓ Sewer line inspection</li>
                <li className="mb-2">✓ Pipe replacement</li>
              </ul>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <p className="text-gray-600 mb-6">
              "The plumbing service was fantastic! They fixed my leaky faucet in no time. The team was punctual, friendly, and thorough. Highly recommend!"
            </p>
            <p className="font-semibold">- Sarah L.</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <p className="text-gray-600 mb-6">
              "Professional and efficient. Our office plumbing issues were resolved quickly. They even went above and beyond to fix areas we didn't expect. Thank you!"
            </p>
            <p className="font-semibold">- John D.</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <p className="text-gray-600 mb-6">
              "I had a plumbing emergency in the middle of the night, and they arrived within an hour. They made the process so easy, and my issue was resolved promptly."
            </p>
            <p className="font-semibold">- Emily R.</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <p className="text-gray-600 mb-6">
              "The premium plan is worth every penny. They inspected and replaced my old pipes, and now my plumbing system works like new!"
            </p>
            <p className="font-semibold">- Michael T.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4">How do I book a service?</h3>
              <p className="text-gray-600">
                Booking a service is easy! Simply click the "Book a Plumbing Service" button above, fill out the form, and we'll get back to you to confirm your appointment.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4">What tools and equipment do you use?</h3>
              <p className="text-gray-600">
                We use state-of-the-art plumbing tools and equipment to ensure efficient and long-lasting repairs.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4">Can I customize my plumbing plan?</h3>
              <p className="text-gray-600">
                Absolutely! We offer customizable plumbing plans to meet your specific needs. Just let us know your requirements during booking.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4">Do you offer recurring services?</h3>
              <p className="text-gray-600">
                Yes, we offer weekly, bi-weekly, and monthly plumbing maintenance services to keep your plumbing system in top condition.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-300 text-white py-16">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">Ready to Fix Your Plumbing Issues?</h2>
          <p className="text-xl mb-8">
            Book a plumbing service today and experience the difference of a professionally maintained plumbing system.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300">
            Get Started Now
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-8">
        <div className="container mx-auto text-center px-6">
          <p className="text-lg">&copy; 2023 Plumbing Services. All rights reserved.</p>
          <p className="text-sm mt-2">123 Pipe Street, Suite 456, Plumbing City, PC 78910</p>
          <p className="text-sm mt-2">Email: info@plumbingservices.com | Phone: (123) 456-7890</p>
        </div>
      </div>
    </div>
  );
};

export default Plumbing;