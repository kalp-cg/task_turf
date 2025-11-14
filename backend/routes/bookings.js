const express = require('express');
const { ObjectId } = require('mongodb');
const database = require('../utils/database');
const { validateObjectId } = require('../middleware/auth');
const { validateBooking, validateBookingUpdate } = require('../middleware/validation');

const router = express.Router();

// Create new booking (User only) - Enhanced for frontend modal
router.post('/', validateBooking, async (req, res) => {
  try {
    const { 
      userId = new ObjectId(), // Default to new ObjectId if not provided
      serviceId,
      workerId,
      serviceType, 
      urgency = 'standard',
      description,
      scheduledDate,
      scheduledTime,
      duration,
      contactInfo,
      serviceAddress,
      specialInstructions
    } = req.body;

    const db = database.getDb();
    const bookingsCollection = db.collection('bookings');
    const workersCollection = db.collection('workers');
    const servicesCollection = db.collection('services');

    // Get service details for pricing
    let basePrice = 0;
    let serviceName = serviceType;
    
    if (serviceId) {
      const service = await servicesCollection.findOne({ _id: new ObjectId(serviceId) });
      if (service) {
        basePrice = service.basePrice;
        serviceName = service.name;
      }
    }

    // Verify worker if specified
    let assignedWorker = null;
    if (workerId) {
      assignedWorker = await workersCollection.findOne({ 
        _id: new ObjectId(workerId), 
        isAvailable: true 
      });

      if (!assignedWorker) {
        return res.status(404).json({
          success: false,
          message: 'Selected worker not found or not available'
        });
      }
      
      // Use worker's charge if no service price
      if (!basePrice) {
        basePrice = assignedWorker.charge;
      }
    }

    // Calculate total amount based on urgency
    const urgencyMultipliers = {
      'urgent': 1.5,
      'standard': 1.0,
      'flexible': 0.9
    };
    
    const finalAmount = Math.round(basePrice * (urgencyMultipliers[urgency] || 1.0));

    // Create booking
    const newBooking = {
      userId: userId ? new ObjectId(userId) : new ObjectId(),
      serviceId: serviceId ? new ObjectId(serviceId) : null,
      workerId: workerId ? new ObjectId(workerId) : null,
      
      // Service details
      serviceName,
      serviceType,
      urgency,
      description: description || '',
      
      // Scheduling
      scheduledDate: new Date(scheduledDate),
      scheduledTime,
      duration: duration || '1-2 hours',
      
      // Contact and location
      contactInfo: {
        name: contactInfo?.name || 'Anonymous User',
        email: contactInfo?.email || 'user@example.com',
        phone: contactInfo?.phone || '',
      },
      serviceAddress,
      specialInstructions: specialInstructions || '',
      
      // Pricing
      basePrice,
      urgencyMultiplier: urgencyMultipliers[urgency],
      finalAmount,
      
      // Status tracking
      status: workerId ? 'pending' : 'looking_for_worker', // pending, accepted, rejected, completed, cancelled, looking_for_worker
      paymentStatus: 'pending', // pending, paid, refunded
      
      // Timestamps
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await bookingsCollection.insertOne(newBooking);

    // If worker is assigned, send notification (placeholder)
    if (assignedWorker) {
      // TODO: Implement push notification/email to worker
      console.log(`Booking request sent to worker: ${assignedWorker.email}`);
    }

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      bookingId: result.insertedId,
      booking: {
        ...newBooking,
        _id: result.insertedId
      }
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking'
    });
  }
});

