import React from "react";
import { Link } from "react-router-dom";
import { 
  Droplet, Wrench, Zap, Baby, 
  Leaf, ChefHat, Paintbrush, Bug 
} from "lucide-react";
import { motion } from "framer-motion";
import { handleKeyboardNavigation, generateId, srOnlyClass } from "../utils/accessibility";

const services = [
  { 
    name: "Cleaning", 
    path: "/cleaning", 
    icon: <Droplet />, 
    color: "from-blue-500 to-blue-600",
    description: "Professional home & office cleaning services"
  },
  { 
    name: "Plumbing", 
    path: "/plumbing", 
    icon: <Wrench />, 
    color: "from-green-500 to-green-600",
    description: "Fix leaks, install fixtures, and more"
  },
  { 
    name: "Electrical", 
    path: "/electrical", 
    icon: <Zap />, 
    color: "from-yellow-500 to-yellow-600",
    description: "Wiring, installations, and repairs"
  },
  { 
    name: "Babysitting", 
    path: "/babysitting", 
    icon: <Baby />, 
    color: "from-pink-500 to-pink-600",
    description: "Trusted childcare when you need it"
  },
  { 
    name: "Gardening", 
    path: "/gardening", 
    icon: <Leaf />, 
    color: "from-emerald-500 to-emerald-600",
    description: "Make your outdoor space beautiful"
  },
  { 
    name: "Cooking", 
    path: "/cooking", 
    icon: <ChefHat />, 
    color: "from-orange-500 to-orange-600",
    description: "Personal chefs for special occasions"
  },
  { 
    name: "Painting", 
    path: "/painting", 
    icon: <Paintbrush />, 
    color: "from-purple-500 to-purple-600",
    description: "Interior and exterior painting services"
  },
  { 
    name: "Pest Control", 
    path: "/pest-control", 
    icon: <Bug />, 
    color: "from-red-500 to-red-600",
    description: "Get rid of unwanted pests effectively"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: { 
    scale: 1.05,
    rotate: 2,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const PopularServices = () => {
  const sectionId = generateId('services-section');
  const headingId = 'services-heading';

  return (
    <section 
      id={sectionId}
      className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden"
      aria-labelledby={headingId}
      role="region"
    >
      {/* Background particles with reduced motion for accessibility */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        aria-hidden="true"
        role="presentation"
      >
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-300 to-purple-300 absolute"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: Math.random() * 0.5 + 0.1,
              scale: Math.random() * 0.8 + 0.2
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: Math.random() * 0.5 + 0.1,
              scale: Math.random() * 0.8 + 0.2
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 
            id={headingId}
            className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#0D1B2A] to-[#1B263B] drop-shadow-lg"
          >
            Popular Services
          </h2>
          <div 
            className="w-48 h-1.5 bg-gradient-to-r from-[#F4A261] via-[#E76F51] to-[#2A9D8F] mx-auto rounded-full mb-8"
            role="presentation"
            aria-hidden="true"
          />
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Trusted by 500,000+ users for quality service providers in 200+ categories
          </p>
        </motion.header>

        <div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8"
          role="list"
          aria-label="Popular service categories"
        >
          {services.map((service, index) => {
            const cardId = generateId(`service-card-${service.name.toLowerCase()}`);
            
            return (
              <motion.div
                key={service.name}
                role="listitem"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link 
                  to={service.path}
                  className="block h-full focus:outline-none focus:ring-4 focus:ring-[#F4A261] focus:ring-offset-2 rounded-3xl"
                  aria-describedby={cardId}
                  onKeyDown={(e) => handleKeyboardNavigation(e, () => window.location.href = service.path)}
                >
                  <article className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer h-full flex flex-col transform transition-all duration-300 hover:-translate-y-1">
                    {/* Icon Section */}
                    <div 
                      className={`relative bg-gradient-to-br ${service.color} p-8 flex justify-center items-center`}
                      role="presentation"
                      aria-hidden="true"
                    >
                      {/* Floating particles */}
                      <motion.div 
                        className="absolute inset-0 bg-white/10"
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: [0, 1, 0],
                          opacity: [0.3, 0.6, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                        aria-hidden="true"
                      />
                      {/* Icon with hover-based rotation */}
                      <motion.div
                        className="relative z-10"
                        whileHover={{
                          rotate: 360,
                          transition: {
                            duration: 1,
                            ease: "easeInOut"
                          }
                        }}
                        aria-hidden="true"
                      >
                        {React.cloneElement(service.icon, {
                          className: "text-white drop-shadow-lg",
                          size: 40,
                          'aria-hidden': 'true'
                        })}
                      </motion.div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 pb-8 flex-1 flex flex-col">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#E76F51] transition-colors">
                        {service.name}
                      </h3>
                      <p 
                        id={cardId}
                        className="text-gray-600 mb-4 flex-grow"
                      >
                        {service.description}
                      </p>
                      
                      <motion.div 
                        className="mt-auto flex items-center gap-2 text-[#F4A261] font-semibold group-hover:text-[#E76F51]"
                        whileHover={{ x: 10 }}
                        transition={{ duration: 0.3 }}
                        aria-hidden="true"
                      >
                        <span className={srOnlyClass}>
                          Navigate to {service.name} services page
                        </span>
                        <span aria-hidden="true">Book Now</span>
                        <motion.svg 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24"
                          className="transition-transform"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path 
                            d="M10 17l5-5-5-5v10z" 
                            fill="currentColor"
                          />
                        </motion.svg>
                      </motion.div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularServices;