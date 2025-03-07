import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Login = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      alert("Login Successful!");
      console.log("User logged in:", response.data);
    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again.");
    }
    setIsLoading(false);
  };

  const LoginWithRedirectFunction = async () => {
    loginWithRedirect().then(() => {
      console.log("data");
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96 text-gray-700">
        {isAuthenticated ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-indigo-600 mb-6">
              Welcome, {user?.email?.charAt(0).toUpperCase()}!
            </h2>
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="w-full py-3 rounded-md bg-red-500 text-white hover:bg-red-600 transition duration-300 focus:outline-none"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-indigo-600 mb-8">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
                  placeholder="Enter your password"
                  required
                />
              </div>
              {errorMessage && (
                <div className="mb-4 text-sm text-red-500 text-center font-medium">{errorMessage}</div>
              )}
              <button
                type="submit"
                className={`w-full py-3 rounded-md text-white ${
                  isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                } transition duration-300 focus:outline-none`}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
            <div className="text-center mt-6">
              <button
                onClick={() => LoginWithRedirectFunction()}
                className="w-full py-3 mt-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-300 focus:outline-none"
              >
                Login with Auth0
              </button>
            </div>
          </>
        )}
      </div>
      <div className="hidden sm:block ml-8 p-4 bg-gray-50 rounded-lg shadow-md text-gray-700">
        <pre className="text-sm">{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Login;