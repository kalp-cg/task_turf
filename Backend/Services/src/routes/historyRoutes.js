const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Get user history
router.get('/user', async (req, res) => {
  try {
    const history = await Booking.find({ client: req.user.id })
      .populate('service')
      .sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({
      error: {
        message: error.message,
        status: 500
      }
    });
  }
});

// Get provider history
router.get('/provider', async (req, res) => {
  try {
    const history = await Booking.find({ provider: req.user.id })
      .populate('service')
      .sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({
      error: {
        message: error.message,
        status: 500
      }
    });
  }
});

module.exports = router;