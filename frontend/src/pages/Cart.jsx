import React, { useState } from "react";
import { Link } from "react-router-dom";

const Cart = ({ cartItems, removeFromCart }) => {
  // Calculate the total cost of all items in the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.charge, 0);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Your Cart</h1>
        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Continue Shopping
        </Link>
      </header>

      {/* Cart Content */}
      <div className="container mx-auto p-6">
        {cartItems.length === 0 ? (
          <p className="text-lg text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between items-start hover:shadow-xl transition duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.service}</p>
                  <p className="text-sm text-gray-500">{item.address}</p>
                  <p className="text-sm font-semibold text-blue-600">₹ {item.charge}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-700 transition duration-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Total Cost */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800">
                Total: ₹ {calculateTotal()}
              </h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;