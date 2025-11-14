import React from "react";
import { Link } from "react-router-dom";
import './PopularServices.css';
import {
  Wrench,
  Home,
  Sparkles,
  Droplets,
  Zap,
  Baby,
  Flower2,
  ChefHat,
  Paintbrush,
  Star,
  Clock,
  MapPin
} from "lucide-react";

// Service icon mapping
const serviceIcons = {
  cleaning: Sparkles,
  plumbing: Droplets,
  electrical: Zap,
  babysitting: Baby,
  gardening: Flower2,
  cooking: ChefHat,
  painting: Paintbrush,
  default: Wrench
};

const ServiceCard = ({ 
  service, 
  icon, 
  description, 
  rating = 4.8, 
  price, 
  location = "City Wide",
  duration = "1-2 hours",
  link 
}) => {
  const IconComponent = serviceIcons[icon] || serviceIcons.default;
  
  return (
    <Link to={link || `/${service.toLowerCase()}`} className="block group">
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-100 h-full">
        {/* Service Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-[#F4A261] to-[#E76F51] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <IconComponent className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Service Name */}
        <h3 className="text-xl font-semibold text-gray-800 text-center mb-2 capitalize">
          {service}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-gray-600 text-sm text-center mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center justify-center mb-3">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600 ml-1">{rating}</span>
        </div>

        {/* Service Details */}
        <div className="space-y-2 mb-4">
          {duration && (
            <div className="flex items-center justify-center text-xs text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              {duration}
            </div>
          )}
          <div className="flex items-center justify-center text-xs text-gray-500">
            <MapPin className="w-3 h-3 mr-1" />
            {location}
          </div>
        </div>

        {/* Price */}
        {price && (
          <div className="text-center">
            <span className="text-lg font-bold text-[#F4A261]">
              Starting at ₹{price}
            </span>
          </div>
        )}

        {/* CTA Button */}
        <div className="mt-4">
          <button className="w-full bg-gradient-to-r from-[#F4A261] to-[#E76F51] text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform group-hover:scale-[1.02]">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
  