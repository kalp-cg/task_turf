const { body, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('🚨 Validation errors:', errors.array());
    console.log('📝 Request body received:', req.body);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User registration validation
const validateUserRegistration = [
  body('firstname').trim().notEmpty().withMessage('First name is required'),
  body('lastname').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').matches(/^\+?[\d\s\-\(\)]{10,}$/).withMessage('Valid phone number is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  handleValidationErrors
];

// Worker registration validation
const validateWorkerRegistration = [
  body('firstname').trim().notEmpty().withMessage('First name is required'),
  body('lastname').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').matches(/^\+?[\d\s\-\(\)]{10,}$/).withMessage('Valid phone number is required'),
  body('skill').trim().notEmpty().withMessage('Skill is required'),
  body('experience').isInt({ min: 0 }).withMessage('Valid experience years required'),
  body('bio').optional().trim().isLength({ max: 500 }).withMessage('Bio must be under 500 characters'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  handleValidationErrors
];

// Profile update validation
const validateProfileUpdate = [
  body('firstname').optional().trim().isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
  body('lastname').optional().trim().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
  body('phone').optional().matches(/^\+?[\d\s\-\(\)]{10,}$/).withMessage('Valid phone number is required'),
  body('address.street').optional().trim().notEmpty().withMessage('Street address cannot be empty'),
  body('address.city').optional().trim().notEmpty().withMessage('City cannot be empty'),
  body('address.state').optional().trim().notEmpty().withMessage('State cannot be empty'),
  body('address.zipcode').optional().trim().isLength({ min: 5, max: 6 }).withMessage('Valid zipcode is required'),
  body('skill').optional().trim().notEmpty().withMessage('Skill cannot be empty'),
  body('experience').optional().isInt({ min: 0 }).withMessage('Valid experience years required'),
  body('bio').optional().trim().isLength({ max: 500 }).withMessage('Bio must be under 500 characters'),
  body('profilePhoto').optional().isURL().withMessage('Profile photo must be a valid URL'),
  body('isAvailable').optional().isBoolean().withMessage('Availability must be true or false'),
  handleValidationErrors
];

// Password change validation
const validatePasswordChange = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error('Password confirmation does not match new password');
    }
    return true;
  }),
  handleValidationErrors
];

// Login validation
const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors
];

// Booking validation
// Booking validation
const validateBooking = [
  body('serviceType').trim().isLength({ min: 2 }).withMessage('Service type is required'),
  body('serviceAddress').optional().trim().isLength({ min: 5 }).withMessage('Service address is required'),
  body('scheduledDate').isISO8601().withMessage('Valid date is required'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description too long'),
  handleValidationErrors
];

// Booking update validation
const validateBookingUpdate = [
  body('scheduledDate').optional().isISO8601().withMessage('Valid date is required'),
  body('scheduledTime').optional().trim().notEmpty().withMessage('Scheduled time cannot be empty'),
  body('duration').optional().trim().notEmpty().withMessage('Duration cannot be empty'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description too long'),
  body('serviceAddress').optional().trim().isLength({ min: 5 }).withMessage('Service address too short'),
  body('specialInstructions').optional().trim().isLength({ max: 1000 }).withMessage('Special instructions too long'),
  body('contactInfo.phone').optional().matches(/^\+?[\d\s\-\(\)]{10,}$/).withMessage('Valid phone number is required'),
  body('contactInfo.email').optional().isEmail().withMessage('Valid email is required'),
  body('contactInfo.name').optional().trim().isLength({ min: 2 }).withMessage('Contact name must be at least 2 characters'),
  body('urgency').optional().isIn(['urgent', 'standard', 'flexible']).withMessage('Invalid urgency level'),
  handleValidationErrors
];

module.exports = {
  validateUserRegistration,
  validateWorkerRegistration,
  validateLogin,
  validateBooking,
  validateBookingUpdate,
  handleValidationErrors,
  validateProfileUpdate,
  validatePasswordChange
};
