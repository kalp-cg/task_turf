// import React from "react";
// import { Link } from "react-router-dom";
// import ServiceCard from "./ServiceCard";
// import "../components/PopularServices.css";

// const PopularServices = () => {
//   const services = [
//     { name: "Cleaning", path: "/Cleaning", color: "bg-blue-100 hover:bg-blue-200" },
//     { name: "Plumbing", path: "/plumbing", color: "bg-green-100 hover:bg-green-200" },
//     { name: "Electrical", path: "/electrical", color: "bg-yellow-100 hover:bg-yellow-200" },
//     { name: "Babysitting", path: "/babysitting", color: "bg-pink-100 hover:bg-pink-200" },
//     { name: "Gardening", path: "/gardening", color: "bg-teal-100 hover:bg-teal-200" },
//     { name: "Cooking", path: "/cooking", color: "bg-orange-100 hover:bg-orange-200" },
//     { name: "Painting", path: "/painting", color: "bg-purple-100 hover:bg-purple-200" },
//     { name: "Carpentry", path: "/carpentry", color: "bg-indigo-100 hover:bg-indigo-200" },
//     { name: "Pest Control", path: "/pest-control", color: "bg-red-100 hover:bg-red-200" },
//     { name: "Appliance Repair", path: "/appliance-repair", color: "bg-cyan-100 hover:bg-cyan-200" }
//   ];

//   return (
//     <section id="services" className="text-center py-16 bg-gradient-to-r from-blue-50 to-purple-50">
//       <h3 className="text-4xl font-bold text-gray-800 mb-12">Popular Services</h3>
//       <div className="flex justify-center gap-8 flex-wrap px-8">
//         {services.map(({ name, path, color }) => (
//           <Link
//             to={path}
//             key={name}
//             className="transition-transform transform hover:scale-105 hover:shadow-lg"
//           >
//             <ServiceCard
//               service={name}
//               className={`${color} rounded-lg shadow-md p-6 w-48 text-center transition-colors service-card`}
//             />
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default PopularServices;




import React from "react";
import { Link } from "react-router-dom";
import { Wrench, Hammer, Paintbrush, Leaf, Baby, Plug, Utensils, Bug } from "lucide-react"; 

const services = [
  { name: "Cleaning", path: "/cleaning", icon: <Wrench size={24} /> },
  { name: "Plumbing", path: "/plumbing", icon: <Hammer size={24} /> },
  { name: "Electrical", path: "/electrical", icon: <Plug size={24} /> },
  { name: "Babysitting", path: "/babysitting", icon: <Baby size={24} /> },
  { name: "Gardening", path: "/gardening", icon: <Leaf size={24} /> },
  { name: "Cooking", path: "/cooking", icon: <Utensils size={24} /> },
  { name: "Painting", path: "/painting", icon: <Paintbrush size={24} /> },
  { name: "Pest Control", path: "/pest-control", icon: <Bug size={24} /> }
];

const ServiceCard = ({ service }) => (
  <Link to={service.path} className="transition-transform hover:scale-105">
    <div className="flex items-center gap-3 bg-white hover:bg-gray-100 rounded-full shadow-md py-3 px-5 transition-all duration-300">
      {service.icon}
      <span className="text-md font-semibold text-gray-800">{service.name}</span>
    </div>
  </Link>
);

const PopularServices = () => {
  return (
    <section className="text-center py-10 bg-gradient-to-b from-white to-gray-100">
      <h3 className="text-3xl font-extrabold text-gray-800 mb-6">Popular Services</h3>
      <div className="flex flex-wrap justify-center gap-4 px-6">
        {services.map((service) => (
          <ServiceCard key={service.name} service={service} />
        ))}
      </div>
    </section>
  );
};

export default PopularServices;
