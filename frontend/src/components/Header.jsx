import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { 
  Menu, 
  X, 
  Home, 
  Briefcase, 
  HelpCircle, 
  ShoppingCart, 
  User, 
  LogOut, 
  Settings,
  Shield
} from "lucide-react";

const Header = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout, hasRole, getDisplayName } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Workers", href: "/workers", icon: Briefcase },
    { name: "How It Works", href: "/howWork", icon: HelpCircle },
    { name: "Contact", href: "/contact", icon: HelpCircle },
  ];

  const serviceLinks = [
    { name: "Cleaning", href: "/cleaning" },
    { name: "Plumbing", href: "/plumbing" },
    { name: "Electrical", href: "/electrical" },
    { name: "Babysitting", href: "/babysitting" },
    { name: "Gardening", href: "/gardening" },
    { name: "Cooking", href: "/cooking" },
    { name: "Painting", href: "/painting" },
  ];

  // Add role-based navigation items
  const roleBasedItems = [];
  if (isAuthenticated && hasRole('admin')) {
    roleBasedItems.push({ name: "Admin Panel", href: "/admin", icon: Shield });
  }
  if (isAuthenticated && hasRole('worker')) {
    roleBasedItems.push({ name: "My Jobs", href: "/worker/jobs", icon: Briefcase });
  }

  const handleLogout = async () => {
    await logout();
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  const getInitials = () => {
    if (!user) return '';
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold text-gray-800">TaskTurf</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
            
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                <span>Services</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.name}
                      to={service.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {getInitials()}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium text-gray-700">{getDisplayName()}</div>
                    <div className="text-xs text-gray-500 capitalize">{user?.role}</div>
                  </div>
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{getDisplayName()}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      <p className="text-xs text-blue-600 capitalize">{user?.role}</p>
                    </div>
                    
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <User className="mr-3 h-4 w-4" />
                      Profile
                    </Link>
                    
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      Settings
                    </Link>
                    
                    {hasRole('admin') && (
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <Shield className="mr-3 h-4 w-4" />
                        Admin Panel
                      </Link>
                    )}
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
            
            <div className="px-3 py-2">
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Services
              </div>
              {serviceLinks.map((service) => (
                <Link
                  key={service.name}
                  to={service.href}
                  className="block px-3 py-2 text-base text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {service.name}
                </Link>
              ))}
            </div>

            <Link
              to="/cart"
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart size={18} />
              <span>Cart ({totalItems})</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
