import React from "react";

const Cleaning = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-white text-gray-800">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-300 text-white py-12">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-5xl font-semibold mb-4">Professional Cleaning Services</h1>
          <p className="text-xl mb-8">
            Keep your home and office clean with our expert cleaning services. Affordable, reliable, and efficient.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300">
            Book a Cleaning Service
          </button>
        </div>
      </div>

      {/* Service Cards Section */}
      <div className="container mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-4">Home Cleaning</h2>
            <p className="text-gray-600 mb-6">
              Our home cleaning service ensures every corner of your house is spotless. We use eco-friendly products to
              keep your family safe while providing a deep clean that lasts.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Learn More
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-4">Office Cleaning</h2>
            <p className="text-gray-600 mb-6">
              Maintain a professional and healthy workspace with our office cleaning services. We offer flexible
              schedules to minimize disruption to your business operations.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Learn More
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-4">Move-In/Out Cleaning</h2>
            <p className="text-gray-600 mb-6">
              Moving can be stressful. Let us handle the cleaning so you can focus on settling in. Our move-in/out
              cleaning service ensures your new or old space is pristine.
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
              <p className="text-gray-600 mb-6">Perfect for small spaces like studios or small apartments.</p>
              <p className="text-4xl font-bold mb-6">₹50<span className="text-lg text-gray-600">/session</span></p>
              <ul className="text-left mb-6">
                <li className="mb-2">✓ Dusting and wiping surfaces</li>
                <li className="mb-2">✓ Vacuuming and mopping</li>
                <li className="mb-2">✓ Bathroom cleaning</li>
              </ul>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Choose Plan
              </button>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8 text-center border-2 border-blue-600">
              <h3 className="text-2xl font-semibold mb-4">Standard</h3>
              <p className="text-gray-600 mb-6">Ideal for medium-sized homes or small offices.</p>
              <p className="text-4xl font-bold mb-6">₹80<span className="text-lg text-gray-600">/session</span></p>
              <ul className="text-left mb-6">
                <li className="mb-2">✓ Everything in Basic</li>
                <li className="mb-2">✓ Kitchen deep cleaning</li>
                <li className="mb-2">✓ Window cleaning</li>
              </ul>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Choose Plan
              </button>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4">Premium</h3>
              <p className="text-gray-600 mb-6">Best for large spaces, offices, or recurring cleaning needs.</p>
              <p className="text-4xl font-bold mb-6">₹120<span className="text-lg text-gray-600">/session</span></p>
              <ul className="text-left mb-6">
                <li className="mb-2">✓ Everything in Standard</li>
                <li className="mb-2">✓ Carpet cleaning</li>
                <li className="mb-2">✓ Appliance cleaning</li>
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
              "The cleaning service was fantastic! My home has never been this clean. The team was punctual, friendly,
              and thorough. Highly recommend!"
            </p>
            <p className="font-semibold">- Sarah L.</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <p className="text-gray-600 mb-6">
              "Professional and efficient. Our office looks brand new after their cleaning. They even went above and
              beyond to clean areas we didn't expect. Thank you!"
            </p>
            <p className="font-semibold">- John D.</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <p className="text-gray-600 mb-6">
              "I booked the move-out cleaning service, and I couldn't be happier. They made the process so easy, and my
              landlord was impressed with how clean the apartment was."
            </p>
            <p className="font-semibold">- Emily R.</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <p className="text-gray-600 mb-6">
              "The premium plan is worth every penny. They cleaned my entire house, including the carpets and appliances.
              It feels like a brand-new home!"
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
                Booking a service is easy! Simply click the "Book a Cleaning Service" button above, fill out the form,
                and we'll get back to you to confirm your appointment.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4">What cleaning products do you use?</h3>
              <p className="text-gray-600">
                We use eco-friendly and non-toxic cleaning products that are safe for your family, pets, and the
                environment.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4">Can I customize my cleaning plan?</h3>
              <p className="text-gray-600">
                Absolutely! We offer customizable cleaning plans to meet your specific needs. Just let us know your
                requirements during booking.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4">Do you offer recurring services?</h3>
              <p className="text-gray-600">
                Yes, we offer weekly, bi-weekly, and monthly cleaning services to keep your space consistently clean.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-300 text-white py-16">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8">
            Book a cleaning service today and experience the difference of a professionally cleaned home or office.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300">
            Get Started Now
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-8">
        <div className="container mx-auto text-center px-6">
          <p className="text-lg">&copy; 2023 Cleaning Services. All rights reserved.</p>
          <p className="text-sm mt-2">123 Clean Street, Suite 456, Clean City, CC 78910</p>
          <p className="text-sm mt-2">Email: info@cleaningservices.com | Phone: (123) 456-7890</p>
        </div>
      </div>
    </div>
  );
};

export default Cleaning;