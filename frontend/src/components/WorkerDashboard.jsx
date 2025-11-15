import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Calendar, 
  DollarSign, 
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Edit,
  Settings,
  Bell,
  Check,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const WorkerDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notifications/worker', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleBookingResponse = async (bookingId, action) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/bookings/${bookingId}/${action}`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        toast.success(`Booking ${action}ed successfully`);
        fetchNotifications(); // Refresh notifications
        fetchDashboardData(); // Refresh dashboard
      }
    } catch (error) {
      console.error(`Error ${action}ing booking:`, error);
      toast.error(`Failed to ${action} booking`);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/dashboard/worker');
      setDashboardData(response.data.data);
      setJobs(response.data.data.recentJobs);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async (status = 'all') => {
    try {
      const response = await axios.get(`/api/dashboard/worker/jobs?status=${status}&limit=20`);
      setJobs(response.data.data.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load jobs');
    }
  };

  const handleAcceptJob = async (jobId) => {
    try {
      await axios.post(`/api/dashboard/worker/jobs/${jobId}/accept`);
      toast.success('Job accepted successfully');
      fetchJobs();
    } catch (error) {
      console.error('Error accepting job:', error);
      toast.error('Failed to accept job');
    }
  };

  const handleCompleteJob = async (jobId, notes = '') => {
    try {
      await axios.post(`/api/dashboard/worker/jobs/${jobId}/complete`, { notes });
      toast.success('Job marked as completed');
      fetchJobs();
    } catch (error) {
      console.error('Error completing job:', error);
      toast.error('Failed to complete job');
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Worker Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {dashboardData?.worker?.firstName}! Manage your jobs and availability
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                dashboardData?.worker?.isAvailable 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {dashboardData?.worker?.isAvailable ? 'Available' : 'Not Available'}
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-sm font-medium">
                  {dashboardData?.worker?.rating?.toFixed(1) || '0.0'}
                </span>
              </div>
            </div>
          </div>
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
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData?.stats?.totalJobs || 0}
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
                  {dashboardData?.stats?.completedJobs || 0}
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
                  {dashboardData?.stats?.pendingJobs || 0}
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
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${dashboardData?.stats?.thisMonthEarnings || 0}
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
                { key: 'overview', label: 'Overview', icon: Briefcase },
                { key: 'notifications', label: 'Notifications', icon: Bell, count: notifications.length },
                { key: 'jobs', label: 'Job Requests', icon: Calendar },
                { key: 'profile', label: 'Profile & Settings', icon: Settings }
              ].map(({ key, label, icon: Icon, count }) => (
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
                  {count > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                      {count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Jobs */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Recent Job Requests</h2>
                </div>
                <div className="p-6">
                  {jobs.length > 0 ? (
                    <div className="space-y-4">
                      {jobs.slice(0, 3).map((job) => (
                        <div
                          key={job._id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-900">
                              {job.serviceType}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {formatDate(job.scheduledDate)} • ${job.finalAmount || job.price}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                              {job.status}
                            </span>
                            {job.status === 'pending' && (
                              <button
                                onClick={() => handleAcceptJob(job._id)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                Accept
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No recent jobs</h3>
                      <p className="mt-1 text-sm text-gray-500">New job requests will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Worker Profile Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Summary</h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600">{dashboardData?.worker?.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600">{dashboardData?.worker?.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600">
                      {dashboardData?.worker?.skills?.join(', ') || 'No skills listed'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600">
                      ${dashboardData?.worker?.hourlyRate || 0}/hour
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              </div>

              {/* Recent Work History */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Work History</h2>
                <div className="space-y-3">
                  {dashboardData?.workHistory?.length > 0 ? (
                    dashboardData.workHistory.map((work, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{work.serviceType}</h3>
                          <p className="text-xs text-gray-500">{work.clientName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">${work.earnings}</p>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 mr-1" />
                            <span className="text-xs text-gray-500">{work.rating || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center">No work history yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Booking Notifications</h2>
            </div>
            <div className="p-6">
              {notifications.length > 0 ? (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            New Booking Request - {notification.booking?.serviceType}
                          </h3>
                          
                          {/* Customer Details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-600">Customer:</p>
                              <p className="font-medium">{notification.booking?.customerName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Phone:</p>
                              <p className="font-medium">{notification.booking?.phone}</p>
                            </div>
                            <div className="md:col-span-2">
                              <p className="text-sm text-gray-600">Address:</p>
                              <p className="font-medium">{notification.booking?.address}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Date & Time:</p>
                              <p className="font-medium">
                                {new Date(notification.booking?.scheduledDate).toLocaleDateString()} at{' '}
                                {notification.booking?.scheduledTime}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Budget:</p>
                              <p className="font-medium text-green-600">₹{notification.booking?.budget}</p>
                            </div>
                          </div>

                          {/* Description */}
                          {notification.booking?.description && (
                            <div className="mb-4">
                              <p className="text-sm text-gray-600">Description:</p>
                              <p className="text-gray-800">{notification.booking?.description}</p>
                            </div>
                          )}

                          {/* Timestamps */}
                          <div className="text-xs text-gray-500 mb-4">
                            Request received: {new Date(notification.createdAt).toLocaleString()}
                          </div>

                          {/* Action Buttons */}
                          {notification.booking?.status === 'pending' && (
                            <div className="flex space-x-3">
                              <button
                                onClick={() => handleBookingResponse(notification.booking._id, 'accept')}
                                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                              >
                                <Check className="w-4 h-4 mr-2" />
                                Accept
                              </button>
                              <button
                                onClick={() => handleBookingResponse(notification.booking._id, 'reject')}
                                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                              >
                                <X className="w-4 h-4 mr-2" />
                                Reject
                              </button>
                            </div>
                          )}

                          {/* Status Badge */}
                          {notification.booking?.status !== 'pending' && (
                            <div className="mt-3">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                notification.booking?.status === 'accepted' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {notification.booking?.status === 'accepted' ? 'Accepted' : 'Rejected'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No new booking requests</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Job Requests</h2>
                <div className="flex space-x-2">
                  {['all', 'pending', 'confirmed', 'completed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => fetchJobs(status)}
                      className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md capitalize"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6">
              {jobs.length > 0 ? (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div
                      key={job._id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-medium text-gray-900">
                          {job.serviceType}
                        </h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {formatDate(job.scheduledDate)}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {job.serviceAddress?.city || 'Location not set'}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-2" />
                          ${job.finalAmount || job.price || 'TBD'}
                        </div>
                      </div>
                      
                      {job.description && (
                        <p className="text-sm text-gray-600 mb-3">{job.description}</p>
                      )}
                      
                      <div className="flex space-x-2">
                        {job.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleAcceptJob(job._id)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                            >
                              Accept Job
                            </button>
                            <button
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium"
                            >
                              Decline
                            </button>
                          </>
                        )}
                        {job.status === 'confirmed' && (
                          <button
                            onClick={() => handleCompleteJob(job._id)}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
                          >
                            Mark Complete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs found</h3>
                  <p className="mt-1 text-sm text-gray-500">Job requests will appear here</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center py-8">
              <Settings className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Profile Settings</h3>
              <p className="mt-1 text-sm text-gray-500 mb-4">
                Update your profile information and availability
              </p>
              <button
                onClick={() => window.location.href = '/profile'}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Go to Profile Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;