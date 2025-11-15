import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  User, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  ArrowRight, 
  Star,
  Shield,
  Award 
} from 'lucide-react';
import axios from 'axios';

const BookingSteps = ({ isOpen, serviceData, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState({
    service: serviceData?.category || serviceData?.title || 'Service',
    address: '',
    date: '',
    time: '',
    description: '',
    budget: serviceData?.basePrice || 1000,
    userDetails: {
      name: '',
      phone: '',
      email: ''
    }
  });

  const steps = [
    { id: 1, title: 'Tell us what you need', icon: User },
    { id: 2, title: 'Choose your pro', icon: Star },
    { id: 3, title: 'Schedule', icon: Calendar },
    { id: 4, title: 'Confirm & book', icon: CheckCircle }
  ];

  // Fetch workers for the specific service
  useEffect(() => {
    const fetchWorkers = async () => {
      if (currentStep === 2) {
        setIsLoading(true);
        try {
          // Use the exact category from serviceData, fallback to 'Cleaning' with correct casing
          const serviceCategory = serviceData?.category || 'Cleaning';
          console.log('Fetching workers for service:', serviceCategory);

          // Include date/time in query if selected to ensure availability at that slot
          const params = new URLSearchParams();
          if (bookingData.date) params.append('date', bookingData.date);
          if (bookingData.time) params.append('time', bookingData.time);

          const query = params.toString() ? `?${params.toString()}` : '';
          const response = await axios.get(`http://localhost:5000/api/workers/service/${serviceCategory}${query}`);

          if (response.data.success) {
            setWorkers(response.data.workers);
            console.log('Workers found:', response.data.workers.length);
          }
        } catch (error) {
          console.error('Error fetching workers:', error);
          if (error.response?.status === 404) {
            console.log('No workers found for this service');
            setWorkers([]);
          }
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchWorkers();
  }, [currentStep, serviceData, bookingData.date, bookingData.time]);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setBookingData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setBookingData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const submitBooking = async () => {
    setIsLoading(true);
    try {
      const serviceCategory = serviceData?.category || 'Cleaning';
      const bookingPayload = {
        service: serviceCategory,
        address: bookingData.address,
        date: bookingData.date,
        time: bookingData.time,
        description: bookingData.description,
        budget: bookingData.budget,
        userDetails: bookingData.userDetails,
        workerId: selectedWorker._id,
        estimatedCost: selectedWorker.hourlyRate * 2 // Estimate 2 hours
      };

      const response = await axios.post('http://localhost:5000/api/bookings/frontend', bookingPayload);
      
      if (response.data.success) {
        alert('Booking request sent successfully! The worker will be notified and will contact you soon.');
        onClose();
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Error submitting booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Tell us about your {serviceData?.title || 'service'} needs
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Enter your complete address"
                      value={bookingData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe your needs
                  </label>
                  <textarea
                    placeholder={`Tell us more about your ${serviceData?.title || 'service'} requirements...`}
                    value={bookingData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows="4"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Choose your {serviceData?.title || 'service'} professional
              </h3>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white border rounded-lg p-4 animate-pulse">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {workers.map((worker) => (
                    <div
                      key={worker._id}
                      className={`bg-white border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedWorker?._id === worker._id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedWorker(worker)}
                    >
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                          {worker.firstName?.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800">
                                {worker.firstName} {worker.lastName}
                              </h4>
                              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < Math.floor(worker.rating || 4.5)
                                          ? 'text-yellow-400 fill-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                  <span className="ml-1">{worker.rating || 4.5}</span>
                                </div>
                                <span>•</span>
                                <span>{worker.completedJobs || 0} jobs completed</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {worker.description || 'Experienced professional'}
                              </p>
                              <div className="flex gap-2 flex-wrap">
                                {worker.skills?.map((skill, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                                  >
                                    {skill}
                                  </span>
                                ))}
                                {worker.isVerified && (
                                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
                                    <Shield className="w-3 h-3" />
                                    Verified
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-orange-600">
                                ₹{worker.hourlyRate}/hr
                              </div>
                              <div className="text-sm text-gray-500">
                                {worker.experience}+ years exp
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                When do you need this done?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={bookingData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="18:00">6:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <h4 className="text-lg font-medium text-gray-800">Your Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={bookingData.userDetails.name}
                    onChange={(e) => handleInputChange('userDetails.name', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={bookingData.userDetails.phone}
                    onChange={(e) => handleInputChange('userDetails.phone', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={bookingData.userDetails.email}
                  onChange={(e) => handleInputChange('userDetails.email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Confirm your booking
              </h3>
              
              {/* Service Summary */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span className="font-medium text-gray-700">Service</span>
                  <span className="capitalize font-semibold">{serviceData?.title || 'Service'}</span>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span className="font-medium text-gray-700">Professional</span>
                  <div className="text-right">
                    <div className="font-semibold">
                      {selectedWorker?.firstName} {selectedWorker?.lastName}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      {selectedWorker?.rating || 4.5}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span className="font-medium text-gray-700">Date & Time</span>
                  <span className="font-semibold">
                    {new Date(bookingData.date).toLocaleDateString()} at {bookingData.time}
                  </span>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span className="font-medium text-gray-700">Address</span>
                  <span className="font-semibold text-right max-w-xs">{bookingData.address}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Estimated Cost</span>
                  <span className="text-xl font-bold text-orange-600">
                    ₹{selectedWorker?.hourlyRate * 2} (2 hrs estimate)
                  </span>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Your request will be sent to {selectedWorker?.firstName}. 
                  They will contact you to confirm the details and finalize the booking.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return bookingData.address && bookingData.description;
      case 2:
        return selectedWorker;
      case 3:
        return bookingData.date && bookingData.time && bookingData.userDetails.name && 
               bookingData.userDetails.phone;
      default:
        return true;
    }
  };

  // Early return after all hooks are called
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 capitalize">
              Book {serviceData?.title || 'Service'} Service
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* Step Indicator */}
          <div className="mt-4 flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id
                      ? 'bg-orange-500 border-orange-500 text-white'
                      : 'bg-white border-gray-300 text-gray-500'
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-20 h-0.5 mx-2 ${
                      currentStep > step.id ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-2 text-center">
            <span className="text-sm text-gray-600">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto max-h-96">
          {renderStepContent()}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex justify-between">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg font-medium ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            Previous
          </button>
          
          {currentStep < 4 ? (
            <button
              onClick={handleNextStep}
              disabled={!canProceedToNext()}
              className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
                canProceedToNext()
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={submitBooking}
              disabled={isLoading || !canProceedToNext()}
              className={`px-6 py-2 rounded-lg font-medium ${
                canProceedToNext() && !isLoading
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? 'Sending...' : 'Confirm Booking'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingSteps;