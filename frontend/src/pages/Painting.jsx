import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServiceBookingModal from "../components/ServiceBookingModal";
import { motion } from "framer-motion";
import { 
  Paintbrush, 
  Home, 
  Building, 
  Palette, 
  CheckCircle, 
  Star, 
  Users, 
  Shield,
  Award,
  Clock
} from "lucide-react";

const Painting = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const services = [
    {
      icon: Home,
      title: "Interior Painting",
      description: "Transform your home's interior with our professional painting services. Quality paints and expert application for lasting results.",
      price: "Starting at ₹25/sq ft",
      features: ["Wall preparation", "Premium paints", "Color consultation", "Clean finish"]
    },
    {
      icon: Building,
      title: "Exterior Painting",
      description: "Protect and beautify your building's exterior with weather-resistant paints and professional painting techniques.",
      price: "Starting at ₹30/sq ft",
      features: ["Weather protection", "Surface preparation", "Quality primers", "Durability guarantee"]
    },
    {
      icon: Palette,
      title: "Decorative Painting",
      description: "Specialized decorative painting services including textures, murals, and artistic finishes for unique spaces.",
      price: "Starting at ₹50/sq ft",
      features: ["Custom designs", "Textured finishes", "Artistic murals", "Specialty techniques"]
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Quality Materials",
      description: "We use only premium quality paints and materials"
    },
    {
      icon: Award,
      title: "Expert Painters",
      description: "Professional painters with years of experience"
    },
    {
      icon: Users,
      title: "Color Consultation",
      description: "Free color consultation to help you choose the perfect palette"
    },
    {
      icon: Clock,
      title: "Timely Completion",
      description: "We complete projects on time without compromising quality"
    }
  ];

  const testimonials = [
    {
      name: "Ravi Kumar",
      rating: 5,
      comment: "Excellent painting work! They transformed our home completely. Very professional team and quality work.",
      location: "Mumbai"
    },
    {
      name: "Sunita Sharma",
      rating: 5,
      comment: "Amazing exterior painting service. Our building looks brand new now. Highly recommend their services!",
      location: "Delhi"
    },
    {
      name: "Amit Patel",
      rating: 5,
      comment: "Beautiful decorative work in our living room. The artistic touch they added exceeded our expectations.",
      location: "Bangalore"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <motion.div 
        className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 text-white py-20"
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
            <Paintbrush className="w-16 h-16 mx-auto mb-6 text-purple-200" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Professional Painting Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Transform your space with our expert painting services. 
              Quality paints, professional application, and beautiful results.
            </p>
            <motion.button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Painting Service
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Painting Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of painting services designed to meet all your needs
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
              <service.icon className="w-12 h-12 text-purple-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="mb-6">
                <span className="text-2xl font-bold text-purple-600">{service.price}</span>
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
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Why Choose TaskTurf Painting?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing exceptional painting services with the highest standards
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
                  <feature.icon className="w-10 h-10 text-purple-600" />
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
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
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
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-20">
        <div className="container mx-auto text-center px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Space?</h2>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Book your painting service today and give your space a fresh new look
            </p>
            <motion.button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Your Painting Service Now
            </motion.button>
          </motion.div>
        </div>
      </div>

      <Footer />

      {/* Booking Modal */}
      <ServiceBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        serviceType="painting"
      />
    </div>
  );
};

export default Painting;