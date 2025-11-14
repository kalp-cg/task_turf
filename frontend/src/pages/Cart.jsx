import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard,
  ArrowLeft,
  MapPin,
  Clock,
  Star
} from "lucide-react";
import { motion } from "framer-motion";

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalWithTax 
  } = useCart();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const totalData = getTotalWithTax();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      // In real app, redirect to payment gateway or success page
      alert('Checkout functionality will be implemented with payment gateway integration!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0D1B2A] to-[#1B263B] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingBag className="w-8 h-8 mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
            </div>
            <Link
              to="/"
              className="flex items-center bg-gradient-to-r from-[#F4A261] to-[#E76F51] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {cartItems.length === 0 ? (
          /* Empty Cart */
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-lg text-gray-600 mb-8">
              Discover our amazing services and add them to your cart!
            </p>
            <Link
              to="/"
              className="inline-flex items-center bg-gradient-to-r from-[#F4A261] to-[#E76F51] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Browse Services
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Cart Items ({cartItems.length})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="flex items-center text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Clear All
                  </button>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between">
                        {/* Service Info */}
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {item.name}
                          </h3>
                          
                          {item.description && (
                            <p className="text-gray-600 mb-3">{item.description}</p>
                          )}
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            {item.location && (
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {item.location}
                              </div>
                            )}
                            {item.duration && (
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {item.duration}
                              </div>
                            )}
                            {item.rating && (
                              <div className="flex items-center">
                                <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                                {item.rating}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Price & Quantity */}
                        <div className="flex items-center space-x-6">
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-lg font-bold text-[#F4A261]">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              ₹{item.price.toLocaleString()} each
                            </p>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-6 sticky top-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">₹{totalData.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee (5%):</span>
                    <span className="font-semibold">₹{totalData.serviceFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (10%):</span>
                    <span className="font-semibold">₹{totalData.tax.toLocaleString()}</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-xl">
                    <span className="font-bold text-gray-800">Total:</span>
                    <span className="font-bold text-[#F4A261]">
                      ₹{totalData.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full flex items-center justify-center bg-gradient-to-r from-[#F4A261] to-[#E76F51] text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 ${
                    isCheckingOut ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isCheckingOut ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Proceed to Checkout
                    </>
                  )}
                </motion.button>

                {/* Security Notice */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  🔒 Your payment information is secure and encrypted
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;