// Get user's bookings with detailed information
router.get('/user/:userId', async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const { userId } = req.params;
    const db = database.getDb();
    const bookingsCollection = db.collection('bookings');
    
    let matchFilter = { userId: new ObjectId(userId) };
    if (status) {
      matchFilter.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const bookings = await bookingsCollection.aggregate([
      { $match: matchFilter },
      {
        $lookup: {
          from: 'workers',
          localField: 'workerId',
          foreignField: '_id',
          as: 'worker',
          pipeline: [
            { $project: { password: 0 } }
          ]
        }
      },
      {
        $lookup: {
          from: 'services',
          localField: 'serviceId',
          foreignField: '_id',
          as: 'service'
        }
      },
      {
        $addFields: {
          worker: { $arrayElemAt: ['$worker', 0] },
          service: { $arrayElemAt: ['$service', 0] }
        }
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: parseInt(limit) }
    ]).toArray();

    const total = await bookingsCollection.countDocuments(matchFilter);

    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      bookings
    });

  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings'
    });
  }
});

// Get worker's bookings with user details
router.get('/worker/:workerId', async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const { workerId } = req.params;
    const db = database.getDb();
    const bookingsCollection = db.collection('bookings');
    
    let matchFilter = { workerId: new ObjectId(workerId) };
    if (status) {
      matchFilter.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const bookings = await bookingsCollection.aggregate([
      { $match: matchFilter },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
          pipeline: [
            { $project: { password: 0 } }
          ]
        }
      },
      {
        $lookup: {
          from: 'services',
          localField: 'serviceId',
          foreignField: '_id',
          as: 'service'
        }
      },
      {
        $addFields: {
          user: { $arrayElemAt: ['$user', 0] },
          service: { $arrayElemAt: ['$service', 0] }
        }
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: parseInt(limit) }
    ]).toArray();

    const total = await bookingsCollection.countDocuments(matchFilter);

    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      bookings
    });

  } catch (error) {
    console.error('Error fetching worker bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings'
    });
  }
});

// Get specific booking details
router.get('/:id', validateObjectId('id'), async (req, res) => {
  try {
    const db = database.getDb();
    const bookingsCollection = db.collection('bookings');
    
    const booking = await bookingsCollection.aggregate([
      { 
        $match: { 
          _id: new ObjectId(req.params.id)
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
          pipeline: [{ $project: { password: 0 } }]
        }
      },
      {
        $lookup: {
          from: 'workers',
          localField: 'workerId',
          foreignField: '_id',
          as: 'worker',
          pipeline: [{ $project: { password: 0 } }]
        }
      },
      {
        $lookup: {
          from: 'services',
          localField: 'serviceId',
          foreignField: '_id',
          as: 'service'
        }
      },
      {
        $addFields: {
          user: { $arrayElemAt: ['$user', 0] },
          worker: { $arrayElemAt: ['$worker', 0] },
          service: { $arrayElemAt: ['$service', 0] }
        }
      }
    ]).toArray();

    if (booking.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      booking: booking[0]
    });

  } catch (error) {
    console.error('Error fetching booking details:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching booking details'
    });
  }
});

// Update booking status (Worker only)
router.patch('/:id/status', validateObjectId('id'), async (req, res) => {
  try {
    const { status, estimatedCompletionTime, notes, workerId } = req.body;
    const validStatuses = ['accepted', 'rejected', 'in_progress', 'completed'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: accepted, rejected, in_progress, or completed'
      });
    }

    const db = database.getDb();
    const bookingsCollection = db.collection('bookings');
    const workersCollection = db.collection('workers');
    
    // Prepare update object
    let updateObject = {
      status,
      updatedAt: new Date()
    };

    // Add status-specific fields
    if (status === 'accepted') {
      updateObject.acceptedAt = new Date();
      if (estimatedCompletionTime) {
        updateObject.estimatedCompletionTime = new Date(estimatedCompletionTime);
      }
    } else if (status === 'in_progress') {
      updateObject.startedAt = new Date();
    } else if (status === 'completed') {
      updateObject.completedAt = new Date();
      updateObject.paymentStatus = 'pending_payment';
    } else if (status === 'rejected') {
      updateObject.rejectedAt = new Date();
      updateObject.workerId = null; // Remove worker assignment
    }

    if (notes) {
      updateObject.workerNotes = notes;
    }

    const result = await bookingsCollection.updateOne(
      { 
        _id: new ObjectId(req.params.id),
        workerId: workerId ? new ObjectId(workerId) : { $exists: true }
      },
      { $set: updateObject }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found or unauthorized'
      });
    }

    // Update worker statistics if completed
    if (status === 'completed' && workerId) {
      await workersCollection.updateOne(
        { _id: new ObjectId(workerId) },
        { 
          $inc: { 
            completedJobs: 1,
            totalEarnings: updateObject.finalAmount || 0
          }
        }
      );
    }

    res.status(200).json({
      success: true,
      message: `Booking ${status} successfully`
    });

  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating booking status'
    });
  }
});

// Update booking details (User only, before accepted)
router.put('/:id', validateObjectId('id'), validateBookingUpdate, async (req, res) => {
  try {
    const allowedUpdates = [
      'scheduledDate', 'scheduledTime', 'duration', 'description', 
      'serviceAddress', 'specialInstructions', 'contactInfo', 'urgency', 'userId'
    ];
    
    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key) && req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid updates provided'
      });
    }

    const db = database.getDb();
    const bookingsCollection = db.collection('bookings');

    // Recalculate amount if urgency changed
    if (updates.urgency) {
      const urgencyMultipliers = {
        'urgent': 1.5,
        'standard': 1.0,
        'flexible': 0.9
      };
      
      const booking = await bookingsCollection.findOne({ _id: new ObjectId(req.params.id) });
      if (booking) {
        updates.finalAmount = Math.round(booking.basePrice * urgencyMultipliers[updates.urgency]);
        updates.urgencyMultiplier = urgencyMultipliers[updates.urgency];
      }
    }

    updates.updatedAt = new Date();

    const result = await bookingsCollection.updateOne(
      { 
        _id: new ObjectId(req.params.id),
        status: { $in: ['pending', 'looking_for_worker'] }
      },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found, unauthorized, or cannot be modified'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully'
    });

  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating booking'
    });
  }
});

// Cancel booking (User only)
router.patch('/:id/cancel', validateObjectId('id'), async (req, res) => {
  try {
    const { reason, userId } = req.body;
    const db = database.getDb();
    const bookingsCollection = db.collection('bookings');
    
    const result = await bookingsCollection.updateOne(
      { 
        _id: new ObjectId(req.params.id),
        status: { $in: ['pending', 'accepted', 'looking_for_worker'] }
      },
      { 
        $set: { 
          status: 'cancelled',
          cancellationReason: reason || '',
          updatedAt: new Date(),
          cancelledAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found, unauthorized, or cannot be cancelled'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully'
    });

  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling booking'
    });
  }
});

// Get booking statistics for users/workers
router.get('/stats/dashboard/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { userType = 'user' } = req.query; // 'user' or 'worker'
    const db = database.getDb();
    const bookingsCollection = db.collection('bookings');
    const userObjectId = new ObjectId(userId);
    const isWorker = userType === 'worker';
    
    const matchField = isWorker ? 'workerId' : 'userId';
    const stats = await bookingsCollection.aggregate([
      { $match: { [matchField]: userObjectId } },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          completedBookings: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
          pendingBookings: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
          cancelledBookings: { $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] } },
          totalSpent: isWorker ? { $sum: 0 } : { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, '$finalAmount', 0] } },
          totalEarned: isWorker ? { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, '$finalAmount', 0] } } : { $sum: 0 }
        }
      }
    ]).toArray();

    const dashboardStats = stats[0] || {
      totalBookings: 0,
      completedBookings: 0,
      pendingBookings: 0,
      cancelledBookings: 0,
      totalSpent: 0,
      totalEarned: 0
    };

    res.status(200).json({
      success: true,
      stats: dashboardStats
    });

  } catch (error) {
    console.error('Error fetching booking stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics'
    });
  }
});

module.exports = router;
