import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, ThumbsUp, ChevronRight, Zap, DollarSign } from "lucide-react";
import axios from "axios";

const WorkerCard = ({ worker }) => {
  const ratingStars = Array(5).fill(0).map((_, i) => (
    <Star 
      key={i} 
      size={18} 
      className={`
        ${i < Math.floor(worker.rating || 0) ? "text-amber-400 fill-amber-400" : "text-gray-200"}
        transition-transform duration-300 group-hover:scale-110
      `}
    />
  ));

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount || 0);
  };

  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative h-36 bg-gradient-to-r from-orange-50 to-orange-100 overflow-hidden">
        <img 
          src={worker.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${worker.firstName}${worker.lastName}`}
          alt={`${worker.firstName} ${worker.lastName}`}
          className="w-28 h-28 rounded-full absolute -bottom-10 left-8 border-4 border-white shadow-2xl transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 object-cover"
        />
        <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-200 to-orange-300 text-orange-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <Zap size={14} className="animate-pulse" />
          {worker.rating >= 4.5 ? 'Top Rated' : 'Verified'}
        </div>
        {worker.isVerified && (
          <div className="absolute top-12 right-4 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
            ✓ Verified
          </div>
        )}
      </div>

      <div className="p-6 pt-12">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h4 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
              {worker.firstName} {worker.lastName}
            </h4>
            <p className="text-orange-500 font-medium text-sm mt-1">
              {worker.skills && worker.skills.length > 0 ? worker.skills[0] : 'Service Provider'}
            </p>
          </div>
          <div className="flex">{ratingStars}</div>
        </div>

        <div className="space-y-3 text-gray-600 mb-6">
          <div className="flex items-center">
            <MapPin size={16} className="mr-2 text-orange-400" />
            <span className="text-sm">
              {worker.addresses && worker.addresses.length > 0 
                ? worker.addresses[0].city 
                : worker.address?.split(',').slice(-2, -1)[0] || 'Location'}
            </span>
          </div>
          <div className="flex items-center">
            <ThumbsUp size={16} className="mr-2 text-orange-400" />
            <span className="text-sm">
              {worker.completedJobs || 0} jobs completed
            </span>
          </div>
          <div className="flex items-center">
            <DollarSign size={16} className="mr-2 text-green-500" />
            <span className="text-sm font-medium">
              {formatCurrency(worker.hourlyRate || 0)}/hour
            </span>
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
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopWorkers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/auth/workers/top-rated?limit=8');
        setWorkers(response.data.data.workers || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching top workers:', err);
        setError('Failed to load top workers');
        setWorkers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopWorkers();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl shadow-lg p-6">
                  <div className="animate-pulse">
                    <div className="h-32 bg-gray-200 rounded-2xl mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

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

        {workers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {workers.slice(0, 4).map((worker) => (
                <WorkerCard key={worker._id} worker={worker} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/workers">
                <button className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden group">
                  <span className="z-10">Explore All Professionals</span>
                  <ChevronRight size={24} className="ml-3 z-10 transition-transform group-hover:translate-x-2" />
                </button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No top-rated workers available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedWorkers;
