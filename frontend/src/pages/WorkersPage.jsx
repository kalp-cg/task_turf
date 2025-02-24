


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hook

// Mock worker data
let mockWorkers = [];

const WorkerHub = () => {
  const [workers, setWorkers] = useState(mockWorkers);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState({
    plumbing: false,
    electrical: false,
    carpentry: false,
  });

  const { isAuthenticated, loginWithRedirect } = useAuth0(); // Use Auth0 hook
  const navigate = useNavigate(); // For navigation

  const fetchData = async () => {
    try {
      const res = await axios.get("https://task-turf-2.onrender.com/workers");
      setWorkers(res.data);
      mockWorkers = res.data;
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  useEffect(() => {
    filterWorkers();
  }, [filters, searchTerm, location]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.id]: e.target.checked,
    });
  };

  const filterWorkers = () => {
    let filteredWorkers = mockWorkers;

    if (searchTerm) {
      filteredWorkers = filteredWorkers.filter((worker) =>
        worker.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (location) {
      filteredWorkers = filteredWorkers.filter((worker) =>
        worker.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    const activeFilters = Object.keys(filters).filter((key) => filters[key]);
    if (activeFilters.length > 0) {
      filteredWorkers = filteredWorkers.filter((worker) =>
        activeFilters.includes(worker.category.toLowerCase())
      );
    }

    setWorkers(filteredWorkers);
  };

  // Handle Connect Button Click
  const handleConnectClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect(); // Redirect to login page if not authenticated
    } else {
      navigate("/cart"); // Navigate to cart page if authenticated
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Simplified Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">WorkerHub</h1>
        <button
          onClick={handleConnectClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {isAuthenticated ? "Go to Cart" : "Login to Connect"}
        </button>
      </header>

      {/* Search Bar */}
      <div className="p-6 bg-white flex justify-center shadow-md mt-6 mx-8 rounded-md">
        <input
          type="text"
          placeholder="Search for workers (e.g., Plumber, Electrician)"
          className="border p-3 rounded-l-lg w-1/3 focus:outline-none focus:ring-4 focus:ring-blue-300"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          placeholder="Location"
          className="border p-3 w-1/4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={location}
          onChange={handleLocationChange}
        />
        <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition duration-300">
          Search
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6 flex gap-8">
        {/* Filters Section */}
        <div className="bg-white p-6 w-1/4 rounded-lg shadow-md">
          <h2 className="font-semibold text-lg text-gray-800">Filters</h2>
          <div className="mt-4">
            <h3 className="text-sm text-gray-600">Category</h3>
            <div className="mt-2">
              <input
                type="checkbox"
                id="plumbing"
                checked={filters.plumbing}
                onChange={handleFilterChange}
              />
              <label htmlFor="plumbing" className="ml-2 text-sm text-gray-600">
                Plumbing
              </label>
            </div>
            <div className="mt-2">
              <input
                type="checkbox"
                id="electrical"
                checked={filters.electrical}
                onChange={handleFilterChange}
              />
              <label htmlFor="electrical" className="ml-2 text-sm text-gray-600">
                Electrical
              </label>
            </div>
            <div className="mt-2">
              <input
                type="checkbox"
                id="carpentry"
                checked={filters.carpentry}
                onChange={handleFilterChange}
              />
              <label htmlFor="carpentry" className="ml-2 text-sm text-gray-600">
                Carpentry
              </label>
            </div>
          </div>
        </div>

        {/* Workers List */}
        <div className="w-3/4">
          <h2 className="font-semibold text-lg text-gray-800">
            Available Workers ({workers.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {workers.map((worker) => (
              <div
                key={worker.id}
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between items-start hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800">{worker.name}</h3>
                <p className="text-sm text-gray-600">{worker.service}</p>
                <p className="text-sm text-gray-500">{worker.address}</p>
                <p className="text-sm text-gray-500">{worker.description}</p>
                <p className="text-sm font-semibold text-blue-600">₹ {worker.charge}</p>
                <button
                  onClick={handleConnectClick}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition duration-300"
                >
                  {isAuthenticated ? "Add to Cart" : "Login to Connect"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerHub;