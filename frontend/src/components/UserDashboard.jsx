import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Calendar, 
  MapPin, 
  Star, 
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Heart,
  DollarSign,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const UserDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  // Booking modal state
  const [bookingForm, setBookingForm] = useState({
    serviceType: '',
    description: '',
    scheduledDate: '',
    scheduledTime: '',
    serviceAddress: {
      street: '',
      city: '',
      state: '',
      zipcode: ''
    },
    specialInstructions: '',
    urgency: 'standard'
  });

  const serviceTypes = [
    'Cleaning', 'Plumbing', 'Electrical', 'Babysitting', 
    'Gardening', 'Cooking', 'Painting', 'Carpentry'
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/dashboard/user');
      setDashboardData(response.data.data);
      setBookings(response.data.data.recentBookings);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async (status = 'all') => {
    try {
      const response = await axios.get(`/api/dashboard/user/bookings?status=${status}&limit=20`);
      setBookings(response.data.data.bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.patch(`/api/bookings/${bookingId}/cancel`);
      toast.success('Booking cancelled successfully');
      fetchBookings();
      fetchDashboardData(); // Refresh dashboard stats
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Failed to cancel booking');
    }
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const bookingData = {
        ...bookingForm,
        userId: user._id,
        contactInfo: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone: user.phone || ''
        }
      };

      const response = await axios.post('/api/bookings', bookingData);
      
      if (response.data.success) {
        toast.success('Booking created successfully!');
        setShowBookingModal(false);
        setBookingForm({
          serviceType: '',
          description: '',
          scheduledDate: '',
          scheduledTime: '',
          serviceAddress: { street: '', city: '', state: '', zipcode: '' },
          specialInstructions: '',
          urgency: 'standard'
        });
        fetchDashboardData();
        fetchBookings();
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'confirmed': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {dashboardData?.user?.firstName}!
          </h1>
          <p className="text-gray-600">Manage your bookings and find services</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData?.stats?.totalBookings || 0}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData?.stats?.completedBookings || 0}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData?.stats?.pendingBookings || 0}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Favorites</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData?.stats?.favoriteWorkers || 0}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'overview', label: 'Overview', icon: User },
                { key: 'bookings', label: 'My Bookings', icon: Calendar },
                { key: 'services', label: 'Find Services', icon: Search }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`group inline-flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Bookings */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Recent Bookings</h2>
                </div>
                <div className="p-6">
                  {bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.slice(0, 3).map((booking) => (
                        <div
                          key={booking._id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-900">
                              {booking.serviceType}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {formatDate(booking.scheduledDate)}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings yet</h3>
                      <p className="mt-1 text-sm text-gray-500">Get started by booking your first service</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowBookingModal(true)}
                    className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-sm font-medium">Book New Service</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Calendar className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-sm font-medium">View All Bookings</span>
                  </button>
                </div>
              </div>

              {/* Recommended Services */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Recommended Services</h2>
                <div className="space-y-3">
                  {dashboardData?.recommendedServices?.slice(0, 3).map((service) => (
                    <div key={service._id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{service.name}</h3>
                        <p className="text-xs text-gray-500">Starting at ${service.basePrice}</p>
                      </div>
                      <Star className="h-4 w-4 text-yellow-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">All Bookings</h2>
                <div className="flex space-x-2">
                  {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => fetchBookings(status)}
                      className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md capitalize"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6">
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-medium text-gray-900">
                          {booking.serviceType}
                        </h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {formatDate(booking.scheduledDate)}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {booking.serviceAddress?.city || 'Location not set'}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-2" />
                          ${booking.finalAmount || booking.price || 'TBD'}
                        </div>
                      </div>
                      
                      {booking.description && (
                        <p className="mt-2 text-sm text-gray-600">{booking.description}</p>
                      )}
                      
                      {booking.status === 'pending' && (
                        <div className="mt-4">
                          <button
                            onClick={() => handleCancelBooking(booking._id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Cancel Booking
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
                  <p className="mt-1 text-sm text-gray-500">Your bookings will appear here</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center py-8">
              <Search className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Find Services</h3>
              <p className="mt-1 text-sm text-gray-500 mb-4">
                Browse our available services and book with trusted workers
              </p>
              <button
                onClick={() => window.location.href = '/workers'}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Browse All Services
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Book a Service</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Type
                </label>
                <select
                  value={bookingForm.serviceType}
                  onChange={(e) => setBookingForm({ ...bookingForm, serviceType: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a service</option>
                  {serviceTypes.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={bookingForm.description}
                  onChange={(e) => setBookingForm({ ...bookingForm, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Describe what you need..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={bookingForm.preferredDate}
                  onChange={(e) => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget (₹)
                </label>
                <input
                  type="number"
                  value={bookingForm.budget}
                  onChange={(e) => setBookingForm({ ...bookingForm, budget: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  placeholder="Enter your budget"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;