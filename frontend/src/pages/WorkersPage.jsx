import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Search,
  MapPin,
  ShoppingCart,
  Star,
  XCircle,
  ArrowRightCircle,
  Briefcase,
  CheckCircle,
  Award,
  Clock,
} from "lucide-react";
import Header from "../components/Header";

const WorkerHub = () => {
  const [workers, setWorkers] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://task-turf-6.onrender.com/workers");
        console.log("Backend Response:", res.data); // Log the response
        setWorkers(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching workers:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleConnectClick = (worker) => {
    addToCart(worker);
  };

  const addToCart = (worker) => {
    if (!cartItems.some((item) => item.id === worker.id)) {
      setCartItems([...cartItems, worker]);
    }
  };

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
      <Header cartCount={cartItems.length} />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-amber-600 py-20">
        <div className="absolute inset-0 bg-opacity-30 bg-gradient-to-b from-[#0D1B2A] to-[#1B263B]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
            Expert Services at Your Fingertips
          </h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-10">
            Connect with top-rated professionals for any job, big or small
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-12 flex-wrap">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg px-6 py-4 rounded-lg text-gray-800">
              <div className="text-3xl font-bold text-orange-500">10,000+</div>
              <div className="text-sm text-gray-700">
                Verified Professionals
              </div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg px-6 py-4 rounded-lg text-gray-800">
              <div className="text-3xl font-bold text-green-500">4.8/5</div>
              <div className="text-sm text-gray-700">Average Rating</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg px-6 py-4 rounded-lg text-gray-800">
              <div className="text-3xl font-bold text-blue-500">24/7</div>
              <div className="text-sm text-gray-700">Customer Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-16">
        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Available Professionals
          </h2>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg p-6 animate-pulse"
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-5/6"></div>
                  </div>
                </div>
                <div className="h-20 bg-gray-200 rounded mb-4 mt-4"></div>
                <div className="flex justify-between">
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workers.length > 0 ? (
              workers.map((worker) => (
                <div
                  key={worker.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]"
                >
                  <div className="p-6">
                    <div className="flex gap-4 items-start">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                        {worker.firstname?.charAt(0) || "P"}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">
                          {worker.firstname}
                        </h3>
                        <div className="flex items-center gap-1 mb-1">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(worker.rating || 4.5)
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          <span className="text-sm text-gray-600 ml-1">
                            {worker.ratings || 4.5}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>{worker.address || "Mumbai, India"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-gray-600">
                        {worker.description ||
                          "Professional service provider with years of experience in the industry."}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-medium">
                        {worker.skill || "Professional"}
                      </span>
                      <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                        Available Today
                      </span>
                      <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-medium">
                        5+ Years Exp.
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-500">Hourly Rate</div>
                      <div className="text-xl font-bold text-orange-600">
                        ₹{worker.charge || "1200"}
                      </div>
                    </div>
                    <button
                      onClick={() => handleConnectClick(worker)}
                      className="px-6 py-3 rounded-lg text-white font-medium transition-all bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                    >
                      <span className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Hire Now
                      </span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center col-span-3">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <XCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Professionals Found
                </h3>
                <p className="text-gray-600 mb-6">
                  Please try again later
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Trust Badges */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Our Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-orange-50 rounded-xl p-6 text-center">
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Verified Professionals
              </h3>
              <p className="text-gray-600">
                Every professional undergoes a rigorous verification process
              </p>
            </div>
            <div className="bg-orange-50 rounded-xl p-6 text-center">
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Quality Guaranteed
              </h3>
              <p className="text-gray-600">
                Satisfaction guaranteed or we'll make it right
              </p>
            </div>
            <div className="bg-orange-50 rounded-xl p-6 text-center">
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                On-time Service
              </h3>
              <p className="text-gray-600">
                Professional arrive on schedule or you get a discount
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerHub;