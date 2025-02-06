// import React, { useState } from "react";
// import { FaSearch, FaUserPlus, FaStar, FaQuoteLeft, FaQuoteRight, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

// const Home = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = (e) => {
//     e.preventDefault();
//     alert(`Searching for: ${searchQuery}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
//       {/* Header */}
//       <header className="bg-gradient-to-r from-teal-500 to-blue-400 shadow-lg p-4 flex justify-between items-center px-8 sticky top-0 z-50">
//         <h1 className="text-3xl font-extrabold text-white">Aapki</h1>
//         <nav className="space-x-6">
//           <a href="#services" className="text-white hover:text-yellow-300 transition duration-300">Services</a>
//           <a href="#how-it-works" className="text-white hover:text-yellow-300 transition duration-300">How it Works</a>
//           <a href="#workers" className="text-white hover:text-yellow-300 transition duration-300">Workers</a>
//           <a href="#about" className="text-white hover:text-yellow-300 transition duration-300">About Us</a>
//           <a href="#contact" className="text-white hover:text-yellow-300 transition duration-300">Contact</a>
//         </nav>
//         <div className="space-x-4">
//           <button className="border border-white px-6 py-2 rounded-lg text-white hover:bg-white hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
//             Login
//           </button>
//           <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105">
//             Register
//           </button>
//         </div>
//       </header>
      
//       {/* Hero Section */}
//       <section className="text-center py-24 bg-gradient-to-r from-teal-100 to-blue-50">
//         <h2 className="text-5xl font-bold text-gray-800 mb-4">Find Trusted Workers for Your Home Services</h2>
//         <p className="text-gray-600 text-lg mb-8">Get skilled professionals for cleaning, plumbing, repair, and more – at your doorstep!</p>
//         <form onSubmit={handleSearch} className="flex justify-center">
//           <input 
//             type="text" 
//             placeholder="Enter service name or location" 
//             className="border p-3 rounded-l-md w-96 focus:outline-none focus:ring-2 focus:ring-blue-600" 
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-r-md flex items-center gap-2 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
//             <FaSearch /> Find a Worker
//           </button>
//         </form>
//       </section>

