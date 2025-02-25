import React from 'react';
import { useNavigate } from 'react-router-dom';

const HowWork = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/register'); // Redirect to the registration page
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">How TaskTurf Works</h1>
          <p className="mt-4 text-lg text-gray-600">
            A simple and seamless way for users and workers to connect and get things done.
          </p>
        </div>

        {/* Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Post a Task</h3>
            <p className="text-gray-600">
              Describe the task you need help with and post it on TaskTurf. Include details like location, budget, and timeline.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Workers</h3>
            <p className="text-gray-600">
              Browse through a list of skilled workers who match your task requirements. View their profiles, ratings, and reviews.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Hire and Collaborate</h3>
            <p className="text-gray-600">
              Contact the worker of your choice, finalize the details, and collaborate to get the job done efficiently.
            </p>
          </div>
        </div>

        {/* Why Choose TaskTurf Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose TaskTurf?</h2>
            <p className="mt-4 text-lg text-gray-600">
              TaskTurf offers a unique platform that connects users with skilled workers effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Workers</h3>
              <p className="text-gray-600">
                All workers on TaskTurf are verified to ensure trust and reliability.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Wide Range of Services</h3>
              <p className="text-gray-600">
                From home repairs to digital tasks, find the right worker for any job.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Enjoy secure and hassle-free payments with our integrated payment system.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Support</h3>
              <p className="text-gray-600">
                Our dedicated support team is here to help you with any issues or questions.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Join TaskTurf today and experience the easiest way to get things done.
          </p>
          <button
            onClick={handleSignUpClick}
            className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowWork;