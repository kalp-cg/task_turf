import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingSteps from "../components/BookingSteps";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Home, 
  Building, 
  Truck, 
  CheckCircle, 
  Star, 
  Users, 
  Clock,
  Shield,
  Award
} from "lucide-react";

const Cleaning = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const serviceData = {
    title: "Cleaning Services",
    description: "Professional cleaning services for homes and offices",
    category: "Cleaning",
    basePrice: 2000
  };

  const services = [
    {
      icon: Home,
      title: "Home Cleaning",
      description: "Our home cleaning service ensures every corner of your house is spotless. We use eco-friendly products to keep your family safe while providing a deep clean that lasts.",
      price: "Starting at ₹2,000",
      features: ["Kitchen & Bathrooms", "Living Areas", "Bedrooms", "Eco-friendly Products"]
    },
    {
      icon: Building,
      title: "Office Cleaning",
      description: "Maintain a professional and healthy workspace with our office cleaning services. We offer flexible schedules to minimize disruption to your business operations.",
      price: "Starting at ₹2,500",
      features: ["Workstations", "Meeting Rooms", "Washrooms", "Common Areas"]
    },
    {
      icon: Truck,
      title: "Move-In/Out Cleaning",
      description: "Moving can be stressful. Let us handle the cleaning so you can focus on settling in. Our move-in/out cleaning service ensures your new or old space is pristine.",
      price: "Starting at ₹4,000",
      features: ["Deep Cleaning", "Cabinet Cleaning", "Appliance Cleaning", "Final Inspection"]
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Insured & Bonded",
      description: "All our professionals are fully insured and background verified"
    },
    {
      icon: Award,
      title: "5-Star Rated",
      description: "Consistently rated 5 stars by thousands of satisfied customers"
    },
    {
      icon: Users,
      title: "Trusted Team",
      description: "Experienced cleaning professionals with extensive training"
    },
    {
      icon: Clock,
      title: "Flexible Timing",
      description: "Schedule cleaning at your convenience, including weekends"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      rating: 5,
      comment: "Excellent service! The team was professional, punctual, and did an amazing job cleaning my apartment. Will definitely book again.",
      location: "Mumbai"
    },
    {
      name: "Rajesh Kumar",
      rating: 5,
      comment: "Best cleaning service in the city. They cleaned my office space thoroughly and the staff was very courteous. Highly recommended!",
      location: "Delhi"
    },
    {
      name: "Anita Singh",
      rating: 5,
      comment: "I was impressed with their attention to detail. They cleaned areas I didn't even think about. Great value for money.",
      location: "Bangalore"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - Simplified without glass effects */}
      <motion.div 
        className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto text-center px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-blue-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Professional Cleaning Services
            </h1>
            <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
              Keep your home and office spotless with our expert cleaning services. 
              Affordable, reliable, and eco-friendly solutions.
            </p>
            <motion.button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Cleaning Service
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Service Cards Section - Simplified animations and shadows */}
      <div className="container mx-auto py-16 px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Cleaning Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our comprehensive range of cleaning services designed to meet all your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow border border-gray-100"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <service.icon className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>
              
              <div className="mb-4">
                <span className="text-xl font-bold text-blue-600">{service.price}</span>
              </div>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Why Choose TaskTurf Cleaning?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing exceptional cleaning services with the highest standards
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
                  <feature.icon className="w-10 h-10 text-blue-600" />
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
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
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
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-20">
        <div className="container mx-auto text-center px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for a Spotless Space?</h2>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Book your cleaning service today and experience the TaskTurf difference
            </p>
            <motion.button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Your Cleaning Now
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

export default Cleaning;