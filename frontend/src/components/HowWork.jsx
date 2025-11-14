import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket, 
  Users, 
  CheckCircle, 
  ShieldCheck,
  CreditCard, 
  MessageCircle, 
  Wrench,
  Settings,
  ClipboardList
} from 'lucide-react';
import { motion, useAnimation } from "framer-motion";

const HowWork = () => {
  const navigate = useNavigate();
  const arrowControls = useAnimation();

  const handleSignUpClick = () => {
    navigate('/register');
  };

  const steps = [
    {
      title: "Post Your Task",
      description: "Create a detailed task listing with requirements, budget, and timeline. Our smart system matches you with qualified professionals instantly.",
      icon: <ClipboardList />,
      bgGradient: "from-orange-50 to-orange-100",
      iconGradient: "from-orange-400 to-pink-400"
    },
    {
      title: "Choose Your Pro",
      description: "Browse verified profiles, compare ratings, and view portfolios. Chat directly with professionals to find your perfect match.",
      icon: <Users />,
      bgGradient: "from-pink-50 to-pink-100",
      iconGradient: "from-pink-400 to-purple-400"
    },
    {
      title: "Get It Done",
      description: "Track progress in real-time, make secure payments, and rate your experience. We handle the logistics so you focus on results.",
      icon: <CheckCircle />,
      bgGradient: "from-purple-50 to-purple-100",
      iconGradient: "from-purple-400 to-indigo-400"
    },
  ];

  const features = [
    {
      title: "100% Secure",
      description: "Protected payments and verified identities",
      icon: <ShieldCheck />,
      gradient: "from-orange-400 to-pink-400"
    },
    {
      title: "Transparent Pricing",
      description: "No hidden fees - pay only for completed work",
      icon: <CreditCard />,
      gradient: "from-pink-400 to-purple-400"
    },
    {
      title: "24/7 Support",
      description: "Dedicated support team always available",
      icon: <MessageCircle />,
      gradient: "from-purple-400 to-indigo-400"
    },
    {
      title: "Smart Matching",
      description: "AI-powered task-professional matching",
      icon: <Wrench />,
      gradient: "from-indigo-400 to-blue-400"
    },
  ];

  const handleStepHover = (index) => {
    if (index < steps.length - 1) {
      arrowControls.start({
        opacity: 1,
        x: 5,
        transition: { duration: 0.3, ease: "easeInOut" }
      });
    }
  };

  const handleStepLeave = () => {
    arrowControls.start({
      opacity: 0,
      x: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    });
  };

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
      {/* Hero Section */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0D1B2A] to-[#1B263B] mb-6 drop-shadow-lg">
            How TaskTurf Works
          </h1>
          <div className="w-48 h-1.5 bg-gradient-to-r from-[#F4A261] via-[#E76F51] to-[#2A9D8F] mx-auto rounded-full mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Simple 3-step process to connect with trusted professionals and get your tasks done seamlessly
          </p>
        </div>
      </motion.div>

      {/* Process Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative group"
              onMouseEnter={() => handleStepHover(index)}
              onMouseLeave={handleStepLeave}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Step number */}
              <motion.div 
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-[#0D1B2A] to-[#1B263B] flex items-center justify-center text-white font-bold text-2xl shadow-xl z-20"
                animate={{
                  scale: [1, 1.05, 1],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                {index + 1}
              </motion.div>

              {/* Animated arrow */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden md:block absolute -right-12 top-1/2 -translate-y-1/2 z-10"
                  initial={{ opacity: 0.3 }}
                  animate={arrowControls}
                >
                  <svg 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-300 group-hover:text-[#F4A261] transition-colors duration-300"
                  >
                    <path 
                      d="M5 12H19M19 12L12 5M19 12L12 19" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              )}

              {/* Card */}
              <motion.div 
                className={`relative p-6 bg-gradient-to-br ${step.bgGradient} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300`}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-br ${step.iconGradient} rounded-full flex items-center justify-center mx-auto mt-8 mb-6 shadow-lg`}
                  whileHover={{
                    rotate: 360,
                    transition: { duration: 0.8, ease: "easeInOut" }
                  }}
                >
                  {React.cloneElement(step.icon, {
                    className: "w-8 h-8 text-white",
                    size: 32
                  })}
                </motion.div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-r from-orange-50 to-pink-50">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0D1B2A] to-[#1B263B] mb-4">
            Why TaskTurf Shines
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#F4A261] to-[#E76F51] mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div 
                className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-lg mb-4 flex items-center justify-center shadow-md`}
                whileHover={{
                  rotate: 180,
                  transition: { duration: 0.5, ease: "easeInOut" }
                }}
              >
                {React.cloneElement(feature.icon, {
                  className: "w-6 h-6 text-white",
                  size: 24
                })}
              </motion.div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-b from-white to-orange-50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0D1B2A] to-[#1B263B] mb-6">
            Ready to Transform Your Tasks?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of users who've found trusted professionals for their projects
          </p>
          <motion.button 
            onClick={handleSignUpClick}
            className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-[#F4A261] to-[#E76F51] text-white font-semibold rounded-full hover:from-[#E76F51] hover:to-[#D95335] transition-all duration-300 shadow-xl hover:shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
            <motion.div
              className="ml-4"
              animate={{
                rotate: 360,
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              <Settings className="w-6 h-6" />
            </motion.div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default HowWork;