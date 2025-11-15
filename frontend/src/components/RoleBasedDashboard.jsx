import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UserDashboard from './UserDashboard';
import WorkerDashboard from './WorkerDashboard';
import AdminDashboard from './AdminDashboard';
import Loader from './Loader';

const RoleBasedDashboard = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case 'user':
      return <UserDashboard />;
    case 'worker':
      return <WorkerDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default RoleBasedDashboard;