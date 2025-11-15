import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingSteps from "../components/BookingSteps";
import { motion } from "framer-motion";
import { 
  Zap, 
  Home, 
  Building, 
  AlertTriangle, 
  CheckCircle, 
  Star, 
  Users, 
  Shield,
  Award,
  Clock
} from "lucide-react";

const Electrical = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const serviceData = {
    title: "Electrical Services",
    description: "Professional electrical repairs and installations",
    category: "Electrical",
    basePrice: 1000
  };

  const services = [
    {
      icon: Home,
      title: "Residential Electrical",
      description: "From wiring installations to lighting fixtures, we ensure your home's electrical systems are safe and efficient.",
      price: "Starting at ₹1,000",
      features: ["Outlet repair", "Switch replacement", "Lighting installation", "Circuit repair"]
    },
    {
      icon: Building,
      title: "Commercial Electrical",
      description: "Keep your business powered with our expert commercial electrical services, from panel upgrades to wiring maintenance.",
      price: "Starting at ₹2,000",
      features: ["Panel upgrades", "Commercial wiring", "Power distribution", "Safety inspection"]
    },
    {
      icon: AlertTriangle,
      title: "Emergency Electrical",
      description: "Our 24/7 emergency electrical services handle power outages, circuit failures, and urgent repairs.",
      price: "Starting at ₹1,500",
      features: ["24/7 availability", "Power outage fixes", "Circuit failures", "Emergency repairs"]
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Licensed & Insured",
      description: "All our electricians are fully licensed and insured"
    },
    {
      icon: Award,
      title: "Expert Technicians",
      description: "Certified electrical professionals with years of experience"
    },
    {
      icon: Users,
      title: "Safety First",
      description: "We prioritize safety in every electrical project"
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Fast response times for all electrical emergencies"
    }
  ];

  const testimonials = [
    {
      name: "Michael Davis",
      rating: 5,
      comment: "Excellent electrical service! They fixed my home's wiring issues quickly and professionally. Highly recommend!",
      location: "Mumbai"
    },
    {
      name: "Sarah Wilson",
      rating: 5,
      comment: "Professional and reliable. They upgraded our office electrical system without any disruption to business operations.",
      location: "Delhi"
    },
    {
      name: "Robert Johnson",
      rating: 5,
      comment: "Emergency service was outstanding. They responded immediately and fixed our power outage in no time.",
      location: "Bangalore"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <motion.div 
        className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-orange-500 text-white py-20"
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
            <Zap className="w-16 h-16 mx-auto mb-6 text-yellow-200" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Professional Electrical Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Ensure the safety and efficiency of your home and office with our expert electrical services. 
              Reliable, affordable, and high-quality solutions.
            </p>
            <motion.button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-white text-yellow-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book an Electrical Service
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Electrical Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of electrical services designed to meet all your needs
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
              <service.icon className="w-12 h-12 text-yellow-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="mb-6">
                <span className="text-2xl font-bold text-yellow-600">{service.price}</span>
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
                className="w-full bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition duration-300"
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Why Choose TaskTurf Electrical?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing exceptional electrical services with the highest standards
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
                  <feature.icon className="w-10 h-10 text-yellow-600" />
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
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
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
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-20">
        <div className="container mx-auto text-center px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Need Expert Electrical Services?</h2>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Book your electrical service today and experience the TaskTurf difference
            </p>
            <motion.button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-white text-yellow-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Your Electrical Service Now
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

export default Electrical;
