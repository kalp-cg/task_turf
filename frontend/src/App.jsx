import React, { Suspense, lazy } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader.jsx"; 

const Home = lazy(() => import("./pages/Home"));
const WorkersPage = lazy(() => import("./pages/WorkersPage"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Cleaning = lazy(() => import("./pages/Cleaning"));
const Plumbing = lazy(() => import("./pages/Plumbing"));
const Electrical = lazy(() => import("./pages/Elecrical.jsx"));
const Babysitting = lazy(() => import("./pages/Babysitting"));
const Gardening = lazy(() => import("./pages/Gardening"));
const Cooking = lazy(() => import("./pages/Cooking"));
const Painting = lazy(() => import("./pages/Painting"));
const Contact = lazy(() => import("./pages/Contact"));
const HowWork = lazy(() => import("./components/HowWork"));
const NotFound = lazy(() => import("./pages/NotFound")); 
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const Cart = lazy(() => import("./pages/Cart"));

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        {/* Suspense for lazy-loaded components with custom loader */}
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/workers" element={<WorkersPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/howWork" element={<HowWork />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<Cart />} />

            {/* Service Routes */}
            <Route path="/cleaning" element={<Cleaning />} />
            <Route path="/plumbing" element={<Plumbing />} />
            <Route path="/electrical" element={<Electrical />} />
            <Route path="/babysitting" element={<Babysitting />} />
            <Route path="/gardening" element={<Gardening />} />
            <Route path="/cooking" element={<Cooking />} />
            <Route path="/painting" element={<Painting />} />

            {/* Catch-all Route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
