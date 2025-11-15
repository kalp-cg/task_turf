import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  TrendingUp,
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Search,
  Filter,
  Download,
  Settings,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRole, setSelectedRole] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/dashboard/admin');
      setDashboardData(response.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async (role = 'all', search = '') => {
    try {
      const params = new URLSearchParams();
      if (role !== 'all') params.append('role', role);
      if (search) params.append('search', search);
      
      const response = await axios.get(`/api/dashboard/admin/users?${params.toString()}`);
      setUsers(response.data.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    }
  };

  const handleVerifyWorker = async (workerId) => {
    try {
      await axios.put(`/api/dashboard/admin/workers/${workerId}/verify`);
      toast.success('Worker verified successfully');
      fetchDashboardData();
      if (activeTab === 'users') fetchUsers(selectedRole, searchTerm);
    } catch (error) {
      console.error('Error verifying worker:', error);
      toast.error('Failed to verify worker');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }
    
    try {
      await axios.delete(`/api/dashboard/admin/users/${userId}`);
      toast.success('User deleted successfully');
      if (activeTab === 'users') fetchUsers(selectedRole, searchTerm);
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'text-red-600 bg-red-100';
      case 'worker': return 'text-blue-600 bg-blue-100';
      case 'user': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers(selectedRole, searchTerm);
    }
  }, [activeTab, selectedRole, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
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
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage platform users, workers, and monitor system performance
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                Admin Access
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
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData?.stats?.totalUsers || 0}
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
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Workers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData?.stats?.totalWorkers || 0}
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
                <Calendar className="h-6 w-6 text-yellow-600" />
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
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${dashboardData?.stats?.thisMonthRevenue || 0}
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
                { key: 'overview', label: 'Overview', icon: BarChart3 },
                { key: 'users', label: 'Manage Users', icon: Users },
                { key: 'approvals', label: 'Worker Approvals', icon: Shield },
                { key: 'analytics', label: 'Analytics', icon: TrendingUp }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`group inline-flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === key
                      ? 'border-red-500 text-red-600'
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
            {/* Platform Activity */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Recent Platform Activity</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {dashboardData?.recentActivities?.recentBookings?.slice(0, 5).map((booking) => (
                      <div key={booking._id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            New booking: {booking.serviceType}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {formatDate(booking.createdAt)}
                          </p>
                        </div>
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          ${booking.finalAmount || booking.price || 'TBD'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Bookings</span>
                    <span className="text-sm font-medium text-gray-900">
                      {dashboardData?.stats?.activeBookings || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pending Approvals</span>
                    <span className="text-sm font-medium text-yellow-600">
                      {dashboardData?.stats?.pendingWorkers || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">New Users (Week)</span>
                    <span className="text-sm font-medium text-green-600">
                      {dashboardData?.recentActivities?.newUsers?.length || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">New Workers (Week)</span>
                    <span className="text-sm font-medium text-blue-600">
                      {dashboardData?.recentActivities?.newWorkers?.length || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => setActiveTab('users')}
                    className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Users className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-sm font-medium">Manage Users</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('approvals')}
                    className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Shield className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-sm font-medium">Worker Approvals</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <TrendingUp className="h-5 w-5 text-purple-600 mr-3" />
                    <span className="text-sm font-medium">View Analytics</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">User Management</h2>
                <div className="flex space-x-4">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="all">All Roles</option>
                    <option value="user">Users</option>
                    <option value="worker">Workers</option>
                    <option value="admin">Admins</option>
                  </select>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              {users.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((userData) => (
                        <tr key={userData._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {userData.firstName} {userData.lastName}
                              </div>
                              <div className="text-sm text-gray-500">{userData.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getRoleColor(userData.role)}`}>
                              {userData.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(userData.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {userData.isVerified ? (
                                <CheckCircle className="h-4 w-4 text-green-400 mr-1" />
                              ) : (
                                <AlertTriangle className="h-4 w-4 text-yellow-400 mr-1" />
                              )}
                              <span className="text-sm text-gray-500">
                                {userData.isVerified ? 'Verified' : 'Pending'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              {userData.role === 'worker' && !userData.isVerified && (
                                <button
                                  onClick={() => handleVerifyWorker(userData._id)}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  Verify
                                </button>
                              )}
                              <button className="text-blue-600 hover:text-blue-900">
                                View
                              </button>
                              <button
                                onClick={() => handleDeleteUser(userData._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
                  <p className="mt-1 text-sm text-gray-500">Try adjusting your search filters</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'approvals' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Pending Worker Approvals</h2>
            </div>
            <div className="p-6">
              {dashboardData?.pendingApprovals?.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.pendingApprovals.map((worker) => (
                    <div key={worker._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">
                            {worker.firstName} {worker.lastName}
                          </h3>
                          <p className="text-sm text-gray-500">{worker.email}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Skills: {worker.skills?.join(', ') || 'Not specified'}
                          </p>
                          <p className="text-sm text-gray-600">
                            Experience: {worker.experience || 0} years
                          </p>
                          <p className="text-sm text-gray-600">
                            Rate: ${worker.hourlyRate || 0}/hour
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleVerifyWorker(worker._id)}
                            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </button>
                          <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Shield className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No pending approvals</h3>
                  <p className="mt-1 text-sm text-gray-500">All workers have been verified</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center py-8">
              <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Analytics Dashboard</h3>
              <p className="mt-1 text-sm text-gray-500 mb-4">
                Detailed analytics and reporting features coming soon
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900">Revenue Analytics</h4>
                  <p className="text-sm text-gray-500">Track monthly and yearly revenue</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900">User Growth</h4>
                  <p className="text-sm text-gray-500">Monitor user acquisition trends</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900">Service Performance</h4>
                  <p className="text-sm text-gray-500">Analyze popular services</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;