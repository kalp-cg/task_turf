import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket, 
  Users, 
  CheckCircle, 
  ShieldCheck,
  CreditCard, 
  MessageCircle, 
  Wrench, // Replaced Tools with Wrench
  Settings 
} from 'lucide-react';

const HowWork = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/register');
  };

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-pink-500 mb-6">
            Your Tasks, Simplified
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with trusted professionals in minutes - seamless, secure, and smart
          </p>
        </div>
      </div>

      {/* Process Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="relative p-6 bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                <Rocket className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Post Your Task</h3>
            <p className="text-gray-600 leading-relaxed">
              Create a detailed task listing with requirements, budget, and timeline. Our smart system matches you with qualified professionals instantly.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative p-6 bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                <Users className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Choose Your Pro</h3>
            <p className="text-gray-600 leading-relaxed">
              Browse verified profiles, compare ratings, and view portfolios. Chat directly with professionals to find your perfect match.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative p-6 bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Get It Done</h3>
            <p className="text-gray-600 leading-relaxed">
              Track progress in real-time, make secure payments, and rate your experience. We handle the logistics so you focus on results.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-r from-orange-50 to-pink-50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-pink-500">
            Why TaskTurf Shines
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-lg mb-4 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">100% Secure</h4>
            <p className="text-gray-600 text-sm">Protected payments and verified identities</p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-lg mb-4 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Transparent Pricing</h4>
            <p className="text-gray-600 text-sm">No hidden fees - pay only for completed work</p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-lg mb-4 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h4>
            <p className="text-gray-600 text-sm">Dedicated support team always available</p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-lg mb-4 flex items-center justify-center">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Smart Matching</h4>
            <p className="text-gray-600 text-sm">AI-powered task-professional matching</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-b from-orange-50 to-white">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-pink-500 mb-6">
            Ready to Transform Your Tasks?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of users who've found trusted professionals for their projects
          </p>
          <button 
            onClick={handleSignUpClick}
            className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-[#F4A261] to-[#E76F51] text-white font-semibold rounded-full hover:from-[#E76F51] hover:to-[#D95335] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started Now
            <Settings className="ml-4 w-6 h-6 animate-pulse" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowWork;