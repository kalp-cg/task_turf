// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
// import axios from "axios";

// const Header = () => {
//   const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
//   const navigate = useNavigate();
//   const [newUserFormVisible, setNewUserFormVisible] = useState(true)

//   // State for mobile menu toggle
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // Safely get the first letter of the email (handle undefined case)
//   const getFirstLetter = (email) => {
//     return email ? email.charAt(0).toUpperCase() : "";
//   };

//   const LoginWithRedirect = async () => {
//     loginWithRedirect();
//     getAccessTokenSilently();
//   };

//   const handleNewUser = async(event) => {
//     event.preventDefault();
    
//   }

//   useEffect(() => {
//     if (isAuthenticated) {
//       console.log(user.email);
//       (async()=>{
//         try {
//           const data = await axios.get(`http://localhost:3000/user?email=${user.email}`)
//           console.log("successfull login ...")
//         } catch (error) {
//           if(error.response.data.message == "User not found. Please create a new user."){
//             setNewUserFormVisible(true)
//           }
//         }
//       })()

//       console.log(user);
//       //Name, Email, Picture
//     }
//   }, [isAuthenticated, localStorage.getItem("hello")]);

//   return (
//     <>
//       {
//         newUserFormVisible && (
//           <div className="absolute w-full h-full bg-white z-[99999] top-0 left-0 flex justify-center items-center">
          
//           <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-[400px] max-w-full">
//               <h2 className="text-2xl font-bold mb-6 text-center">Fill Out Your Details</h2>
//               <form id="popupForm" className="space-y-4" onSubmit={handleNewUser}>
                  
//                   <div>
//                       <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience (in years)</label>
//                       <input type="number" id="experience" name="experience" placeholder="e.g., 3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
//                   </div>
      
                  
//                   <div>
//                       <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
//                       <input type="tel" id="phone" name="phone" placeholder="e.g., +91 1234567890" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
//                   </div>
      
                 
//                   <div>
//                       <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
//                       <input type="text" id="skills" name="skills" placeholder="e.g., JavaScript, React, Node.js" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
//                   </div>
      
                  
//                   <div>
//                       <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
//                       <textarea id="address" name="address" rows="3" placeholder="e.g., 123 Street, City, Country" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required></textarea>
//                   </div>
      
                  
//                   <div className="flex justify-center">
//                       <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                           Submit
//                       </button>
//                   </div>
//               </form>
//           </div>
//       </div>
//         )
//       }
//       <header className="bg-gradient-to-r from-[#0D1B2A] to-[#1B263B] shadow-lg p-4 flex justify-between items-center px-8 sticky top-0 z-50">
//         {/* Logo */}
//         <h1 className="text-2xl font-extrabold text-white md:text-3xl">
//           TaskTurf
//         </h1>

//         {/* Hamburger Menu for Mobile */}
//         <div className="md:hidden">
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="text-white focus:outline-none"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16m-7 6h7"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Navigation Links (Hidden on Mobile) */}
//         <nav
//           className={`${
//             isMenuOpen ? "block" : "hidden"
//           } md:flex space-x-6 absolute md:relative top-16 left-0 w-full md:w-auto bg-[#0D1B2A] md:bg-transparent p-4 md:p-0`}
//         >
//           <Link
//             to="/services"
//             className="text-white hover:text-yellow-300 transition duration-300 block md:inline"
//           >
//             Services
//           </Link>
//           <Link
//             to="/howWork"
//             className="text-white hover:text-yellow-300 transition duration-300 block md:inline"
//           >
//             How Work
//           </Link>
//         </nav>

//         {/* Auth Section */}
//         <div className="flex items-center space-x-4">
//           {isAuthenticated ? (
//             <>
//               {/* Profile Picture Clickable */}
//               <div
//                 className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold border border-white cursor-pointer"
//                 onClick={() => navigate("/profile")}
//               >
//                 {getFirstLetter(user?.email)} {/* Safely access user.email */}
//               </div>
//               <span className="text-white hidden md:block">{user?.name}</span>{" "}
//               {/* Safely access user.name */}
//               <button
//                 onClick={() => logout({ returnTo: window.location.href })}
//                 className="border border-white px-4 py-2 rounded-lg text-white hover:bg-white hover:text-[#0D1B2A] transition duration-300"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <div className="space-x-4">
//               <button
//                 onClick={() => navigate("/login")} // Redirect to Login page
//                 className="border border-white px-6 py-2 rounded-lg text-white hover:bg-white hover:text-[#0D1B2A] transition duration-300 ease-in-out transform hover:scale-105"
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => navigate("/register")} // Redirect to Register page
//                 className="bg-[#1F4068] text-white px-6 py-2 rounded-lg hover:bg-[#E63946] transition duration-300 ease-in-out transform hover:scale-105"
//               >
//                 Register
//               </button>
//             </div>
//           )}
//         </div>
//       </header>
//     </>
//   );
// };

