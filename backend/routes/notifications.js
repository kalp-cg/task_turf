const express = require('express');
const { ObjectId } = require('mongodb');
const database = require('../utils/database');
const { validateObjectId } = require('../middleware/auth');

const router = express.Router();

// Get notifications for a user (worker or customer) - Updated for new structure
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { type, page = 1, limit = 20 } = req.query;
    
    const db = database.getDb();
    const notificationsCollection = db.collection('notifications');

    let filter = { recipientId: new ObjectId(userId) };
    
    if (type) {
      filter.type = type;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const notifications = await notificationsCollection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    const unreadCount = await notificationsCollection.countDocuments({
      recipientId: new ObjectId(userId),
      isRead: false
    });

    res.status(200).json({
      success: true,
      notifications,
      unreadCount,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: await notificationsCollection.countDocuments(filter)
      }
    });

  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching notifications'
    });
  }
});

// Create a new notification
router.post('/', async (req, res) => {
  try {
    const { 
      userId, 
      type, 
      title, 
      message, 
      data = {},
      priority = 'medium'
    } = req.body;

    const db = database.getDb();
    const notificationsCollection = db.collection('notifications');

    const notification = {
      userId: new ObjectId(userId),
      type,
      title,
      message,
      data,
      priority,
      status: 'unread',
      createdAt: new Date()
    };

    const result = await notificationsCollection.insertOne(notification);

    // In a real app, you'd send push notifications here
    console.log(`📱 Notification sent to user ${userId}: ${title}`);

    res.status(201).json({
      success: true,
      message: 'Notification created',
      notificationId: result.insertedId
    });

  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating notification'
    });
  }
});

// Mark notification as read
router.patch('/:notificationId/read', validateObjectId('notificationId'), async (req, res) => {
  try {
    const { notificationId } = req.params;
    const db = database.getDb();
    const notificationsCollection = db.collection('notifications');

    const result = await notificationsCollection.updateOne(
      { _id: new ObjectId(notificationId) },
      { 
        $set: { 
          status: 'read', 
          readAt: new Date() 
        } 
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Notification marked as read'
    });

  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating notification'
    });
  }
});

// Mark all notifications as read for a user
router.patch('/user/:userId/read-all', async (req, res) => {
  try {
    const { userId } = req.params;
    const db = database.getDb();
    const notificationsCollection = db.collection('notifications');

    const result = await notificationsCollection.updateMany(
      { 
        userId: new ObjectId(userId),
        status: 'unread'
      },
      { 
        $set: { 
          status: 'read', 
          readAt: new Date() 
        } 
      }
    );

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} notifications marked as read`
    });

  } catch (error) {
    console.error('Error updating notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating notifications'
    });
  }
});

// Send booking notification to worker
router.post('/booking-request', async (req, res) => {
  try {
    const { bookingId, workerId, customerName, serviceType, location, preferredDate } = req.body;
    
    const db = database.getDb();
    const notificationsCollection = db.collection('notifications');

    const notification = {
      userId: new ObjectId(workerId),
      type: 'booking_request',
      title: 'New Booking Request',
      message: `${customerName} has requested ${serviceType} service in ${location}`,
      data: {
        bookingId,
        customerName,
        serviceType,
        location,
        preferredDate,
        action: 'respond_to_booking'
      },
      priority: 'high',
      status: 'unread',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    };

    const result = await notificationsCollection.insertOne(notification);

    // Simulate real-time notification (in real app, use WebSocket or push notifications)
    console.log(`🔔 New booking request sent to worker ${workerId}`);

    res.status(201).json({
      success: true,
      message: 'Booking request notification sent',
      notificationId: result.insertedId
    });

  } catch (error) {
    console.error('Error sending booking notification:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending notification'
    });
  }
});

// Get pending booking requests for a worker
router.get('/worker/:workerId/pending-requests', async (req, res) => {
  try {
    const { workerId } = req.params;
    const db = database.getDb();
    const notificationsCollection = db.collection('notifications');
    const bookingsCollection = db.collection('bookings');

    // Get pending booking notifications
    const notifications = await notificationsCollection
      .find({ 
        recipientId: new ObjectId(workerId),
        type: 'booking_request',
        isRead: false
      })
      .sort({ createdAt: -1 })
      .toArray();

    // Get full booking details for each notification
    const pendingRequests = await Promise.all(
      notifications.map(async (notification) => {
        const booking = await bookingsCollection.findOne({
          _id: new ObjectId(notification.data.bookingId)
        });
        
        return {
          notificationId: notification._id,
          booking,
          requestedAt: notification.createdAt,
          expiresAt: notification.expiresAt
        };
      })
    );

    res.status(200).json({
      success: true,
      count: pendingRequests.length,
      pendingRequests: pendingRequests.filter(req => req.booking) // Only return valid bookings
    });

  } catch (error) {
    console.error('Error fetching pending requests:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching pending requests'
    });
  }
});

// Worker dashboard stats
router.get('/worker/:workerId/stats', validateObjectId('workerId'), async (req, res) => {
  try {
    const { workerId } = req.params;
    const db = database.getDb();
    const bookingsCollection = db.collection('bookings');
    const notificationsCollection = db.collection('notifications');
    const workerObjectId = new ObjectId(workerId);

    // Get booking stats
    const bookingStats = await bookingsCollection.aggregate([
      { $match: { workerId: workerObjectId } },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          pendingBookings: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
          acceptedBookings: { $sum: { $cond: [{ $eq: ['$status', 'accepted'] }, 1, 0] } },
          completedBookings: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
          rejectedBookings: { $sum: { $cond: [{ $eq: ['$status', 'rejected'] }, 1, 0] } },
          totalEarnings: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, '$estimatedCost', 0] } }
        }
      }
    ]).toArray();

    // Get unread notifications count
    const unreadNotifications = await notificationsCollection.countDocuments({
      recipientId: workerObjectId,
      isRead: false
    });

    const stats = bookingStats[0] || {
      totalBookings: 0,
      pendingBookings: 0,
      acceptedBookings: 0,
      completedBookings: 0,
      rejectedBookings: 0,
      totalEarnings: 0
    };

    res.status(200).json({
      success: true,
      stats: {
        ...stats,
        unreadNotifications
      }
    });

  } catch (error) {
    console.error('Error fetching worker stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics'
    });
  }
});

module.exports = router;