import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServiceBookingModal from "../components/ServiceBookingModal";
import { motion } from "framer-motion";
import { 
  Leaf, 
  Scissors, 
  TreePine, 
  Flower, 
  CheckCircle, 
  Star, 
  Users, 
  Shield,
  Award,
  Clock
} from "lucide-react";

const Gardening = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const services = [
    {
      icon: Scissors,
      title: "Garden Maintenance",
      description: "Regular garden upkeep including lawn mowing, pruning, weeding, and general garden care to keep your outdoor space beautiful.",
      price: "Starting at ₹800",
      features: ["Lawn mowing", "Pruning & trimming", "Weeding", "Fertilizing"]
    },
    {
      icon: TreePine,
      title: "Landscaping",
      description: "Professional landscaping services to design and create beautiful outdoor spaces that enhance your property's value.",
      price: "Starting at ₹2,500",
      features: ["Garden design", "Plant installation", "Hardscaping", "Irrigation setup"]
    },
    {
      icon: Flower,
      title: "Seasonal Care",
      description: "Specialized seasonal gardening services including planting, harvesting, and preparing your garden for different seasons.",
      price: "Starting at ₹1,200",
      features: ["Seasonal planting", "Harvest assistance", "Winter preparation", "Spring cleanup"]
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Eco-Friendly",
      description: "We use organic and environmentally safe gardening practices"
    },
    {
      icon: Award,
      title: "Expert Gardeners",
      description: "Professional gardeners with years of horticultural experience"
    },
    {
      icon: Users,
      title: "Custom Solutions",
      description: "Tailored gardening services to meet your specific needs"
    },
    {
      icon: Clock,
      title: "Regular Maintenance",
      description: "Flexible scheduling for ongoing garden care"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      rating: 5,
      comment: "Transformed our backyard into a beautiful garden. The team was knowledgeable and professional.",
      location: "Mumbai"
    },
    {
      name: "Meera Shah",
      rating: 5,
      comment: "Excellent garden maintenance service. Our lawn has never looked better!",
      location: "Delhi"
    },
    {
      name: "Arjun Patel",
      rating: 5,
      comment: "Professional landscaping work. They created exactly what we envisioned for our outdoor space.",
      location: "Bangalore"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <motion.div 
        className="bg-gradient-to-r from-green-500 via-green-400 to-emerald-500 text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto text-center px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Leaf className="w-16 h-16 mx-auto mb-6 text-green-200" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Professional Gardening Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Transform your outdoor space with our expert gardening services. 
              From maintenance to landscaping, we create beautiful gardens.
            </p>
            <motion.button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-white text-green-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Gardening Service
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Service Cards Section */}
      <div className="container mx-auto py-20 px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Gardening Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of gardening services designed to meet all your outdoor needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-xl rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <service.icon className="w-12 h-12 text-green-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="mb-6">
                <span className="text-2xl font-bold text-green-600">{service.price}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
              >
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Why Choose TaskTurf Gardening?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing exceptional gardening services with the highest standards
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <feature.icon className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto py-20 px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.comment}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-20">
        <div className="container mx-auto text-center px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for a Beautiful Garden?</h2>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Book your gardening service today and transform your outdoor space
            </p>
            <motion.button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-white text-green-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Your Gardening Service Now
            </motion.button>
          </motion.div>
        </div>
      </div>

      <Footer />

      {/* Booking Modal */}
      <ServiceBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        serviceType="gardening"
      />
    </div>
  );
};

export default Gardening;