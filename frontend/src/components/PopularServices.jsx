import React from "react";
import { Link } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import "../components/PopularServices.css";

const PopularServices = () => {
  const services = [
    { name: "Cleaning", path: "/Cleaning", color: "bg-blue-100 hover:bg-blue-200" },
    { name: "Plumbing", path: "/plumbing", color: "bg-green-100 hover:bg-green-200" },
    { name: "Electrical", path: "/electrical", color: "bg-yellow-100 hover:bg-yellow-200" },
    { name: "Babysitting", path: "/babysitting", color: "bg-pink-100 hover:bg-pink-200" },
    { name: "Gardening", path: "/gardening", color: "bg-teal-100 hover:bg-teal-200" },
    { name: "Cooking", path: "/cooking", color: "bg-orange-100 hover:bg-orange-200" },
    { name: "Painting", path: "/painting", color: "bg-purple-100 hover:bg-purple-200" },
    { name: "Carpentry", path: "/carpentry", color: "bg-indigo-100 hover:bg-indigo-200" },
    { name: "Pest Control", path: "/pest-control", color: "bg-red-100 hover:bg-red-200" },
    { name: "Appliance Repair", path: "/appliance-repair", color: "bg-cyan-100 hover:bg-cyan-200" }
  ];

  return (
    <section id="services" className="text-center py-16 bg-gradient-to-r from-blue-50 to-purple-50">
      <h3 className="text-4xl font-bold text-gray-800 mb-12">Popular Services</h3>
      <div className="flex justify-center gap-8 flex-wrap px-8">
        {services.map(({ name, path, color }) => (
          <Link
            to={path}
            key={name}
            className="transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <ServiceCard
              service={name}
              className={`${color} rounded-lg shadow-md p-6 w-48 text-center transition-colors service-card`}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularServices;