import React from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, ThumbsUp, ChevronRight, Zap } from "lucide-react";

const workers = [
  { 
    name: "John Doe", 
    skill: "Electrician", 
    rating: 4.8, 
    location: "New York", 
    completedJobs: 143,
    satisfaction: 96,
    image: "https://plus.unsplash.com/premium_photo-1722111091429-dd3dc55979d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8" // Using placeholder image
  },
  { 
    name: "Emma Smith", 
    skill: "Plumber", 
    rating: 4.7, 
    location: "Los Angeles", 
    completedJobs: 92,
    satisfaction: 94,
    image: "https://plus.unsplash.com/premium_photo-1686262005780-67155057c2dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    name: "Michael Lee", 
    skill: "Carpenter", 
    rating: 4.9, 
    location: "Chicago", 
    completedJobs: 217,
    satisfaction: 98,
    image: "https://images.unsplash.com/photo-1741367658528-8134fab3b67d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    name: "Sophia Brown", 
    skill: "Painter", 
    rating: 4.6, 
    location: "Houston", 
    completedJobs: 78,
    satisfaction: 93,
    image: "https://images.unsplash.com/photo-1741522831294-e68994757729?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D"
  }
];
const WorkerCard = ({ worker }) => {
  const ratingStars = Array(5).fill(0).map((_, i) => (
    <Star 
      key={i} 
      size={18} 
      className={`
        ${i < Math.floor(worker.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200"}
        transition-transform duration-300 group-hover:scale-110
      `}
    />
  ));

  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Banner */}
      <div className="relative h-36 bg-gradient-to-r from-orange-50 to-orange-100 overflow-hidden">
        <img 
          src={worker.image}
          alt={worker.name}
          className="w-28 h-28 rounded-full absolute -bottom-10 left-8 border-4 border-white shadow-2xl transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500"
        />
        <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-200 to-orange-300 text-orange-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <Zap size={14} className="animate-pulse" />
          Top Rated
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-12">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h4 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
              {worker.name}
            </h4>
            <p className="text-orange-500 font-medium text-sm mt-1">{worker.skill}</p>
          </div>
          <div className="flex">{ratingStars}</div>
        </div>

        <div className="space-y-3 text-gray-600 mb-6">
          <div className="flex items-center">
            <MapPin size={16} className="mr-2 text-orange-400" />
            <span className="text-sm">{worker.location}</span>
          </div>
          <div className="flex items-center">
            <ThumbsUp size={16} className="mr-2 text-orange-400" />
            <span className="text-sm">{worker.satisfaction}% satisfied ({worker.completedJobs} jobs)</span>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-[#F4A261] to-[#E76F51] text-white py-3 rounded-xl flex items-center justify-center gap-2 group-hover:from-[#E76F51] group-hover:to-[#D95335] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
          View Profile
          <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
  );
};

const FeaturedWorkers = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-gradient-to-r from-orange-200 to-orange-300 text-orange-700 rounded-full text-sm font-medium mb-4">
            Our Experts
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Meet Our Top Professionals
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our hand-picked selection of skilled workers delivering exceptional service nationwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {workers.map((worker) => (
            <WorkerCard key={worker.name} worker={worker} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/workers">
            <button className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden group">
              <span className="z-10">Explore All Professionals</span>
              <ChevronRight size={24} className="ml-3 z-10 transition-transform group-hover:translate-x-2" />
              <span className="absolute inset-0 bg-gradient-to-r from-orange-300 to-orange-400 opacity-20 rounded-xl transition-opacity group-hover:opacity-0" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkers;