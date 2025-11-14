import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, MapPin, CreditCard, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-hot-toast';
import { 
  generateId, 
  focusManagement, 
  ariaAttributes, 
  handleKeyboardNavigation,
  announceToScreenReader,
  validationMessages
} from '../utils/accessibility';

const BookingModal = ({ isOpen, onClose, service }) => {
  const { addToCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  const [formData, setFormData] = useState({
    // Step 1: Service Details
    serviceType: '',
    urgency: 'standard',
    description: '',
    
    // Step 2: Schedule
    date: '',
    time: '',
    duration: '1-2 hours',
    
    // Step 3: Personal Info
    fullName: '',
    phone: '',
    email: '',
    address: '',
    instructions: '',
    
    // Step 4: Review
    agreedToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Accessibility setup
  const modalId = generateId('booking-modal');
  const titleId = generateId('modal-title');
  const descriptionId = generateId('modal-description');

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousFocusRef.current = document.activeElement;
      
      // Set up focus trap
      const cleanup = focusManagement.trapFocus(modalRef.current);
      
      // Focus first focusable element
      setTimeout(() => {
        focusManagement.focusFirst(modalRef.current);
        announceToScreenReader(`Booking modal opened for ${service?.name || 'service'}. Step ${currentStep} of 4.`);
      }, 100);
      
      return cleanup;
    } else if (previousFocusRef.current) {
      // Return focus when modal closes
      focusManagement.returnFocus(previousFocusRef.current);
    }
  }, [isOpen, service?.name, currentStep]);

  // Announce step changes to screen readers
  useEffect(() => {
    if (isOpen) {
      const stepNames = ['Service Selection', 'Schedule', 'Contact Information', 'Review & Confirm'];
      announceToScreenReader(`Step ${currentStep}: ${stepNames[currentStep - 1]}`);
    }
  }, [currentStep, isOpen]);

  const serviceTypes = {
    cleaning: [
      { value: 'regular', label: 'Regular Cleaning', price: 2000 },
      { value: 'deep', label: 'Deep Cleaning', price: 3500 },
      { value: 'move-out', label: 'Move Out Cleaning', price: 4000 },
      { value: 'office', label: 'Office Cleaning', price: 2500 }
    ],
    plumbing: [
      { value: 'leak-repair', label: 'Leak Repair', price: 1500 },
      { value: 'pipe-installation', label: 'Pipe Installation', price: 2500 },
      { value: 'drain-cleaning', label: 'Drain Cleaning', price: 1200 },
      { value: 'fixture-installation', label: 'Fixture Installation', price: 2000 }
    ],
    electrical: [
      { value: 'wiring', label: 'Wiring Work', price: 2000 },
      { value: 'switch-installation', label: 'Switch/Socket Installation', price: 800 },
      { value: 'fan-installation', label: 'Fan Installation', price: 1200 },
      { value: 'light-fixture', label: 'Light Fixture Installation', price: 1000 }
    ],
    babysitting: [
      { value: 'hourly', label: 'Hourly Babysitting', price: 300 },
      { value: 'overnight', label: 'Overnight Care', price: 2000 },
      { value: 'event', label: 'Event Babysitting', price: 1500 },
      { value: 'regular', label: 'Regular Care', price: 8000 }
    ],
    gardening: [
      { value: 'lawn-mowing', label: 'Lawn Mowing', price: 1000 },
      { value: 'landscaping', label: 'Landscaping', price: 5000 },
      { value: 'tree-trimming', label: 'Tree Trimming', price: 2500 },
      { value: 'plant-care', label: 'Plant Care', price: 1500 }
    ],
    cooking: [
      { value: 'daily-meals', label: 'Daily Meal Prep', price: 1500 },
      { value: 'party-catering', label: 'Party Catering', price: 5000 },
      { value: 'special-occasion', label: 'Special Occasion', price: 3000 },
      { value: 'weekly-prep', label: 'Weekly Meal Prep', price: 4000 }
    ],
    painting: [
      { value: 'interior', label: 'Interior Painting', price: 8000 },
      { value: 'exterior', label: 'Exterior Painting', price: 12000 },
      { value: 'touch-up', label: 'Touch Up Work', price: 2000 },
      { value: 'decorative', label: 'Decorative Painting', price: 6000 }
    ]
  };

  const urgencyOptions = [
    { value: 'urgent', label: 'Urgent (Within 24 hours)', multiplier: 1.5 },
    { value: 'standard', label: 'Standard (2-7 days)', multiplier: 1 },
    { value: 'flexible', label: 'Flexible (Within 2 weeks)', multiplier: 0.9 }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.serviceType) newErrors.serviceType = validationMessages.required('Service type');
      if (!formData.description.trim()) newErrors.description = validationMessages.required('Service description');
    }
    
    if (step === 2) {
      if (!formData.date) newErrors.date = validationMessages.required('Date');
      if (!formData.time) newErrors.time = validationMessages.required('Time');
    }
    
    if (step === 3) {
      if (!formData.fullName.trim()) newErrors.fullName = validationMessages.required('Full name');
      if (!formData.phone.trim()) newErrors.phone = validationMessages.required('Phone number');
      if (!formData.email.trim()) newErrors.email = validationMessages.required('Email');
      if (!formData.address.trim()) newErrors.address = validationMessages.required('Address');
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email && !emailRegex.test(formData.email)) {
        newErrors.email = validationMessages.email;
      }
      
      // Basic phone validation
      const phoneRegex = /^\+?[\d\s-()]+$/;
      if (formData.phone && !phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }
    
    if (step === 4) {
      if (!formData.agreedToTerms) newErrors.agreedToTerms = 'Please agree to terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const getSelectedService = () => {
    if (!service?.name || !formData.serviceType) return null;
    const serviceName = service.name.toLowerCase();
    const serviceOptions = serviceTypes[serviceName] || [];
    return serviceOptions.find(option => option.value === formData.serviceType);
  };

  const getSelectedUrgency = () => {
    return urgencyOptions.find(option => option.value === formData.urgency);
  };

  const calculateTotal = () => {
    const selectedService = getSelectedService();
    const selectedUrgency = getSelectedUrgency();
    
    if (!selectedService) return 0;
    
    const basePrice = selectedService.price;
    const urgencyMultiplier = selectedUrgency?.multiplier || 1;
    return Math.round(basePrice * urgencyMultiplier);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const selectedService = getSelectedService();
      const total = calculateTotal();
      
      // Add to cart
      addToCart({
        id: Date.now(),
        name: `${service.name} - ${selectedService.label}`,
        description: formData.description,
        price: total,
        category: service.name.toLowerCase(),
        serviceType: formData.serviceType,
        date: formData.date,
        time: formData.time,
        location: 'City Wide',
        duration: formData.duration,
        rating: 4.8
      });
      
      toast.success('Service booked successfully! Added to cart.', {
        duration: 4000
      });
      
      announceToScreenReader('Service booking completed successfully and added to cart');
      onClose();
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to book service. Please try again.');
      announceToScreenReader('Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    const stepHeadingId = generateId('step-heading');
    
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 id={stepHeadingId} className="text-2xl font-bold text-gray-800 mb-4">
              Service Details
            </h3>
            
            {/* Service Type Selection */}
            <fieldset className="space-y-3">
              <legend className="block text-sm font-medium text-gray-700 mb-3">
                Select Service Type *
              </legend>
              <div 
                className="grid grid-cols-1 gap-3"
                role="radiogroup" 
                aria-labelledby="service-type-legend"
                aria-required="true"
                aria-invalid={errors.serviceType ? 'true' : 'false'}
                aria-describedby={errors.serviceType ? 'service-type-error' : undefined}
              >
                {service?.name && serviceTypes[service.name.toLowerCase()]?.map((option) => {
                  const optionId = generateId(`service-${option.value}`);
                  return (
                    <label
                      key={option.value}
                      htmlFor={optionId}
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all focus-within:ring-4 focus-within:ring-[#F4A261] focus-within:ring-offset-2 ${
                        formData.serviceType === option.value
                          ? 'border-[#F4A261] bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          id={optionId}
                          type="radio"
                          name="serviceType"
                          value={option.value}
                          checked={formData.serviceType === option.value}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-[#F4A261] border-gray-300 focus:ring-[#F4A261] focus:ring-offset-0"
                          aria-describedby={`${optionId}-description`}
                        />
                        <div className="ml-3">
                          <span className="font-medium text-gray-800">{option.label}</span>
                          <div 
                            id={`${optionId}-description`} 
                            className="text-sm text-gray-600 sr-only"
                          >
                            {option.label} service for ₹{option.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <span className="font-bold text-[#F4A261]" aria-hidden="true">
                        ₹{option.price.toLocaleString()}
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.serviceType && (
                <p 
                  id="service-type-error"
                  className="text-red-600 text-sm mt-1" 
                  role="alert" 
                  aria-live="polite"
                >
                  {errors.serviceType}
                </p>
              )}
            </fieldset>

            {/* Urgency */}
            <div>
              <label 
                htmlFor="urgency-select"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Urgency
              </label>
              <select
                id="urgency-select"
                name="urgency"
                value={formData.urgency}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A261] focus:border-transparent focus:outline-none"
                aria-describedby="urgency-help"
              >
                {urgencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p id="urgency-help" className="text-sm text-gray-600 mt-1">
                Urgent requests may have additional charges
              </p>
            </div>

            {/* Description */}
            <div>
              <label 
                htmlFor="description-textarea"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Service Description *
              </label>
              <textarea
                id="description-textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Please describe your requirements in detail..."
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F4A261] focus:border-transparent focus:outline-none ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                aria-required="true"
                aria-invalid={errors.description ? 'true' : 'false'}
                aria-describedby={errors.description ? 'description-error' : 'description-help'}
                maxLength={500}
              />
              <div className="flex justify-between mt-1">
                <p id="description-help" className="text-sm text-gray-600">
                  Include specific requirements, room size, special instructions
                </p>
                <span 
                  className="text-sm text-gray-500"
                  aria-label={`${formData.description.length} of 500 characters used`}
                >
                  {formData.description.length}/500
                </span>
              </div>
              {errors.description && (
                <p 
                  id="description-error"
                  className="text-red-600 text-sm mt-1" 
                  role="alert" 
                  aria-live="polite"
                >
                  {errors.description}
                </p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 id={stepHeadingId} className="text-2xl font-bold text-gray-800 mb-4">
              Schedule Service
            </h3>
            
            {/* Date Selection */}
            <div>
              <label 
                htmlFor="date-input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <Calendar className="inline w-4 h-4 mr-2" aria-hidden="true" />
                Preferred Date *
              </label>
              <input
                id="date-input"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F4A261] focus:border-transparent focus:outline-none ${
                  errors.date ? 'border-red-300' : 'border-gray-300'
                }`}
                aria-required="true"
                aria-invalid={errors.date ? 'true' : 'false'}
                aria-describedby={errors.date ? 'date-error' : 'date-help'}
              />
              <p id="date-help" className="text-sm text-gray-600 mt-1">
                Select a date from today onwards
              </p>
              {errors.date && (
                <p 
                  id="date-error"
                  className="text-red-600 text-sm mt-1" 
                  role="alert" 
                  aria-live="polite"
                >
                  {errors.date}
                </p>
              )}
            </div>

            {/* Time Selection */}
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-3">
                <Clock className="inline w-4 h-4 mr-2" aria-hidden="true" />
                Preferred Time *
              </legend>
              <div 
                className="grid grid-cols-3 sm:grid-cols-5 gap-3"
                role="radiogroup"
                aria-labelledby="time-legend"
                aria-required="true"
                aria-invalid={errors.time ? 'true' : 'false'}
                aria-describedby={errors.time ? 'time-error' : 'time-help'}
              >
                {timeSlots.map((time) => {
                  const timeId = generateId(`time-${time}`);
                  return (
                    <label
                      key={time}
                      htmlFor={timeId}
                      className={`p-3 text-center border rounded-lg cursor-pointer transition-all focus-within:ring-4 focus-within:ring-[#F4A261] focus-within:ring-offset-2 ${
                        formData.time === time
                          ? 'border-[#F4A261] bg-orange-50 text-[#F4A261]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        id={timeId}
                        type="radio"
                        name="time"
                        value={time}
                        checked={formData.time === time}
                        onChange={handleInputChange}
                        className="sr-only"
                        aria-label={`Select ${time} as preferred time`}
                      />
                      <span aria-hidden="true">{time}</span>
                    </label>
                  );
                })}
              </div>
              <p id="time-help" className="text-sm text-gray-600 mt-2">
                Available time slots. Service duration may vary based on requirements.
              </p>
              {errors.time && (
                <p 
                  id="time-error"
                  className="text-red-600 text-sm mt-1" 
                  role="alert" 
                  aria-live="polite"
                >
                  {errors.time}
                </p>
              )}
            </fieldset>

            {/* Duration */}
            <div>
              <label 
                htmlFor="duration-select"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Expected Duration
              </label>
              <select
                id="duration-select"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A261] focus:border-transparent focus:outline-none"
                aria-describedby="duration-help"
              >
                <option value="1-2 hours">1-2 hours</option>
                <option value="2-4 hours">2-4 hours</option>
                <option value="4-6 hours">4-6 hours</option>
                <option value="Full day">Full day</option>
                <option value="Multiple days">Multiple days</option>
              </select>
              <p id="duration-help" className="text-sm text-gray-600 mt-1">
                Approximate time needed for the service
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 id={stepHeadingId} className="text-2xl font-bold text-gray-800 mb-4">
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label 
                  htmlFor="fullName-input"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <User className="inline w-4 h-4 mr-2" aria-hidden="true" />
                  Full Name *
                </label>
                <input
                  id="fullName-input"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F4A261] focus:border-transparent focus:outline-none ${
                    errors.fullName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  aria-required="true"
                  aria-invalid={errors.fullName ? 'true' : 'false'}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                />
                {errors.fullName && (
                  <p 
                    id="fullName-error"
                    className="text-red-600 text-sm mt-1" 
                    role="alert"
                  >
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label 
                  htmlFor="phone-input"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <Phone className="inline w-4 h-4 mr-2" aria-hidden="true" />
                  Phone Number *
                </label>
                <input
                  id="phone-input"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F4A261] focus:border-transparent focus:outline-none ${
                    errors.phone ? 'border-red-300' : 'border-gray-300'
                  }`}
                  aria-required="true"
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                  <p 
                    id="phone-error"
                    className="text-red-600 text-sm mt-1" 
                    role="alert"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label 
                htmlFor="email-input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <Mail className="inline w-4 h-4 mr-2" aria-hidden="true" />
                Email Address *
              </label>
              <input
                id="email-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F4A261] focus:border-transparent focus:outline-none ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                aria-required="true"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p 
                  id="email-error"
                  className="text-red-600 text-sm mt-1" 
                  role="alert"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label 
                htmlFor="address-textarea"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <MapPin className="inline w-4 h-4 mr-2" aria-hidden="true" />
                Service Address *
              </label>
              <textarea
                id="address-textarea"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                placeholder="Enter complete address where service is needed"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F4A261] focus:border-transparent focus:outline-none ${
                  errors.address ? 'border-red-300' : 'border-gray-300'
                }`}
                aria-required="true"
                aria-invalid={errors.address ? 'true' : 'false'}
                aria-describedby={errors.address ? 'address-error' : undefined}
              />
              {errors.address && (
                <p 
                  id="address-error"
                  className="text-red-600 text-sm mt-1" 
                  role="alert"
                >
                  {errors.address}
                </p>
              )}
            </div>

            {/* Special Instructions */}
            <div>
              <label 
                htmlFor="instructions-textarea"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Special Instructions (Optional)
              </label>
              <textarea
                id="instructions-textarea"
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                rows="2"
                placeholder="Any additional instructions for the service provider..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A261] focus:border-transparent focus:outline-none"
              />
            </div>
          </div>
        );

      case 4:
        const selectedService = getSelectedService();
        const total = calculateTotal();
        
        return (
          <div className="space-y-6">
            <h3 id={stepHeadingId} className="text-2xl font-bold text-gray-800 mb-4">
              Review & Confirm
            </h3>
            
            {/* Service Summary */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">Service Summary</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Service:</span>
                  <p className="text-gray-800">{service?.name} - {selectedService?.label}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Date & Time:</span>
                  <p className="text-gray-800">{formData.date} at {formData.time}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Duration:</span>
                  <p className="text-gray-800">{formData.duration}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Urgency:</span>
                  <p className="text-gray-800">{getSelectedUrgency()?.label}</p>
                </div>
              </div>
              
              <div>
                <span className="font-medium text-gray-600">Description:</span>
                <p className="text-gray-800 mt-1">{formData.description}</p>
              </div>
              
              <div>
                <span className="font-medium text-gray-600">Contact:</span>
                <p className="text-gray-800 mt-1">
                  {formData.fullName}<br />
                  {formData.phone} • {formData.email}
                </p>
              </div>
              
              <div>
                <span className="font-medium text-gray-600">Address:</span>
                <p className="text-gray-800 mt-1">{formData.address}</p>
              </div>
              
              {formData.instructions && (
                <div>
                  <span className="font-medium text-gray-600">Special Instructions:</span>
                  <p className="text-gray-800 mt-1">{formData.instructions}</p>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="border border-gray-200 rounded-lg p-6 space-y-3">
              <h4 className="text-lg font-semibold text-gray-800">Price Breakdown</h4>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Base Price:</span>
                <span className="text-gray-800">₹{selectedService?.price.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Urgency Modifier:</span>
                <span className="text-gray-800">{getSelectedUrgency()?.multiplier}x</span>
              </div>
              
              <hr />
              
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-800">Total:</span>
                <span className="text-[#F4A261]">₹{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <input
                  id="terms-checkbox"
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#F4A261] border-gray-300 rounded focus:ring-[#F4A261] mt-1"
                  aria-required="true"
                  aria-invalid={errors.agreedToTerms ? 'true' : 'false'}
                  aria-describedby={errors.agreedToTerms ? 'terms-error' : undefined}
                />
                <label htmlFor="terms-checkbox" className="text-sm text-gray-700 leading-5">
                  I agree to the{' '}
                  <button 
                    type="button"
                    className="text-[#F4A261] hover:underline focus:underline focus:outline-none"
                    onClick={() => {/* Open terms modal */}}
                  >
                    Terms and Conditions
                  </button>{' '}
                  and{' '}
                  <button 
                    type="button"
                    className="text-[#F4A261] hover:underline focus:underline focus:outline-none"
                    onClick={() => {/* Open privacy modal */}}
                  >
                    Privacy Policy
                  </button>
                  . I understand that payment will be processed upon service completion.
                </label>
              </div>
              {errors.agreedToTerms && (
                <p 
                  id="terms-error"
                  className="text-red-600 text-sm mt-2" 
                  role="alert"
                >
                  {errors.agreedToTerms}
                </p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        role="presentation"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          ref={modalRef}
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          {...ariaAttributes.modal(titleId, descriptionId)}
          id={modalId}
          onKeyDown={(e) => handleKeyboardNavigation(e, null, onClose)}
        >
          {/* Header */}
          <header className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 
                id={titleId} 
                className="text-2xl font-bold text-gray-800"
              >
                Book {service?.name}
              </h2>
              <div 
                id={descriptionId}
                className="flex items-center mt-1"
              >
                <Star 
                  className="w-4 h-4 text-yellow-400 fill-current mr-1" 
                  aria-hidden="true"
                />
                <span className="text-sm text-gray-600">
                  4.8 rating • Trusted professionals
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-[#F4A261] focus:ring-offset-2"
              aria-label="Close booking modal"
              type="button"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </header>

          {/* Progress Bar */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div 
              className="flex items-center justify-between mb-2"
              role="progressbar"
              aria-valuenow={currentStep}
              aria-valuemin={1}
              aria-valuemax={4}
              aria-label={`Booking progress: Step ${currentStep} of 4`}
            >
              {[1, 2, 3, 4].map((step) => {
                const stepNames = ['Service Selection', 'Schedule', 'Contact Information', 'Review & Confirm'];
                const isCompleted = currentStep > step;
                const isCurrent = currentStep === step;
                
                return (
                  <div
                    key={step}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step
                        ? 'bg-[#F4A261] text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                    role="img"
                    aria-label={`Step ${step}: ${stepNames[step - 1]} ${
                      isCompleted ? '(completed)' : isCurrent ? '(current)' : '(pending)'
                    }`}
                  >
                    {step}
                  </div>
                );
              })}
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2" role="presentation">
              <div
                className="bg-[#F4A261] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
                role="presentation"
              ></div>
            </div>
          </div>

          {/* Content */}
          <main 
            className="p-6 overflow-y-auto" 
            style={{ maxHeight: 'calc(90vh - 200px)' }}
            role="main"
            aria-live="polite"
            aria-label="Booking form content"
          >
            {renderStep()}
          </main>

          {/* Footer */}
          <footer className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-4 focus:ring-offset-2 ${
                currentStep === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed focus:ring-gray-300'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400'
              }`}
              aria-label={`Go to previous step${currentStep === 1 ? ' (disabled)' : ''}`}
              type="button"
            >
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-gradient-to-r from-[#F4A261] to-[#E76F51] text-white rounded-lg font-medium hover:shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-[#F4A261] focus:ring-offset-2"
                aria-label="Go to next step"
                type="button"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-8 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-4 focus:ring-offset-2 ${
                  isSubmitting
                    ? 'bg-gray-400 text-white cursor-not-allowed focus:ring-gray-300'
                    : 'bg-gradient-to-r from-[#F4A261] to-[#E76F51] text-white hover:shadow-lg focus:ring-[#F4A261]'
                }`}
                aria-label={isSubmitting ? 'Booking in progress' : 'Confirm booking and add to cart'}
                type="submit"
                {...ariaAttributes.button(false, false, 'booking-form')}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div 
                      className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                      aria-hidden="true"
                    ></div>
                    <span>Booking...</span>
                    <span className="sr-only">Please wait, booking is being processed</span>
                  </div>
                ) : (
                  <>
                    <CreditCard className="inline w-4 h-4 mr-2" aria-hidden="true" />
                    Confirm Booking
                  </>
                )}
              </button>
            )}
          </footer>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;