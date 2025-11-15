import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, MapPin, CreditCard, Star, ChevronRight, MapPinIcon, Users, Award, Shield, Clock3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ServiceBookingModal = ({ isOpen, onClose, serviceType }) => {
  const { user } = useAuth();
  const [currentStage, setCurrentStage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [availableWorkers, setAvailableWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  
  const [formData, setFormData] = useState({
    // Stage 1: Location & Details
    location: '',
    description: '',
    urgency: 'standard',
    budget: '',
    
    // Stage 2: Worker & Schedule
    workerId: '',
    preferredDate: '',
    preferredTime: '',
    additionalNotes: '',
    
    // Stage 3: Contact & Payment
    contactNumber: user?.phone || '',
    address: '',
    paymentMethod: 'cash'
  });
  
  const [bookingId, setBookingId] = useState(null);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const urgencyOptions = [
    { value: 'urgent', label: 'Urgent (Same day)', color: 'text-red-600', multiplier: 1.5 },
    { value: 'standard', label: 'Standard (2-3 days)', color: 'text-blue-600', multiplier: 1.0 },
    { value: 'flexible', label: 'Flexible (1 week)', color: 'text-green-600', multiplier: 0.9 }
  ];

  // Fetch available workers when moving to stage 2
  useEffect(() => {
    if (currentStage === 2 && serviceType && formData.location) {
      fetchAvailableWorkers();
    }
  }, [currentStage, serviceType, formData.location]);

  const fetchAvailableWorkers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/services/${serviceType}/workers`,
        {
          params: {
            location: formData.location,
            maxPrice: formData.budget ? parseInt(formData.budget) : undefined
          }
        }
      );
      setAvailableWorkers(response.data.workers || []);
    } catch (error) {
      console.error('Error fetching workers:', error);
      toast.error('Failed to load available workers');
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const selectWorker = (worker) => {
    setSelectedWorker(worker);
    setFormData(prev => ({
      ...prev,
      workerId: worker._id
    }));
  };

  const handleStageSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/services/${serviceType}/book`,
        {
          stage: currentStage,
          bookingData: {
            ...formData,
            userId: user?._id,
            bookingId: currentStage > 1 ? bookingId : undefined
          }
        }
      );

      if (currentStage === 1) {
        setBookingId(response.data.bookingId);
        setCurrentStage(2);
      } else if (currentStage === 2) {
        // Send notification to worker
        await axios.post(`${API_BASE_URL}/api/notifications/booking-request`, {
          bookingId: bookingId,
          workerId: selectedWorker._id,
          customerName: user?.firstName + ' ' + user?.lastName || 'Customer',
          serviceType,
          location: formData.location,
          preferredDate: formData.preferredDate
        });
        setCurrentStage(3);
      } else if (currentStage === 3) {
        toast.success('Booking confirmed! Worker has been notified.');
        onClose();
      }
    } catch (error) {
      console.error('Error submitting stage:', error);
      toast.error('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const renderStage1 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Service Details</h3>
        <p className="text-white/80">Tell us about your {serviceType} needs</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-white font-medium mb-2">
            <MapPinIcon className="inline w-5 h-5 mr-2" />
            Your Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Enter your city or area"
            className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-white/60 border border-white/30 focus:border-white/60 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Service Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder={`Describe your ${serviceType} requirements...`}
            rows={3}
            className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-white/60 border border-white/30 focus:border-white/60 focus:outline-none resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Budget Range</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 focus:border-white/60 focus:outline-none"
          >
            <option value="">Any budget</option>
            <option value="500">Under ₹500</option>
            <option value="1000">Under ₹1,000</option>
            <option value="2000">Under ₹2,000</option>
            <option value="5000">Under ₹5,000</option>
            <option value="10000">Under ₹10,000</option>
          </select>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Urgency</label>
          <div className="space-y-2">
            {urgencyOptions.map(option => (
              <label key={option.value} className="flex items-center p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 cursor-pointer">
                <input
                  type="radio"
                  name="urgency"
                  value={option.value}
                  checked={formData.urgency === option.value}
                  onChange={handleInputChange}
                  className="mr-3"
                />
                <span className="text-white font-medium">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderStage2 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Choose Your Professional</h3>
        <p className="text-white/80">Select from available {serviceType} specialists</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {availableWorkers.map((worker) => (
            <motion.div
              key={worker._id}
              whileHover={{ scale: 1.02 }}
              onClick={() => selectWorker(worker)}
              className={`p-4 rounded-lg backdrop-blur-md border cursor-pointer transition-all ${
                selectedWorker?._id === worker._id
                  ? 'bg-white/30 border-white/60'
                  : 'bg-white/10 border-white/20 hover:border-white/40'
              }`}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={worker.profileImage || `https://ui-avatars.com/api/?name=${worker.firstName}+${worker.lastName}&background=random`}
                  alt={`${worker.firstName} ${worker.lastName}`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-white font-bold text-lg">
                    {worker.firstName} {worker.lastName}
                  </h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white/90 ml-1">{worker.rating}</span>
                    </div>
                    <span className="text-white/70">
                      {worker.experience} years exp
                    </span>
                    <span className="text-white font-medium">
                      ₹{worker.hourlyRate}/hour
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {worker.badges?.map(badge => (
                      <span key={badge} className="px-2 py-1 bg-white/20 text-white text-xs rounded-full">
                        {badge}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center mt-2 text-white/70 text-sm">
                    <Clock3 className="w-4 h-4 mr-1" />
                    Responds in {worker.responseTime}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedWorker && (
        <div className="space-y-4 mt-6">
          <div>
            <label className="block text-white font-medium mb-2">
              <Calendar className="inline w-5 h-5 mr-2" />
              Preferred Date *
            </label>
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 focus:border-white/60 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              <Clock className="inline w-5 h-5 mr-2" />
              Preferred Time *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map(time => (
                <label
                  key={time}
                  className={`p-2 text-center rounded-lg cursor-pointer transition-all ${
                    formData.preferredTime === time
                      ? 'bg-white/30 border-white/60'
                      : 'bg-white/10 border-white/20 hover:border-white/40'
                  } border`}
                >
                  <input
                    type="radio"
                    name="preferredTime"
                    value={time}
                    checked={formData.preferredTime === time}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className="text-white">{time}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Additional Notes</label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleInputChange}
              placeholder="Any specific requirements or instructions..."
              rows={2}
              className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-white/60 border border-white/30 focus:border-white/60 focus:outline-none resize-none"
            />
          </div>
        </div>
      )}
    </motion.div>
  );

  const renderStage3 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Confirm Your Booking</h3>
        <p className="text-white/80">Review details and confirm</p>
      </div>

      {selectedWorker && (
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 border border-white/30">
          <h4 className="text-white font-bold mb-2">Selected Professional</h4>
          <div className="flex items-center space-x-3">
            <img
              src={selectedWorker.profileImage || `https://ui-avatars.com/api/?name=${selectedWorker.firstName}+${selectedWorker.lastName}&background=random`}
              alt={`${selectedWorker.firstName} ${selectedWorker.lastName}`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-white font-medium">{selectedWorker.firstName} {selectedWorker.lastName}</p>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white/90 ml-1">{selectedWorker.rating}</span>
                <span className="text-white/70 ml-2">₹{selectedWorker.hourlyRate}/hour</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-white font-medium mb-2">
            <Phone className="inline w-5 h-5 mr-2" />
            Contact Number *
          </label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            placeholder="Your phone number"
            className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-white/60 border border-white/30 focus:border-white/60 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            <MapPin className="inline w-5 h-5 mr-2" />
            Complete Address *
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Full address where service is needed..."
            rows={3}
            className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-white/60 border border-white/30 focus:border-white/60 focus:outline-none resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Payment Method</label>
          <div className="space-y-2">
            <label className="flex items-center p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={formData.paymentMethod === 'cash'}
                onChange={handleInputChange}
                className="mr-3"
              />
              <span className="text-white">Cash on Service</span>
            </label>
            <label className="flex items-center p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="online"
                checked={formData.paymentMethod === 'online'}
                onChange={handleInputChange}
                className="mr-3"
              />
              <span className="text-white">Online Payment</span>
            </label>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 border border-white/30">
          <h4 className="text-white font-bold mb-2">Booking Summary</h4>
          <div className="space-y-2 text-white/90">
            <p><span className="font-medium">Service:</span> {serviceType}</p>
            <p><span className="font-medium">Date:</span> {formData.preferredDate}</p>
            <p><span className="font-medium">Time:</span> {formData.preferredTime}</p>
            <p><span className="font-medium">Location:</span> {formData.location}</p>
            {selectedWorker && (
              <p><span className="font-medium">Rate:</span> ₹{selectedWorker.hourlyRate}/hour</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const canProceed = () => {
    if (currentStage === 1) {
      return formData.location && formData.description;
    }
    if (currentStage === 2) {
      return selectedWorker && formData.preferredDate && formData.preferredTime;
    }
    if (currentStage === 3) {
      return formData.contactNumber && formData.address;
    }
    return false;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Glassmorphism Background */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30 backdrop-blur-xl"
          onClick={onClose}
        />
        
        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <div>
              <h2 className="text-3xl font-bold text-white capitalize">
                Book {serviceType} Service
              </h2>
              <div className="flex items-center mt-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-2 rounded-full mr-2 transition-all ${
                      i < currentStage ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-96">
            <AnimatePresence mode="wait">
              {currentStage === 1 && renderStage1()}
              {currentStage === 2 && renderStage2()}
              {currentStage === 3 && renderStage3()}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/20 flex justify-between">
            <button
              onClick={() => setCurrentStage(currentStage - 1)}
              disabled={currentStage === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                currentStage === 1
                  ? 'bg-white/10 text-white/50 cursor-not-allowed'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Previous
            </button>
            
            <button
              onClick={handleStageSubmit}
              disabled={!canProceed() || loading}
              className={`px-8 py-3 rounded-lg font-medium transition-all flex items-center ${
                canProceed() && !loading
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
                  : 'bg-white/10 text-white/50 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
              ) : (
                <ChevronRight className="w-5 h-5 mr-2" />
              )}
              {currentStage === 3 ? 'Confirm Booking' : 'Continue'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ServiceBookingModal;