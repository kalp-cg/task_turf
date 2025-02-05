import React from 'react';
import { useState } from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaPaperPlane } from "react-icons/fa";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">Fill the form or contact us via details below.</p>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <MdEmail className="text-blue-500" />
              <span>support@example.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <MdPhone className="text-blue-500" />
              <span>+123 456 7890</span>
            </div>
            <div className="flex items-center space-x-4">
              <MdLocationOn className="text-blue-500" />
              <span>123 Street, City, Country</span>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            required
          ></textarea>
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
            <FaPaperPlane /> Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
