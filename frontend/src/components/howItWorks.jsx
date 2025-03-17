import React from "react";
import { ClipboardList, Users, CheckCircle } from "lucide-react";
import { motion, useAnimation } from "framer-motion";

const steps = [
  {
    title: "Request a Service",
    description: "Describe what you need, add details, and set your location to find the perfect match.",
    icon: <ClipboardList />,
    accent: "from-blue-50 to-blue-100",
    color: "#0D1B2A"
  },
  {
    title: "Get Matched",
    description: "We'll connect you with verified professionals in your area based on your requirements.",
    icon: <Users />,
    accent: "from-orange-50 to-orange-100",
    color: "#E76F51"
  },
  {
    title: "Complete & Pay",
    description: "When the job is done to your satisfaction, make secure payment through our platform.",
    icon: <CheckCircle />,
    accent: "from-teal-50 to-teal-100",
    color: "#2A9D8F"
  },
];

const HowItWorks = () => {
  const arrowControls = useAnimation();

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
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#0D1B2A] to-[#1B263B] drop-shadow-lg">
            How It Works
          </h2>
          <div className="w-48 h-1.5 bg-gradient-to-r from-[#F4A261] via-[#E76F51] to-[#2A9D8F] mx-auto rounded-full mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Simple 3-step process to get your tasks done with trusted professionals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto relative">
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
                className="absolute -top-8 -left-8 w-20 h-20 rounded-full bg-gradient-to-br from-[#0D1B2A] to-[#1B263B] flex items-center justify-center text-white font-bold text-3xl shadow-lg z-20"
                animate={{
                  scale: [1, 1.1, 1],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              >
                {index + 1}
              </motion.div>
              
              {/* Animated arrow */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10"
                  initial={{ opacity: 0 }}
                  animate={arrowControls}
                >
                  <svg 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-300 group-hover:text-[#F4A261]"
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
                className={`h-full p-8 rounded-3xl shadow-xl bg-gradient-to-br ${step.accent} border border-white hover:shadow-2xl transition duration-500 flex flex-col`}
                whileHover={{ scale: 1.05 }}
              >
                {/* Icon container */}
                <motion.div 
                  className="bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-md mb-6 mx-auto relative z-10"
                  whileHover={{
                    rotate: 360, // Rotate 360 degrees on hover
                    transition: { duration: 1, ease: "easeInOut" }
                  }}
                >
                  {React.cloneElement(step.icon, {
                    size: 40,
                    className: `text-[${step.color}] drop-shadow-lg`
                  })}
                </motion.div>

                <h3 className="text-2xl md:text-3xl font-bold text-[#0D1B2A] mb-4 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-center flex-grow">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;