//       {/* Popular Services */}
//       <section id="services" className="text-center py-16 bg-gray-100">
//         <h3 className="text-3xl font-bold text-gray-800 mb-8">Popular Services</h3>
//         <div className="flex justify-center gap-6 flex-wrap px-4">
//           {['Cleaning', 'Plumbing', 'Electrical', 'Babysitting', 'Gardening', 'Cooking', 'Painting', 'Carpentry', 'Pest Control', 'Appliance Repair'].map((service) => (
//             <div key={service} className="p-6 border rounded-lg shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer bg-white w-48 transform hover:scale-105">
//               <p className="text-gray-700 font-medium">{service}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* How It Works */}
//       <section id="how-it-works" className="bg-gray-50 py-16 text-center">
//         <h3 className="text-3xl font-bold text-gray-800 mb-8">How It Works</h3>
//         <div className="flex justify-center gap-8 flex-wrap px-4">
//           {[ 
//             { title: 'Post a Request', description: 'Describe the service you need and your location.' },
//             { title: 'Get Matched', description: 'We connect you with trusted workers in your area.' },
//             { title: 'Work Done & Payment', description: 'The worker completes the job, and you pay securely.' },
//           ].map((step, index) => (
//             <div key={index} className="p-6 border rounded-lg shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer bg-white w-72 transform hover:scale-105">
//               <h4 className="text-xl font-semibold text-gray-800 mb-4">{step.title}</h4>
//               <p className="text-gray-600">{step.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Top Rated Workers */}
//       <section id="workers" className="text-center py-16 bg-gray-100">
//         <h3 className="text-3xl font-bold text-gray-800 mb-8">Top Rated Workers</h3>
//         <div className="flex justify-center gap-8 flex-wrap px-4">
//           {[ 
//             { name: 'Rajesh Kumar', service: 'Plumbing', rating: 5, image: 'https://via.placeholder.com/150/0000FF/808080?Text=Rajesh' },
//             { name: 'Priya Singh', service: 'House Cleaning', rating: 4.9, image: 'https://via.placeholder.com/150/FF6347/FFFFFF?Text=Priya' },
//             { name: 'Amit Sharma', service: 'Electrician', rating: 4.8, image: 'https://via.placeholder.com/150/90EE90/FFFFFF?Text=Amit' },
//             { name: 'Meera Patel', service: 'Cook', rating: 4.7, image: 'https://via.placeholder.com/150/FFD700/FFFFFF?Text=Meera' },
//           ].map((worker) => (
//             <div key={worker.name} className="p-6 border rounded-lg shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer bg-white w-64 transform hover:scale-105">
//               <img src={worker.image} alt={worker.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
//               <h4 className="text-xl font-semibold text-gray-800">{worker.name}</h4>
//               <p className="text-gray-600 mb-2">{worker.service}</p>
//               <div className="flex justify-center gap-1">
//                 {[...Array(5)].map((_, i) => (
//                   <FaStar key={i} className={`text-${i < worker.rating ? 'yellow-400' : 'gray-300'}`} />
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="bg-gray-50 py-16 text-center">
//         <h3 className="text-3xl font-bold text-gray-800 mb-8">What Our Customers Say</h3>
//         <div className="flex justify-center gap-8 flex-wrap px-4">
//           {[ 
//             { name: 'Anita Mehta', review: 'Great service! The plumber was very professional and fixed the issue quickly.' },
//             { name: 'Rahul Verma', review: 'Highly recommend Aapki for home services. The workers are skilled and reliable.' },
//             { name: 'Sneha Reddy', review: 'The cleaning service was excellent. My house has never been this clean!' },
//           ].map((testimonial) => (
//             <div key={testimonial.name} className="p-6 border rounded-lg shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer bg-white w-96 transform hover:scale-105">
//               <FaQuoteLeft className="text-gray-400 mx-auto" />
//               <p className="text-gray-600 mt-4">{testimonial.review}</p>
//               <FaQuoteRight className="text-gray-400 mx-auto mt-4" />
//               <h4 className="text-xl font-semibold text-gray-800 mt-4">{testimonial.name}</h4>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-blue-500 text-white py-12 text-center">
//         <div className="flex justify-center gap-6 mb-6">
//           <a href="#" className="text-gray-400 hover:text-white transition duration-300"><FaFacebook /></a>
//           <a href="#" className="text-gray-400 hover:text-white transition duration-300"><FaTwitter /></a>
//           <a href="#" className="text-gray-400 hover:text-white transition duration-300"><FaInstagram /></a>
//           <a href="#" className="text-gray-400 hover:text-white transition duration-300"><FaLinkedin /></a>
//         </div>
//         <p className="text-gray-400">&copy; 2025 Aapki. All rights reserved.</p>
//         <div className="mt-4">
//           <a href="#" className="text-gray-400 hover:text-white transition duration-300 mx-2">Privacy Policy</a>
//           <a href="#" className="text-gray-400 hover:text-white transition duration-300 mx-2">Terms of Service</a>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;


// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WorkersPage from "./pages/WorkersPage"; // Import WorkersPage for workers route
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cleaning from "./pages/Cleaning";
import Plumbing from "./pages/Plumbing";
import Electrical from "./pages/Elecrical";
import Babysitting from "./pages/Babysitting";
import Gardening from "./pages/Gardening";
import Cooking from "./pages/Cooking";
import Painting from "./pages/Painting";
import Contact from "./pages/Contact";
import HowWork from "./components/HowWork";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* Define the Routes for different pages */}
          <Route path="/" element={<Home />} /> {/* Home Page */}
          <Route path="/workers" element={<WorkersPage />} /> {/* Workers Page */}
          <Route path = "/HowWork" element = {<HowWork />} />
          <Route path="/login" element={<Login />} /> {/* Login Page */}
          <Route path="/register" element={<Register />} /> {/* Register Page */}
          <Route path="/cleaning" element={<Cleaning />} />
          <Route path = "/plumbing" element = {<Plumbing />} />
          <Route path = "/electrical" element = {<Electrical />} />
          <Route path = "/babysitting" element = {<Babysitting />} />
          <Route path = "/gardening" element = {<Gardening />} />
          <Route path = "/cooking" element = {<Cooking />} />
          <Route path = "/painting" element = {<Painting />} />
          <Route path = "/contact" element = {<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
