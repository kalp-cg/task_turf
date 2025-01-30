const express = require('express');
const { body } = require('express-validator');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// Validation middleware
const validateBooking = [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('workerId').notEmpty().withMessage('Worker ID is required'),
  body('scheduledDate').isISO8601().withMessage('Valid date is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('urgency').isIn(['low', 'medium', 'high']).optional()
];

// Routes
router.post('/', validateBooking, bookingController.createBooking);
router.get('/upcoming', bookingController.getUpcomingBookings);
router.get('/completed', bookingController.getCompletedBookings);
router.get('/pending', bookingController.getPendingBookings);
router.get('/user/:userId', bookingController.getUserBookings);
router.get('/worker/:workerId', bookingController.getWorkerBookings);
router.patch('/:id/status', bookingController.updateBookingStatus);
router.post('/bulk', bookingController.createBulkBookings);
router.delete('/completed', bookingController.deleteCompletedBookings);
router.post('/:id/reschedule', bookingController.rescheduleBooking);
router.get('/', bookingController.getSortedBookings);

module.exports = router;