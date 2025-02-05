import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Reset error message on new attempt

    // Simulate a login process (this can be replaced with an actual API call)
    setTimeout(() => {
      if (email === "test@example.com" && password === "password123") {
        console.log("Successfully logged in with:", email, password);
        // Navigate to another page, e.g., a dashboard (simulate this for now)
        alert("Login Successful!");
      } else {
        setErrorMessage("Invalid email or password. Please try again.");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96 md:w-96 lg:w-96">
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-gray-500 transition duration-300"
              placeholder="Enter your email"
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-gray-500 transition duration-300"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Error message */}
          {errorMessage && (
            <div className="mb-4 text-red-600 text-center font-medium">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-3 rounded-md text-white ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 hover:text-blue-700 hover:underline transition duration-300 ease-in-out"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
