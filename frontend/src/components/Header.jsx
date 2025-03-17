import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Menu, X, User, LogOut, Home, Briefcase, HelpCircle } from "lucide-react";

const Header = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [newUserFormVisible, setNewUserFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    experience: "",
    phone: "",
    skills: "",
    address: "",
  });

  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNewUser = async (event) => {
    event.preventDefault();

    try {
      const data = await axios.post("http://localhost:3000/user", {
        name: user.name, 
        email: user.email, 
        picture: user.profile, 
        address: formData.address, 
        experience: formData.experience, 
        phone: formData.phone, 
        skills: formData.skills
      });

      console.log(data);
      console.log("successfull");
      setNewUserFormVisible(false);
    } catch (error) {
      console.error("Error submitting user data:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/user?email=${user.email}`
          );
          console.log("Successful login...", response.data);
        } catch (error) {
          if (
            error.response &&
            error.response.data.message ===
              "User not found. Please create a new user."
          ) {
            setNewUserFormVisible(true);
          }
        }
      })();
    }
  }, [isAuthenticated, user]);

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      {newUserFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-[400px] max-w-[95%] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Complete Your Profile</h2>
              <button 
                onClick={() => setNewUserFormVisible(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <form className="space-y-6" onSubmit={handleNewUser}>
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Experience (in years)
                </label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  placeholder="e.g., 3"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A261] focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="e.g., +91 1234567890"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A261] focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="skills"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Skills
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  placeholder="e.g., cleaning, plumbing"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A261] focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  placeholder="e.g., 123 Street, City, Country"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A261] focus:border-transparent outline-none transition"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#F4A261] to-[#E76F51] text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F4A261] transition"
              >
                Complete Profile
              </button>
            </form>
          </div>
        </div>
      )}
      
      <header className="bg-[#0D1B2A] shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-extrabold text-white md:text-3xl">
                Task<span className="text-[#F4A261]">Turf</span>
              </h1>
            </Link>

            {/* Main Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-white hover:text-[#F4A261] transition-colors font-medium flex items-center">
                <Home size={18} className="mr-1" />
                Home
              </Link>
              <Link to="/services" className="text-white hover:text-[#F4A261] transition-colors font-medium flex items-center">
                <Briefcase size={18} className="mr-1" />
                Services
              </Link>
              <Link to="/howWork" className="text-white hover:text-[#F4A261] transition-colors font-medium flex items-center">
                <HelpCircle size={18} className="mr-1" />
                How It Works
              </Link>
            </nav>

            {/* Auth Section */}
            <div className="flex items-center">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  {/* Profile dropdown */}
                  <div className="relative group">
                    <div 
                      onClick={() => navigate("/profile")}
                      className="h-10 w-10 rounded-full bg-gradient-to-r from-[#F4A261] to-[#E76F51] flex items-center justify-center text-white font-bold cursor-pointer border-2 border-transparent hover:border-white transition"
                    >
                      {getInitials(user?.name)}
                    </div>
                    
                   {/* Dropdown */}
                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 hidden group-hover:block">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <User size={16} className="mr-2" />
                        Profile
                      </Link>
                      <button
                        onClick={() => logout({ returnTo: window.location.origin })}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut size={16} className="mr-2" />
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => loginWithRedirect()}
                  className="bg-gradient-to-r from-[#F4A261] to-[#E76F51] text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition"
                >
                  Log In
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden ml-4 text-white focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0D1B2A] border-t border-[#1E3A5F] py-4">
            <div className="container mx-auto px-4 flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-white hover:text-[#F4A261] transition-colors font-medium flex items-center py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={18} className="mr-2" />
                Home
              </Link>
              <Link 
                to="/services" 
                className="text-white hover:text-[#F4A261] transition-colors font-medium flex items-center py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Briefcase size={18} className="mr-2" />
                Services
              </Link>
              <Link 
                to="/howWork" 
                className="text-white hover:text-[#F4A261] transition-colors font-medium flex items-center py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <HelpCircle size={18} className="mr-2" />
                How It Works
              </Link>
              
              {isAuthenticated && (
                <Link 
                  to="/profile" 
                  className="text-white hover:text-[#F4A261] transition-colors font-medium flex items-center py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} className="mr-2" />
                  Profile
                </Link>
              )}
              
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout({ returnTo: window.location.origin });
                    setIsMenuOpen(false);
                  }}
                  className="text-white hover:text-[#F4A261] transition-colors font-medium flex items-center py-2"
                >
                  <LogOut size={18} className="mr-2" />
                  Log Out
                </button>
              ) : (
                <button
                  onClick={() => loginWithRedirect()}
                  className="text-white hover:text-[#F4A261] transition-colors font-medium flex items-center py-2"
                >
                  Log In
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;