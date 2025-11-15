const express = require('express');
const { ObjectId } = require('mongodb');
const database = require('../utils/database');
const { validateObjectId } = require('../middleware/auth');
const { validateBooking, validateBookingUpdate } = require('../middleware/validation');

const router = express.Router();

// Create new booking from frontend (simplified flow)
router.post('/frontend', async (req, res) => {
  try {
    const { 
      service,
      address,
      date,
      time,
      description,
      userDetails,
      workerId,
      estimatedCost
    } = req.body;

    const db = database.getDb();
    const bookingsCollection = db.collection('bookings');
    const usersCollection = db.collection('users');
    const notificationsCollection = db.collection('notifications');

    // Verify worker exists and is available
    const worker = await usersCollection.findOne({ 
      _id: new ObjectId(workerId), 
      role: 'worker',
      isAvailable: { $ne: false }
    });

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: 'Worker not found or not available'
      });
    }

    // Create booking
    const newBooking = {
      service,
      serviceType: service,
      workerId: new ObjectId(workerId),
      workerName: `${worker.firstName} ${worker.lastName}`,
      
      // User details
      userDetails: {
        name: userDetails.name,
        phone: userDetails.phone,
        email: userDetails.email
      },
      
      // Booking details
      address,
      date: new Date(date),
      time,
      description,
      estimatedCost: estimatedCost || worker.hourlyRate * 2,
      
      // Status
      status: 'pending', // Waiting for worker to accept/reject
      paymentStatus: 'pending',
      
      // Timestamps
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await bookingsCollection.insertOne(newBooking);

    // Create notification for worker
    const notification = {
      recipientId: new ObjectId(workerId),
      type: 'booking_request',
      title: `New ${service} booking request`,
      message: `You have a new booking request from ${userDetails.name}`,
      data: {
        bookingId: result.insertedId,
        service,
        address,
        date,
        time,
        customerName: userDetails.name,
        customerPhone: userDetails.phone,
        estimatedCost: newBooking.estimatedCost
      },
      isRead: false,
      createdAt: new Date()
    };

    await notificationsCollection.insertOne(notification);

    res.status(201).json({
      success: true,
      message: 'Booking request sent successfully! The worker will be notified.',
      bookingId: result.insertedId,
      data: newBooking
    });

  } catch (error) {
    console.error('Frontend booking creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking request'
    });
  }
});

// Create new booking (User only) - Enhanced for frontend modal
router.post('/', validateBooking, async (req, res) => {
  try {
    const { 
      userId,
      serviceType, 
      description,
      preferredDate,
      budget,
      location,
      urgency = 'standard',
      workerId // Optional: if user selects a specific worker
    } = req.body;

    const db = database.getDb();
    const bookingsCollection = db.collection('bookings');
    const usersCollection = db.collection('users');

    // Verify user exists
    if (userId) {
      const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
    }

    // Find available workers for the service type
    let assignedWorkerId = null;
    let estimatedPrice = parseInt(budget) || 500;

    if (workerId) {
      // User selected specific worker
      const selectedWorker = await usersCollection.findOne({ 
        _id: new ObjectId(workerId), 
        role: 'worker',
        isAvailable: { $ne: false },
        skills: { $regex: serviceType, $options: 'i' }
      });

      if (!selectedWorker) {
        return res.status(404).json({
          success: false,
          message: 'Selected worker not found or not available for this service'
        });
      }
      
      assignedWorkerId = new ObjectId(workerId);
      estimatedPrice = selectedWorker.hourlyRate || estimatedPrice;
    } else {
      // Auto-assign best available worker
      const availableWorkers = await usersCollection
        .find({ 
          role: 'worker',
          skills: { $regex: serviceType, $options: 'i' },
          isAvailable: { $ne: false },
          hourlyRate: { $lte: estimatedPrice * 1.2 } // Within budget range
        })
        .sort({ rating: -1, experience: -1 })
        .limit(1)
        .toArray();

      if (availableWorkers.length > 0) {
        assignedWorkerId = availableWorkers[0]._id;
        estimatedPrice = availableWorkers[0].hourlyRate;
      }
    }

    // Create booking
    const newBooking = {
      userId: userId ? new ObjectId(userId) : null,
      workerId: assignedWorkerId,
      
      // Service details
      serviceType,
      description: description || '',
      urgency,
      
      // Scheduling
      preferredDate: new Date(preferredDate),
      scheduledDate: new Date(preferredDate),
      
      // Location and pricing
      location: location || 'Not specified',
      estimatedPrice,
      finalAmount: estimatedPrice,
      budget: parseInt(budget) || estimatedPrice,
      
      // Status and timestamps
      status: assignedWorkerId ? 'pending' : 'looking_for_worker',
      paymentStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      
      // Additional info
      customerNotes: description,
      isUrgent: urgency === 'urgent'
    };

    const result = await bookingsCollection.insertOne(newBooking);

    // Respond with booking details
    const responseData = {
      bookingId: result.insertedId,
      ...newBooking,
      workerAssigned: !!assignedWorkerId,
      message: assignedWorkerId ? 'Booking created and worker assigned' : 'Booking created, looking for available worker'
    };

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: responseData
    });

  } catch (error) {
    console.error('Booking creation error:', error);
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

// Worker response to booking request (accept/reject)
router.patch('/:bookingId/respond', validateObjectId('bookingId'), async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { action, workerId, message } = req.body; // action: 'accept' or 'reject'

    if (!['accept', 'reject'].includes(action)) {
      return res.status(400).json({
        success: false,
        message: 'Action must be either "accept" or "reject"'
      });
    }

    const db = database.getDb();
    const bookingsCollection = db.collection('bookings');
    const notificationsCollection = db.collection('notifications');

    // Get the booking
    const booking = await bookingsCollection.findOne({
      _id: new ObjectId(bookingId),
      workerId: new ObjectId(workerId),
      status: 'pending'
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found or already responded to'
      });
    }

    let updateData = {
      status: action === 'accept' ? 'accepted' : 'rejected',
      workerResponse: {
        action,
        message: message || '',
        respondedAt: new Date()
      },
      updatedAt: new Date()
    };

    if (action === 'accept') {
      updateData.acceptedAt = new Date();
    } else {
      updateData.rejectedAt = new Date();
    }

    // Update booking status
    await bookingsCollection.updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: updateData }
    );

    // Mark the notification as read
    await notificationsCollection.updateOne(
      { 
        'data.bookingId': new ObjectId(bookingId),
        recipientId: new ObjectId(workerId)
      },
      { 
        $set: { 
          isRead: true, 
          readAt: new Date() 
        } 
      }
    );

    // Create notification for customer (if we have customer contact)
    if (booking.userDetails && booking.userDetails.email) {
      const customerNotification = {
        type: 'booking_response',
        title: action === 'accept' ? 'Booking Accepted!' : 'Booking Declined',
        message: action === 'accept' 
          ? `${booking.workerName} has accepted your booking request!`
          : `${booking.workerName} has declined your booking request.`,
        data: {
          bookingId: booking._id,
          action,
          workerMessage: message,
          service: booking.service
        },
        customerEmail: booking.userDetails.email,
        customerPhone: booking.userDetails.phone,
        isRead: false,
        createdAt: new Date()
      };

      await notificationsCollection.insertOne(customerNotification);
    }

    res.status(200).json({
      success: true,
      message: `Booking ${action}ed successfully`,
      booking: {
        id: booking._id,
        status: updateData.status,
        customerName: booking.userDetails?.name,
        service: booking.service,
        date: booking.date,
        time: booking.time
      }
    });

  } catch (error) {
    console.error('Error responding to booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing booking response'
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
