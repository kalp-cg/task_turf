// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// // Mock worker data
// let mockWorkers = []

// const WorkerHub = () => {
//   const [workers, setWorkers] = useState(mockWorkers);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [location, setLocation] = useState("");
//   const [filters, setFilters] = useState({
//     plumbing: false,
//     electrical: false,
//     carpentry: false,
    
//   });

//   const fetchdata = async()=>{
//     const res = await axios.get("http://localhost:5000/workers");
//     // console.log(res.data);
//     setWorkers(res.data);
//     mockWorkers = res.data;
//   }

//   useEffect(() => {
//     filterWorkers();
//   }, [filters, searchTerm, location]);

//   useEffect(()=>{
//     fetchdata()
//   }, [])

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleLocationChange = (e) => {
//     setLocation(e.target.value);
//   };

//   const handleFilterChange = (e) => {
//     setFilters({
//       ...filters,
//       [e.target.id]: e.target.checked,
//     });
//   };

//   const filterWorkers = () => {
//     let filteredWorkers = mockWorkers;

//     if (searchTerm) {
//       filteredWorkers = filteredWorkers.filter((worker) =>
//         worker.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (location) {
//       filteredWorkers = filteredWorkers.filter((worker) =>
//       {
//         try {
//           worker.location.toLowerCase().includes(location.toLowerCase())
//         } catch (error) {
//           console.log(error); 
          
//         }
//       }
//       );
//     }

//     const activeFilters = Object.keys(filters).filter((key) => filters[key]);
//     if (activeFilters.length > 0) {
//       filteredWorkers = filteredWorkers.filter((worker) =>
//         activeFilters.includes(worker.category.toLowerCase())
//       );
//     }

//     setWorkers(filteredWorkers);
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Header */}
//       <header className="bg-white shadow-md p-4 flex justify-between items-center border-b">
//         <h1 className="text-2xl font-semibold text-gray-800">WorkerHub</h1>
//         <nav className="space-x-6">
//           <Link to="/" className="text-gray-700 hover:text-blue-600">Find Workers</Link>
//           <Link to="/categories" className="text-gray-700 hover:text-blue-600">Categories</Link>
//           <Link to="/how-it-works" className="text-gray-700 hover:text-blue-600">How It Works</Link>
//           <Link to="/about" className="text-gray-700 hover:text-blue-600">About Us</Link>
//         </nav>
//       </header>

//       {/* Search Bar */}
//       <div className="p-6 bg-white flex justify-center shadow-md mt-6 mx-8 rounded-md">
//         <input
//           type="text"
//           placeholder="Search for workers (e.g., Plumber, Electrician)"
//           className="border p-3 rounded-l-lg w-1/3 focus:outline-none focus:ring-4 focus:ring-blue-300"
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//         <input
//           type="text"
//           placeholder="Location"
//           className="border p-3 w-1/4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
//           value={location}
//           onChange={handleLocationChange}
//         />
//         <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition duration-300">
//           Search
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto p-6 flex gap-8">
//         {/* Filters Section */}
//         <div className="bg-white p-6 w-1/4 rounded-lg shadow-md border">
//           <h2 className="font-semibold text-lg text-gray-800">Filters</h2>
//           <div className="mt-4">
//             <h3 className="text-sm text-gray-600">Category</h3>
//             <div className="mt-2">
//               <input type="checkbox" id="plumbing" checked={filters.plumbing} onChange={handleFilterChange} />{" "}
//               <label htmlFor="plumbing" className="ml-2 text-sm text-gray-600">Plumbing</label>
//             </div>
//             <div className="mt-2">
//               <input type="checkbox" id="electrical" checked={filters.electrical} onChange={handleFilterChange} />{" "}
//               <label htmlFor="electrical" className="ml-2 text-sm text-gray-600">Electrical</label>
//             </div>
//             <div className="mt-2">
//               <input type="checkbox" id="carpentry" checked={filters.carpentry} onChange={handleFilterChange} />{" "}
//               <label htmlFor="carpentry" className="ml-2 text-sm text-gray-600">Carpentry</label>
//             </div>
//           </div>
//         </div>

