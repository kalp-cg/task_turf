// import React, { useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import axios from "axios";

// const Login = () => {
//   const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrorMessage("");

//     try {
//       const response = await axios.post("http://localhost:5000/api/login", {
//         email,
//         password,
//       });
      
//       alert("Login Successful!");
//       console.log("User logged in:", response.data);
//     } catch (error) {
//       setErrorMessage("Invalid email or password. Please try again.");
//     }
//     setIsLoading(false);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
//       <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96">
//         {isAuthenticated ? (
//           <div className="text-center">
//             <h2 className="text-3xl font-semibold text-blue-700 mb-4">
//               Welcome, {user?.email?.charAt(0).toUpperCase()}!
//             </h2>
//             <button
//               onClick={() => logout({ returnTo: window.location.origin })}
//               className="w-full py-3 rounded-md text-white bg-red-600 hover:bg-red-700 transition duration-300"
//             >
//               Logout
//             </button>
//           </div>
//         ) : (
//           <>
//             <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">Login</h2>
//             <form onSubmit={handleLogin}>
//               <div className="mb-5">
//                 <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
//                   required
//                 />
//               </div>
//               <div className="mb-5">
//                 <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
//                   required
//                 />
//               </div>
//               {errorMessage && <div className="mb-4 text-red-600 text-center font-medium">{errorMessage}</div>}
//               <button
//                 type="submit"
//                 className={`w-full py-3 rounded-md text-white ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Logging in..." : "Login"}
//               </button>
//             </form>
//             <div className="text-center mt-6">
//               <button
//                 onClick={() => loginWithRedirect()}
//                 className="w-full py-3 mt-3 rounded-md text-white bg-gray-700 hover:bg-gray-800 transition duration-300"
//               >
//                 Login with Auth0
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Login = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Check if user is manually logged in
  const localUser = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = isAuthenticated || localUser;

  // Handle manual login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("https://task-turf-3.onrender.com/workers", {
        email,
        password,
      });

      const userData = response.data;
      localStorage.setItem("user", JSON.stringify(userData));

      alert("Login Successful!");
      console.log("User logged in:", userData);
    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again.");
    }
    setIsLoading(false);
  };

  // Handle logout
  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    localStorage.removeItem("user"); // Remove manual login session
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96">
        {isLoggedIn ? (
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-blue-700 mb-4">
              Welcome, {user?.email || localUser?.email || "User"}!
            </h2>
            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-md text-white bg-red-600 hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-5">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              {errorMessage && <div className="mb-4 text-red-600 text-center font-medium">{errorMessage}</div>}
              <button
                type="submit"
                className={`w-full py-3 rounded-md text-white ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
            <div className="text-center mt-6">
              <button
                onClick={() => loginWithRedirect()}
                className="w-full py-3 mt-3 rounded-md text-white bg-gray-700 hover:bg-gray-800 transition duration-300"
              >
                Login with Auth0
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
