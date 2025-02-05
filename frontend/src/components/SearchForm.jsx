import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchForm = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <form onSubmit={handleSearch} className="flex justify-center">
      <input
        type="text"
        placeholder="Enter service name or location"
        className="border p-3 rounded-l-md w-96 focus:outline-none focus:ring-2 focus:ring-blue-600"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-r-md flex items-center gap-2 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
      >
        <FaSearch /> Find a Worker
      </button>
    </form>
  );
};

export default SearchForm;
