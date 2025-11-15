import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import { Loader, NetworkStatus } from './components/LoadingStates';

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const WorkersPage = lazy(() => import("./pages/WorkersPage"));
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
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile"));
const RoleBasedDashboard = lazy(() => import("./components/RoleBasedDashboard"));
const WorkerDashboard = lazy(() => import("./pages/WorkerDashboard"));

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen">
              {/* Network status indicator */}
              <NetworkStatus />
              
              {/* Global toast notifications */}
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  },
                  success: {
                    style: {
                      background: '#10B981',
                    },
                  },
                  error: {
                    style: {
                      background: '#EF4444',
                    },
                  },
                  loading: {
                    style: {
                      background: '#F4A261',
                    },
                  },
                }}
              />
              
              {/* Suspense for lazy-loaded components with enhanced loader */}
              <Suspense fallback={<Loader fullscreen message="Loading page..." />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/workers" element={<WorkersPage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/howWork" element={<HowWork />} />

                  {/* Service Routes */}
                  <Route path="/cleaning" element={<Cleaning />} />
                  <Route path="/plumbing" element={<Plumbing />} />
                  <Route path="/electrical" element={<Electrical />} />
                  <Route path="/babysitting" element={<Babysitting />} />
                  <Route path="/gardening" element={<Gardening />} />
                  <Route path="/cooking" element={<Cooking />} />
                  <Route path="/painting" element={<Painting />} />

                  {/* Protected Routes - Require Authentication */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <RoleBasedDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/cart" 
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    } 
                  />

                  {/* Admin Dashboard */}
                  <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <RoleBasedDashboard />
                      </ProtectedRoute>
                    } 
                  />

                  {/* Worker Dashboard */}
                  <Route 
                    path="/worker-dashboard" 
                    element={<WorkerDashboard />} 
                  />

                  {/* Worker Dashboard */}
                  <Route 
                    path="/worker" 
                    element={
                      <ProtectedRoute allowedRoles={['worker']}>
                        <RoleBasedDashboard />
                      </ProtectedRoute>
                    } 
                  />

                  {/* User Dashboard */}
                  <Route 
                    path="/user" 
                    element={
                      <ProtectedRoute allowedRoles={['user']}>
                        <RoleBasedDashboard />
                      </ProtectedRoute>
                    } 
                  />

                  {/* Catch-all Route for 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
