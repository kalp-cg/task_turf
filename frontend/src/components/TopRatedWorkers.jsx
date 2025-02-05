import React from "react";
import { FaStar } from "react-icons/fa";

const TopRatedWorkers = () => {
  const workers = [
    { name: 'Rajesh Kumar', service: 'Plumbing', rating: 5, image: 'http://res.cloudinary.com/demtjxg7q/image/upload/v1738648207/gvm6kcih0ko6bac4tnqa.png' },
    { name: 'Priya Singh', service: 'House Cleaning', rating: 4.9, image: 'https://images.unsplash.com/photo-1738316849598-8cbe1e5ca3f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8' },
    { name: 'Amit Sharma', service: 'Electrician', rating: 4.8, image: 'https://plus.unsplash.com/premium_photo-1676422290431-f0d07a64eec5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8' },
    { name: 'Meera Patel', service: 'Cook', rating: 4.7, image: 'https://images.unsplash.com/photo-1738249034650-6a789a081a04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8' },
  ];

  return (
    <section id="workers" className="text-center py-16">
      <h3 className="text-3xl font-bold text-gray-800 mb-8">Top Rated Workers</h3>
      <div className="flex justify-center gap-8 flex-wrap px-4">
        {workers.map((worker) => (
          <div key={worker.name} className="p-6  rounded-lg shadow-sm hover:shadow-md transition duration-300 cursor-pointer bg-white w-64">
            <img src={worker.image} alt={worker.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-800">{worker.name}</h4>
            <p className="text-gray-600 mb-2">{worker.service}</p>
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={`text-${i < worker.rating ? 'yellow-400' : 'gray-300'}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRatedWorkers;
