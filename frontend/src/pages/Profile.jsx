import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Edit, 
  Save, 
  X, 
  Plus, 
  Trash2,
  Star,
  Calendar,
  DollarSign,
  Briefcase,
  Clock,
  Award
} from 'lucide-react';
import Header from '../components/Header';
import Loader from '../components/Loader';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    bio: '',
    // Worker specific
    hourlyRate: '',
    isAvailable: true,
    // General
    profileImage: ''
  });

  const [addresses, setAddresses] = useState([]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    isDefault: false
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        bio: user.bio || '',
        hourlyRate: user.hourlyRate || '',
        isAvailable: user.isAvailable !== undefined ? user.isAvailable : true,
        profileImage: user.profileImage || ''
      });
      setAddresses(user.addresses || []);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const result = await updateProfile(profileData);
      if (result.success) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      } else {
        toast.error(result.error || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred while updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async () => {
    if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zipcode) {
      toast.error('Please fill in all address fields');
      return;
    }

    try {
      setLoading(true);
      // API call to add address would go here
      const addressWithId = {
        ...newAddress,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      
      setAddresses(prev => [...prev, addressWithId]);
      setNewAddress({
        label: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        isDefault: false
      });
      setShowAddAddress(false);
      toast.success('Address added successfully!');
    } catch (error) {
      toast.error('Failed to add address');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      setAddresses(prev => prev.filter(addr => addr.id !== addressId));
      toast.success('Address deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete address');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount || 0);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto p-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={user.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstName}${user.lastName}`}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-white ${
                user.role === 'worker' ? (user.isAvailable ? 'bg-green-500' : 'bg-red-500') : 'bg-blue-500'
              }`}></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-gray-600 capitalize flex items-center">
                    {user.role === 'worker' && <Briefcase className="h-4 w-4 mr-1" />}
                    {user.role === 'user' && <User className="h-4 w-4 mr-1" />}
                    {user.role}
                    {user.role === 'worker' && user.isAvailable && (
                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Available
                      </span>
                    )}
                    {user.isVerified && (
                      <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center">
                        <Award className="h-3 w-3 mr-1" />
                        Verified
                      </span>
                    )}
                  </p>
                  {user.bio && <p className="text-gray-600 mt-1">{user.bio}</p>}
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
            </div>
          </div>

          {/* Worker Stats */}
          {user.role === 'worker' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-2xl font-bold ml-1">{user.rating || 0}</span>
                </div>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Briefcase className="h-5 w-5 text-blue-500" />
                  <span className="text-2xl font-bold ml-1">{user.completedJobs || 0}</span>
                </div>
                <p className="text-sm text-gray-600">Jobs Completed</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <span className="text-2xl font-bold ml-1">{user.hourlyRate || 0}</span>
                </div>
                <p className="text-sm text-gray-600">Hourly Rate (₹)</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-5 w-5 text-purple-500" />
                  <span className="text-2xl font-bold ml-1">{user.experience || 0}</span>
                </div>
                <p className="text-sm text-gray-600">Years Experience</p>
              </div>
            </div>
          )}

          {/* User Stats */}
          {user.role === 'user' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Briefcase className="h-5 w-5 text-blue-500" />
                  <span className="text-2xl font-bold ml-1">{user.bookingHistory?.length || 0}</span>
                </div>
                <p className="text-sm text-gray-600">Total Bookings</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <span className="text-2xl font-bold ml-1">{formatCurrency(user.totalSpent || 0)}</span>
                </div>
                <p className="text-sm text-gray-600">Total Spent</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="h-5 w-5 text-purple-500" />
                  <span className="text-2xl font-bold ml-1">{formatDate(user.createdAt)}</span>
                </div>
                <p className="text-sm text-gray-600">Member Since</p>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Profile Details
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'addresses'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Addresses
              </button>
              {user.role === 'worker' && (
                <button
                  onClick={() => setActiveTab('work-history')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'work-history'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Work History
                </button>
              )}
              {user.role === 'user' && (
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'bookings'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Booking History
                </button>
              )}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Profile Details Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 rounded-lg">{user.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 rounded-lg">{user.lastName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <p className="px-3 py-2 bg-gray-50 rounded-lg flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      {user.email}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 rounded-lg flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        {user.phone}
                      </p>
                    )}
                  </div>

                  {user.role === 'worker' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hourly Rate (₹)
                      </label>
                      {isEditing ? (
                        <input
                          type="number"
                          name="hourlyRate"
                          value={profileData.hourlyRate}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="px-3 py-2 bg-gray-50 rounded-lg">₹{user.hourlyRate}</p>
                      )}
                    </div>
                  )}

                  {user.role === 'worker' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Availability
                      </label>
                      {isEditing ? (
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="isAvailable"
                            checked={profileData.isAvailable}
                            onChange={handleInputChange}
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                          <span className="ml-2">Available for work</span>
                        </label>
                      ) : (
                        <p className={`px-3 py-2 rounded-lg ${user.isAvailable ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                          {user.isAvailable ? 'Available' : 'Not Available'}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="px-3 py-2 bg-gray-50 rounded-lg min-h-[100px]">
                      {user.bio || 'No bio added yet.'}
                    </p>
                  )}
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      disabled={loading}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">My Addresses</h3>
                  <button
                    onClick={() => setShowAddAddress(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Address
                  </button>
                </div>

                {showAddAddress && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-4">Add New Address</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        name="label"
                        placeholder="Address Label (e.g., Home, Work)"
                        value={newAddress.label}
                        onChange={handleAddressChange}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="street"
                        placeholder="Street Address"
                        value={newAddress.street}
                        onChange={handleAddressChange}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={handleAddressChange}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={newAddress.state}
                        onChange={handleAddressChange}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="zipcode"
                        placeholder="Zipcode"
                        value={newAddress.zipcode}
                        onChange={handleAddressChange}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="isDefault"
                          checked={newAddress.isDefault}
                          onChange={handleAddressChange}
                          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <span className="ml-2">Set as default</span>
                      </label>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setShowAddAddress(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddAddress}
                        disabled={loading}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      >
                        {loading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        Add Address
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="font-semibold">{address.label}</span>
                            {address.isDefault && (
                              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600">
                            {address.street}, {address.city}, {address.state} - {address.zipcode}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {addresses.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No addresses added yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Work History Tab (Workers) */}
            {activeTab === 'work-history' && user.role === 'worker' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Work History</h3>
                <div className="space-y-4">
                  {user.workHistory && user.workHistory.length > 0 ? (
                    user.workHistory.map((work) => (
                      <div key={work.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-lg">{work.serviceType}</h4>
                            <p className="text-gray-600">Client: {work.clientName}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">
                              {formatCurrency(work.earnings)}
                            </p>
                            <p className="text-sm text-gray-500">{formatDate(work.completedDate)}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{work.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              {work.duration}h
                            </span>
                            <span className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              {work.location}
                            </span>
                          </div>
                          {work.rating > 0 && (
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-sm">{work.rating}/5</span>
                            </div>
                          )}
                        </div>
                        {work.review && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm italic">"{work.review}"</p>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No work history available yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Booking History Tab (Users) */}
            {activeTab === 'bookings' && user.role === 'user' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Booking History</h3>
                <div className="space-y-4">
                  {user.bookingHistory && user.bookingHistory.length > 0 ? (
                    user.bookingHistory.map((booking) => (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-lg">{booking.serviceType}</h4>
                            <p className="text-gray-600">Worker: {booking.workerName}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">
                              {formatCurrency(booking.cost)}
                            </p>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              booking.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500">
                            {formatDate(booking.date)}
                          </p>
                          {booking.rating && (
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-sm">{booking.rating}/5</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No bookings made yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;