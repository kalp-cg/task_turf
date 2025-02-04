import React from "react";
import './PopularServices.css';

const ServiceCard = ({ service }) => {
  return (
    <div className="p-6  rounded-lg shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer bg-white w-48 transform hover:scale-105">
      <p className="text-gray-700 font-medium">{service}</p>
    </div>
  );
};

export default ServiceCard;
