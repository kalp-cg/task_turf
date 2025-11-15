import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingSteps from "../components/BookingSteps";
import { motion } from "framer-motion";
import { 
  Wrench, 
  Home, 
  Building, 
  Clock, 
  CheckCircle, 
  Star, 
  Users, 
  Shield,
  Award,
  Zap
} from "lucide-react";

const Plumbing = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const serviceData = {
    title: "Plumbing Services",
    description: "Professional plumbing repairs and installations",
    category: "Plumbing",
    basePrice: 800
  };

  const services = [
    {
      icon: Home,
      title: "Residential Plumbing",
      description: "Our residential plumbing service ensures all your home's plumbing needs are met. From leak repairs to water heater installations, we handle it all with precision and care.",
      price: "Starting at ₹800",
      features: ["Leak repairs", "Faucet replacement", "Water heater service", "Pipe installation"]
    },
    {
      icon: Building,
      title: "Commercial Plumbing",
      description: "Maintain a professional and functional workspace with our commercial plumbing services. We offer flexible scheduling to minimize disruption to your business operations.",
      price: "Starting at ₹1,500",
      features: ["Office plumbing", "Industrial systems", "Emergency repairs", "Maintenance contracts"]
    },
    {
      icon: Zap,
      title: "Emergency Plumbing",
      description: "Plumbing emergencies can happen anytime. Our team is available 24/7 to handle leaks, clogs, and other urgent plumbing issues to get your life back on track.",
      price: "Starting at ₹1,200",
      features: ["24/7 availability", "Emergency repairs", "Leak detection", "Burst pipe fixes"]
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Licensed & Insured",
      description: "All our plumbers are fully licensed and insured for your peace of mind"
    },
    {
      icon: Award,
      title: "Expert Technicians",
      description: "Experienced plumbing professionals with years of training"
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Committed to providing exceptional customer service"
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Fast response times for all your plumbing emergencies"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "The plumbing service was fantastic! They fixed my leaky faucet in no time. The team was punctual, friendly, and thorough. Highly recommend!",
      location: "Mumbai"
    },
    {
      name: "John Davis",
      rating: 5,
      comment: "Professional and efficient. Our office plumbing issues were resolved quickly. They even went above and beyond to fix areas we didn't expect.",
      location: "Delhi"
    },
    {
      name: "Emily Roberts",
      rating: 5,
      comment: "I had a plumbing emergency in the middle of the night, and they arrived within an hour. They made the process so easy, and my issue was resolved promptly.",
      location: "Bangalore"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - Simplified without glass effects */}
      <motion.div 
        className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-16"
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
            <Wrench className="w-16 h-16 mx-auto mb-6 text-orange-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Plumbing Services
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Keep your home and office plumbing systems in top condition with our expert plumbing services. 
              Affordable, reliable, and efficient solutions.
            </p>
            <motion.button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-white text-orange-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Plumbing Service
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Service Cards Section - Simplified shadows */}
      <div className="container mx-auto py-16 px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Plumbing Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of plumbing services designed to meet all your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -2 }}
            >
              <service.icon className="w-12 h-12 text-orange-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="mb-6">
                <span className="text-2xl font-bold text-orange-600">{service.price}</span>
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
                className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition duration-300"
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Why Choose TaskTurf Plumbing?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing exceptional plumbing services with the highest standards
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
                  <feature.icon className="w-10 h-10 text-orange-600" />
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
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
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
      <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white py-20">
        <div className="container mx-auto text-center px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Fix Your Plumbing Issues?</h2>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Book your plumbing service today and experience the TaskTurf difference
            </p>
            <motion.button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-white text-orange-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Your Plumbing Service Now
            </motion.button>
          </motion.div>
        </div>
      </div>

      <Footer />

      {/* Booking Modal - Updated to use BookingSteps */}
      <BookingSteps
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        serviceData={serviceData}
      />
    </div>
  );
};

export default Plumbing;