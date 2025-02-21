import React from "react";
import { Link } from "react-router-dom";

const workers = [
  { name: "John Doe", skill: "Electrician", rating: "4.8", location: "New York", image: "https://plus.unsplash.com/premium_photo-1739198794291-4fdbeb386729?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Emma Smith", skill: "Plumber", rating: "4.7", location: "Los Angeles", image: "https://plus.unsplash.com/premium_photo-1739198794291-4fdbeb386729?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Michael Lee", skill: "Carpenter", rating: "4.9", location: "Chicago", image: "https://plus.unsplash.com/premium_photo-1739198794291-4fdbeb386729?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Sophia Brown", skill: "Painter", rating: "4.6", location: "Houston", image: "https://plus.unsplash.com/premium_photo-1739198794291-4fdbeb386729?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D" }
];

const WorkerCard = ({ worker }) => (
  <div className="flex items-center bg-white shadow-md rounded-lg p-4 w-72 hover:shadow-lg transition-all">
    <img src={worker.image} alt={worker.name} className="w-16 h-16 rounded-full mr-4" />
    <div>
      <h4 className="text-lg font-semibold text-gray-800">{worker.name}</h4>
      <p className="text-sm text-gray-600">{worker.skill} • {worker.location}</p>
      <p className="text-yellow-500 font-bold">⭐ {worker.rating}</p>
    </div>
  </div>
);

const FeaturedWorkers = () => {
  return (
    <section className="text-center py-16 bg-gray-100">
      <h3 className="text-4xl font-extrabold text-gray-800 mb-8">Top Rated Workers</h3>
      <div className="flex flex-wrap justify-center gap-6 px-6">
        {workers.map((worker) => (
          <WorkerCard key={worker.name} worker={worker} />
        ))}
      </div>
      <Link to="/workers">
        <button className="mt-8 bg-[#0D1B2A] text-white px-6 py-3 rounded-lg hover:bg-[#1B263B] transition">
          View All Workers
        </button>
      </Link>
    </section>
  );
};

export default FeaturedWorkers;
