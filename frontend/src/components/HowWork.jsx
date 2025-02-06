import React from 'react';

const HowWork = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">How TaskTurf Works</h1>
          <p className="mt-4 text-lg text-gray-600">
            A simple and seamless way for users and workers to connect and get things done.
          </p>
        </div>

        {/* Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Post a Task</h3>
            <p className="text-gray-600">
              Describe the task you need help with and post it on TaskTurf. Include details like location, budget, and timeline.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Workers</h3>
            <p className="text-gray-600">
              Browse through a list of skilled workers who match your task requirements. View their profiles, ratings, and reviews.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Hire and Collaborate</h3>
            <p className="text-gray-600">
              Contact the worker of your choice, finalize the details, and collaborate to get the job done efficiently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWork;