import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Calendar, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  AlertCircle, 
  User, 
  MapPin,
  Phone,
  Mail,
  Star
} from 'lucide-react';
import axios from 'axios';

const WorkerDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    acceptedBookings: 0,
    completedBookings: 0,
    totalEarnings: 0,
    unreadNotifications: 0
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  // Simulate worker ID (in real app, get from auth context)
  const workerId = '6918b41e15bbd846a413f87d'; // sp muthmare - the worker who should receive notifications

  useEffect(() => {
    fetchWorkerData();
  }, []);

  const fetchWorkerData = async () => {
    try {
      setLoading(true);
      
      // Fetch stats
      const statsResponse = await axios.get(`http://localhost:5000/api/notifications/worker/${workerId}/stats`);
      if (statsResponse.data.success) {
        setStats(statsResponse.data.stats);
      }

      // Fetch notifications
      const notificationsResponse = await axios.get(`http://localhost:5000/api/notifications/${workerId}?type=booking_request&limit=10`);
      if (notificationsResponse.data.success) {
        setNotifications(notificationsResponse.data.notifications);
      }

      // Fetch bookings
      const bookingsResponse = await axios.get(`http://localhost:5000/api/bookings/worker/${workerId}?limit=10`);
      if (bookingsResponse.data.success) {
        setBookings(bookingsResponse.data.bookings);
      }

    } catch (error) {
      console.error('Error fetching worker data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingResponse = async (bookingId, action, message = '') => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/bookings/${bookingId}/respond`, {
        action,
        workerId,
        message
      });

      if (response.data.success) {
        alert(`Booking ${action}ed successfully!`);
        fetchWorkerData(); // Refresh data
      }
    } catch (error) {
      console.error(`Error ${action}ing booking:`, error);
      alert(`Error ${action}ing booking. Please try again.`);
    }
  };

  const markNotificationRead = async (notificationId) => {
    try {
      await axios.patch(`http://localhost:5000/api/notifications/${notificationId}/read`, {
        workerId
      });
      fetchWorkerData(); // Refresh data
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color = 'blue' }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <Icon className={`w-8 h-8 text-${color}-500`} />
      </div>
    </div>
  );

  const BookingCard = ({ booking }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 capitalize">
            {booking.service || booking.serviceType}
          </h3>
          <p className="text-gray-600">
            {booking.userDetails?.name || 'Customer'} • {booking.userDetails?.phone}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          booking.status === 'accepted' ? 'bg-green-100 text-green-800' :
          booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {booking.status}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(booking.date).toLocaleDateString()}
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          {booking.time}
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          {booking.address}
        </div>
        <div className="flex items-center text-gray-600">
          <DollarSign className="w-4 h-4 mr-2" />
          ₹{booking.estimatedCost || booking.finalAmount}
        </div>
      </div>
      
      {booking.description && (
        <p className="text-gray-700 mb-4">{booking.description}</p>
      )}

      {booking.status === 'pending' && (
        <div className="flex space-x-3">
          <button
            onClick={() => handleBookingResponse(booking._id, 'accept')}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Accept
          </button>
          <button
            onClick={() => handleBookingResponse(booking._id, 'reject')}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );

  const NotificationCard = ({ notification }) => (
    <div 
      className={`bg-white rounded-lg shadow-md p-4 mb-3 border-l-4 ${
        notification.isRead ? 'border-gray-300' : 'border-orange-500'
      }`}
      onClick={() => !notification.isRead && markNotificationRead(notification._id)}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{notification.title}</h4>
          <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
          <p className="text-gray-400 text-xs mt-2">
            {new Date(notification.createdAt).toLocaleDateString()} at{' '}
            {new Date(notification.createdAt).toLocaleTimeString()}
          </p>
        </div>
        {!notification.isRead && (
          <div className="w-3 h-3 bg-orange-500 rounded-full ml-2"></div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading worker dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Worker Dashboard</h1>
              <p className="text-gray-600">Manage your bookings and notifications</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                {stats.unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {stats.unreadNotifications}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: Calendar },
              { id: 'bookings', name: 'Bookings', icon: CheckCircle },
              { id: 'notifications', name: 'Notifications', icon: Bell }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                title="Total Bookings" 
                value={stats.totalBookings} 
                icon={Calendar} 
                color="#3B82F6" 
              />
              <StatCard 
                title="Pending Requests" 
                value={stats.pendingBookings} 
                icon={Clock} 
                color="#F59E0B" 
              />
              <StatCard 
                title="Completed Jobs" 
                value={stats.completedBookings} 
                icon={CheckCircle} 
                color="#10B981" 
              />
              <StatCard 
                title="Total Earnings" 
                value={`₹${stats.totalEarnings}`} 
                icon={DollarSign} 
                color="#8B5CF6" 
              />
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h2>
              {bookings.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No bookings yet</p>
              ) : (
                <div className="space-y-4">
                  {bookings.slice(0, 3).map((booking) => (
                    <BookingCard key={booking._id} booking={booking} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">All Bookings</h2>
            </div>
            {bookings.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-500">Your booking requests will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <BookingCard key={booking._id} booking={booking} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
              {stats.unreadNotifications > 0 && (
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                  {stats.unreadNotifications} unread
                </span>
              )}
            </div>
            {notifications.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                <p className="text-gray-500">Your notifications will appear here</p>
              </div>
            ) : (
              <div>
                {notifications.map((notification) => (
                  <NotificationCard key={notification._id} notification={notification} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;