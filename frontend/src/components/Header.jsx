// // import React from "react";
// // import { Link } from "react-router-dom";

// // const Header = () => {
// //   return (
// //     <header className="bg-gradient-to-r from-teal-500 to-blue-400 shadow-lg p-4 flex justify-between items-center px-8 sticky top-0 z-50">
// //       <h1 className="text-3xl font-extrabold text-white">Taskturf</h1>
// //       <nav className="space-x-6">
// //         <Link to="/services" className="text-white hover:text-yellow-300 transition duration-300">Services</Link>
// //         <Link to="/howWork" className="text-white hover:text-yellow-300 transition duration-300">HowWork</Link>
// //         <Link to="/workers" className="text-white hover:text-yellow-300 transition duration-300">Workers</Link>
// //         <Link to="/about" className="text-white hover:text-yellow-300 transition duration-300">About Us</Link>
// //         <Link to="/contact" className="text-white hover:text-yellow-300 transition duration-300">Contact</Link>
// //       </nav>
// //       <div className="space-x-4">
// //         <Link to="/login">
// //           <button className="border border-white px-6 py-2 rounded-lg text-white hover:bg-white hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
// //             Login
// //           </button>
// //         </Link>
// //         <Link to="/register">
// //           <button className="bg-blue-500 text-blue px-6 py-2 rounded-lg text-white hover:bg-white hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
// //             Register
// //           </button>
// //         </Link>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;





// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const Header = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) setUser(storedUser);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <header className="bg-gradient-to-r from-[#0D1B2A] to-[#1B263B] shadow-lg p-4 flex justify-between items-center px-8 sticky top-0 z-50">
//       <h1 className="text-3xl font-extrabold text-white">TaskTurf</h1>
      
//       <nav className="space-x-6">
//         <Link to="/services" className="text-white hover:text-yellow-300 transition duration-300">Services</Link>
//         <Link to="/howWork" className="text-white hover:text-yellow-300 transition duration-300">How Work</Link>
//       </nav>

//       {user ? (
//         <div className="flex items-center space-x-4">
//           <img src={user.profilePic} alt="Profile" className="w-10 h-10 rounded-full border border-white" />
//           <span className="text-white">{user.name}</span>
//           <button 
//             onClick={handleLogout} 
//             className="border border-white px-4 py-2 rounded-lg text-white hover:bg-white hover:text-[#0D1B2A] transition duration-300"
//           >
//             Logout
//           </button>
//         </div>
//       ) : (
//         <div className="space-x-4">
//           <Link to="/login">
//             <button className="border border-white px-6 py-2 rounded-lg text-white hover:bg-white hover:text-[#0D1B2A] transition duration-300 ease-in-out transform hover:scale-105">
//               Login
//             </button>
//           </Link>
//           <Link to="/register">
//             <button className="bg-[#1F4068] text-white px-6 py-2 rounded-lg hover:bg-[#E63946] transition duration-300 ease-in-out transform hover:scale-105">
//               Register
//             </button>
//           </Link>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;



// import React from "react";
// import { Link } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react"; // Import useAuth0 hook

// const Header = () => {
//   const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0(); // Use Auth0 hook

//   // Function to get the first letter of the email
//   const getFirstLetter = (email) => {
//     return email ? email.charAt(0).toUpperCase() : "";
//   };

//   return (
//     <header className="bg-gradient-to-r from-[#0D1B2A] to-[#1B263B] shadow-lg p-4 flex justify-between items-center px-8 sticky top-0 z-50">
//       <h1 className="text-3xl font-extrabold text-white">TaskTurf</h1>
      
//       <nav className="space-x-6">
//         <Link to="/services" className="text-white hover:text-yellow-300 transition duration-300">Services</Link>
//         <Link to="/howWork" className="text-white hover:text-yellow-300 transition duration-300">How Work</Link>
//       </nav>

//       {isAuthenticated ? (
//         <div className="flex items-center space-x-4">
//           {/* Display the first letter of the email as the profile image */}
//           <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold border border-white">
//             {getFirstLetter(user.email)}
//           </div>
//           <span className="text-white">{user.name}</span>
//           <button 
//             onClick={() => logout({ returnTo: window.location.origin })} 
//             className="border border-white px-4 py-2 rounded-lg text-white hover:bg-white hover:text-[#0D1B2A] transition duration-300"
//           >
//             Logout
//           </button>
//         </div>
//       ) : (
//         <div className="space-x-4">
//           <button
//             onClick={() => loginWithRedirect()} // Redirect to Auth0 login
//             className="border border-white px-6 py-2 rounded-lg text-white hover:bg-white hover:text-[#0D1B2A] transition duration-300 ease-in-out transform hover:scale-105"
//           >
//             Login
//           </button>
//           <button
//             onClick={() => loginWithRedirect({ screen_hint: 'signup' })} // Redirect to Auth0 signup
//             className="bg-[#1F4068] text-white px-6 py-2 rounded-lg hover:bg-[#E63946] transition duration-300 ease-in-out transform hover:scale-105"
//           >
//             Register
//           </button>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;




import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; // Import useAuth0 hook

const Header = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0(); // Use Auth0 hook

  // Function to get the first letter of the email
  const getFirstLetter = (email) => {
    return email ? email.charAt(0).toUpperCase() : "";
  };

  return (
    <header className="bg-gradient-to-r from-[#0D1B2A] to-[#1B263B] shadow-lg p-4 flex justify-between items-center px-8 sticky top-0 z-50">
      <h1 className="text-3xl font-extrabold text-white">TaskTurf</h1>

      <nav className="space-x-6">
        <Link to="/services" className="text-white hover:text-yellow-300 transition duration-300">
          Services
        </Link>
        <Link to="/howWork" className="text-white hover:text-yellow-300 transition duration-300">
          How Work
        </Link>
      </nav>

      {isAuthenticated ? (
        <div className="flex items-center space-x-4">
          {/* Display the first letter of the email as the profile image */}
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold border border-white">
            {getFirstLetter(user.email)}
          </div>
          <span className="text-white">{user.name}</span>
          <button
            onClick={() => {
              // Redirect to the current page after logout
              logout({
                returnTo: window.location.href, // Use the current page URL
              });
            }}
            className="border border-white px-4 py-2 rounded-lg text-white hover:bg-white hover:text-[#0D1B2A] transition duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-x-4">
          <button
            onClick={() => loginWithRedirect()} // Redirect to Auth0 login
            className="border border-white px-6 py-2 rounded-lg text-white hover:bg-white hover:text-[#0D1B2A] transition duration-300 ease-in-out transform hover:scale-105"
          >
            Login
          </button>
          <button
            onClick={() => loginWithRedirect({ screen_hint: "signup" })} // Redirect to Auth0 signup
            className="bg-[#1F4068] text-white px-6 py-2 rounded-lg hover:bg-[#E63946] transition duration-300 ease-in-out transform hover:scale-105"
          >
            Register
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;