// export default Header;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Header = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [newUserFormVisible, setNewUserFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    experience: "",
    phone: "",
    skills: "",
    address: "",
  });

  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Safely get the first letter of the email (handle undefined case)
  const getFirstLetter = (email) => {
    return email ? email.charAt(0).toUpperCase() : "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNewUser = async (event) => {
    event.preventDefault();

    try {
      // // Send the form data to the backend
      // await axios.post("http://localhost:3000/user", {
      //   email: user.email,
      //   ...formData,
      // });
      // console.log("User data submitted successfully!");
      // setNewUserFormVisible(false); // Hide the form after successful submission
      const data = await axios.post("http://localhost:3000/user", {
        name: user.name, email: user.email, picture: user.profile, address: formData.address, experience: formData.experience, phone: formData.phone, skills: formData.skills
      })

      console.log(data)
      console.log("successfull")
      setNewUserFormVisible(false)
    } catch (error) {
      console.error("Error submitting user data:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log(user.email);
      (async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/user?email=${user.email}`
          );
          console.log("Successful login...", response.data);
        } catch (error) {
          if (
            error.response &&
            error.response.data.message ===
              "User not found. Please create a new user."
          ) {
            setNewUserFormVisible(true);
          }
        }
      })();
      console.log(user);
    }
  }, [isAuthenticated]);

  return (
    <>
      {newUserFormVisible && (
        <div className="absolute w-full h-full bg-white z-[99999] top-0 left-0 flex justify-center items-center">
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-[400px] max-w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Fill Out Your Details
            </h2>
            <form id="popupForm" className="space-y-4" onSubmit={handleNewUser}>
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700"
                >
                  Experience (in years)
                </label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  placeholder="e.g., 3"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="e.g., +91 1234567890"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="skills"
                  className="block text-sm font-medium text-gray-700"
                >
                  Skills
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  placeholder="e.g., JavaScript, React, Node.js"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  placeholder="e.g., 123 Street, City, Country"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                ></textarea>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <header className="bg-gradient-to-r from-[#0D1B2A] to-[#1B263B] shadow-lg p-4 flex justify-between items-center px-8 sticky top-0 z-50 ">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold text-white md:text-3xl">
          TaskTurf
        </h1>
        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
       
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex space-x-6 absolute md:relative  left-0 w-full md:w-auto bg-[#0D1B2A] md:bg-transparent p-4 md:p-0`}
        >
          <Link
            to="/services"
            className="text-white hover:text-yellow-300 transition duration-300 block md:inline "
          >
            Services
          </Link>
          <Link
            to="/howWork"
            className="text-white hover:text-yellow-300 transition duration-300 block md:inline"
          >
            How Work
          </Link>
        </nav>
        

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {/* Profile Picture Clickable */}
              <div
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold border border-white cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                {getFirstLetter(user?.email)} {/* Safely access user.email */}
              </div>
              <span className="text-white hidden md:block">
                {user?.name}
              </span>{" "}
              {/* Safely access user.name */}
              <button
                onClick={() => logout({ returnTo: window.location.href })}
                className="border border-white px-4 py-2 rounded-lg text-white hover:bg-white hover:text-[#0D1B2A] transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="space-x-4">
              <button
                onClick={() => navigate("/login")} // Redirect to Login page
                className="border border-white px-6 py-2 rounded-lg text-white hover:bg-white hover:text-[#0D1B2A] transition duration-300 ease-in-out transform hover:scale-105"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")} // Redirect to Register page
                className="bg-[#1F4068] text-white px-6 py-2 rounded-lg hover:bg-[#E63946] transition duration-300 ease-in-out transform hover:scale-105"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;