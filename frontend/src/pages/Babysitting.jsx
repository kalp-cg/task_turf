import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServiceBookingModal from "../components/ServiceBookingModal";
import { motion } from "framer-motion";
import { 
  Heart, 
  Baby, 
  Users, 
  Moon, 
  CheckCircle, 
  Star, 
  Shield,
  Award,
  Clock
} from "lucide-react";

const Babysitting = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const services = [
    {
      icon: Baby,
      title: "Infant Care",
      description: "Specialized babysitters trained to handle newborns and infants with the utmost care and safety.",
      price: "Starting at ₹400/hour",
      features: ["Newborn care", "Feeding assistance", "Diaper changing", "Safety protocols"]
    },
    {
      icon: Users,
      title: "Toddler Care",
      description: "Fun and engaging babysitting services for toddlers, ensuring a safe and playful environment.",
      price: "Starting at ₹350/hour",
      features: ["Playtime activities", "Meal preparation", "Educational games", "Safety supervision"]
    },
    {
      icon: Moon,
      title: "Overnight Care",
      description: "Need a night out? Our trusted babysitters provide overnight care for your little ones.",
      price: "Starting at ₹2,000/night",
      features: ["Overnight supervision", "Bedtime routines", "Emergency preparedness", "Morning care"]
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Background Verified",
      description: "All babysitters undergo thorough background checks"
    },
    {
      icon: Award,
      title: "Trained Professionals",
      description: "Certified childcare providers with proper training"
    },
    {
      icon: Heart,
      title: "Caring & Loving",
      description: "Passionate about providing loving care for children"
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      description: "Available for your schedule, including weekends"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      rating: 5,
      comment: "Amazing babysitting service! My daughter loved her babysitter. Very professional and caring.",
      location: "Mumbai"
    },
    {
      name: "Rohit Patel",
      rating: 5,
      comment: "Reliable and trustworthy. Our babysitter was punctual and great with our toddler twins.",
      location: "Delhi"
    },
    {
      name: "Anita Singh",
      rating: 5,
      comment: "Excellent overnight care service. We felt completely comfortable leaving our baby with them.",
      location: "Bangalore"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <motion.div 
        className="bg-gradient-to-r from-pink-500 via-purple-400 to-pink-400 text-white py-20"
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
            <Heart className="w-16 h-16 mx-auto mb-6 text-pink-200" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Trusted Babysitting Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Providing safe, caring, and professional babysitting services for your little ones. 
              Reliable and affordable childcare you can trust.
            </p>
            <motion.button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-white text-pink-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Babysitter
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Babysitting Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of childcare services designed to meet all your needs
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
              <service.icon className="w-12 h-12 text-pink-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="mb-6">
                <span className="text-2xl font-bold text-pink-600">{service.price}</span>
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
                className="w-full bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition duration-300"
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Why Choose TaskTurf Babysitting?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing exceptional childcare services with the highest standards
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
                  <feature.icon className="w-10 h-10 text-pink-600" />
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">What Our Families Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied families
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
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
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
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-20">
        <div className="container mx-auto text-center px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for Quality Childcare?</h2>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Book your babysitting service today and experience the TaskTurf difference
            </p>
            <motion.button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-white text-pink-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Your Babysitter Now
            </motion.button>
          </motion.div>
        </div>
      </div>

      <Footer />

      {/* Booking Modal */}
      <ServiceBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        serviceType="babysitting"
      />
    </div>
  );
};

export default Babysitting;