//         {/* Workers List */}
//         <div className="w-3/4">
//           <h2 className="font-semibold text-lg text-gray-800">Available Workers ({workers.length})</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//             {workers.map((worker) => (
//               <div key={worker.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between items-start border hover:shadow-xl transition duration-300">
//                 <h3 className="text-xl font-semibold text-gray-800">{worker.name}</h3>
//                 <p className="text-sm text-gray-600">{worker.service}</p>
//                 <p className="text-sm text-gray-500">{worker.address}</p>
//                 <p className="text-sm text-gray-500">{worker.description}</p>
//                 <p className="text-sm font-semibold text-blue-600">₹ {worker.charge}</p>
//                 <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition duration-300">
//                   Contact
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkerHub;



import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const WorkerHub = () => {
  const [workers, setWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState({
    plumbing: false,
    electrical: false,
    carpentry: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkers();
  }, []);

  useEffect(() => {
    filterWorkers();
  }, [searchTerm, location, filters]);

  const fetchWorkers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/workers");
      setWorkers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching workers:", error);
      setLoading(false);
    }
  };

  const filterWorkers = () => {
    let filteredWorkers = workers;

    if (searchTerm) {
      filteredWorkers = filteredWorkers.filter(worker =>
        worker.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (location) {
      filteredWorkers = filteredWorkers.filter(worker =>
        worker.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    const activeFilters = Object.keys(filters).filter(key => filters[key]);
    if (activeFilters.length > 0) {
      filteredWorkers = filteredWorkers.filter(worker =>
        activeFilters.includes(worker.category.toLowerCase())
      );
    }

    return filteredWorkers;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md p-5 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold text-gray-800">WorkerHub</h1>
        <nav className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Find Workers</Link>
          <Link to="/categories" className="text-gray-700 hover:text-blue-600 font-medium">Categories</Link>
          <Link to="/how-it-works" className="text-gray-700 hover:text-blue-600 font-medium">How It Works</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">About Us</Link>
        </nav>
      </header>

      {/* Search Bar */}
      <div className="p-6 bg-white flex flex-wrap justify-center gap-4 shadow-md mt-6 mx-8 rounded-md">
        <input
          type="text"
          placeholder="Search for workers (e.g., Plumber, Electrician)"
          className="border p-3 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="border p-3 rounded-lg w-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
          Search
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8">
        {/* Filters Section */}
        <div className="bg-white p-6 md:w-1/4 rounded-lg shadow-md border">
          <h2 className="font-semibold text-lg text-gray-800">Filters</h2>
          <div className="mt-4">
            <h3 className="text-sm text-gray-600 font-medium">Category</h3>
            {["plumbing", "electrical", "carpentry"].map(category => (
              <div key={category} className="mt-2 flex items-center">
                <input
                  type="checkbox"
                  id={category}
                  checked={filters[category]}
                  onChange={(e) => setFilters({ ...filters, [category]: e.target.checked })}
                  className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor={category} className="text-sm text-gray-700 capitalize">{category}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Workers List */}
        <div className="md:w-3/4">
          <h2 className="font-semibold text-lg text-gray-800">Available Workers ({filterWorkers().length})</h2>

          {loading ? (
            <div className="text-center mt-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 mx-auto"></div>
              <p className="mt-3 text-gray-600">Loading workers...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filterWorkers().length > 0 ? (
                filterWorkers().map(worker => (
                  <div key={worker.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between items-start border hover:shadow-xl transition duration-300">
                    <h3 className="text-xl font-semibold text-gray-800">{worker.name}</h3>
                    <p className="text-sm text-gray-600">{worker.service}</p>
                    <p className="text-sm text-gray-500">{worker.address}</p>
                    <p className="text-sm text-gray-500">{worker.description}</p>
                    <p className="text-sm font-semibold text-blue-600">₹ {worker.charge}</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition duration-300">
                      Contact
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 mt-5">No workers found. Try adjusting filters or searching in another location.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerHub;
