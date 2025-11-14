import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#0D1B2A] to-[#1B263B] text-white overflow-hidden">
      {/* Background abstract shape */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4A261] opacity-20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E76F51] opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/4"></div>
      
      {/* Content container */}
      <div className="container mx-auto px-6 py-28 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-4 tracking-tight">
            Task<span className="text-[#F4A261]">Turf</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 leading-relaxed">
            Find trusted professionals for all your home service needs - from cleaning to repairs, all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            {/* Primary CTA */}
            <Link to="/services">
              <button className="w-full sm:w-auto bg-gradient-to-r from-[#F4A261] to-[#E76F51] text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                Book a Service
              </button>
            </Link>
            
            {/* Secondary CTA */}
            <Link to="/workers">
              <button className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition duration-300 transform hover:-translate-y-1">
                Find a Worker
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Curved bottom edge */}
      <div className="h-24 bg-white rounded-t-[50%] relative z-0"></div>
    </section>
  );
};

export default HeroSection;