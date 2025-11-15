import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const AuthContext = createContext();

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;

// Add token to requests automatically
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh on 401 responses
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post('/api/auth/refresh', {
            refreshToken: refreshToken
          });
          
          const { accessToken } = response.data.data;
          localStorage.setItem('accessToken', accessToken);
          
          // Retry the original request
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize authentication state
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');
      const savedUser = localStorage.getItem('user');
      
      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
          
          // Verify token is still valid by getting current user
          const response = await axios.get('/api/auth/me');
          // Update user data if response contains updated info
          if (response.data.data.user) {
            const updatedUser = response.data.data.user;
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
          }
        } catch (error) {
          // Token invalid, clear auth data
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true);
      
      const endpoint = userData.role === 'worker' 
        ? '/api/auth/register/worker' 
        : '/api/auth/register/user';
      
      const response = await axios.post(endpoint, userData);
      
      const { user: newUser, accessToken, refreshToken } = response.data.data;
      
      // Store auth data
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      setUser(newUser);
      setIsAuthenticated(true);
      
      return { success: true, user: newUser };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });
      
      const { user: loggedInUser, accessToken, refreshToken } = response.data.data;
      
      // Store auth data
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      
      setUser(loggedInUser);
      setIsAuthenticated(true);
      
      return { success: true, user: loggedInUser };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (error) {
      // Even if API call fails, still clear local data
      console.error('Logout API error:', error);
    } finally {
      // Clear auth data
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Update user profile
  const updateProfile = async (updateData) => {
    try {
      const response = await axios.put('/api/auth/me', updateData);
      const updatedUser = response.data.data.user;
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return { success: true, user: updatedUser };
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed';
      return { success: false, error: message };
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      await axios.put('/api/auth/change-password', {
        currentPassword,
        newPassword
      });
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Password change failed';
      return { success: false, error: message };
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Get role-specific redirect path
  const getRoleRedirectPath = (userRole) => {
    switch (userRole) {
      case 'admin':
        return '/admin';
      case 'worker':
        return '/worker';
      case 'user':
        return '/dashboard';
      default:
        return '/';
    }
  };

  // Login with redirect
  const loginWithRedirect = async (email, password) => {
    const result = await login(email, password);
    if (result.success) {
      const redirectPath = getRoleRedirectPath(result.user.role);
      window.location.href = redirectPath;
    }
    return result;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  // Get user's display name
  const getDisplayName = () => {
    if (!user) return '';
    return `${user.firstName} ${user.lastName}`.trim();
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    register,
    login,
    loginWithRedirect,
    logout,
    updateProfile,
    changePassword,
    hasRole,
    hasAnyRole,
    getDisplayName,
    getRoleRedirectPath
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;