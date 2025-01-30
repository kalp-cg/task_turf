const Booking = require('../models/Booking');
const { validationResult } = require('express-validator');

exports.createBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUpcomingBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      scheduledDate: { $gt: new Date() },
      status: { $ne: 'completed' }
    }).sort({ scheduledDate: 1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompletedBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ status: 'completed' })
      .sort({ updatedAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPendingBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ status: 'pending' })
      .sort({ scheduledDate: 1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .sort({ scheduledDate: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWorkerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ workerId: req.params.workerId })
      .sort({ scheduledDate: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBulkBookings = async (req, res) => {
  try {
    const bookings = await Booking.insertMany(req.body);
    res.status(201).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCompletedBookings = async (req, res) => {
  try {
    const result = await Booking.deleteMany({ status: 'completed' });
    res.json({ message: `Deleted ${result.deletedCount} completed bookings` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.rescheduleBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { scheduledDate: req.body.scheduledDate },
      { new: true, runValidators: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSortedBookings = async (req, res) => {
  try {
    const { sort = 'scheduledDate', order = 'desc' } = req.query;
    const sortOrder = order === 'desc' ? -1 : 1;
    const bookings = await Booking.find()
      .sort({ [sort]: sortOrder });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};