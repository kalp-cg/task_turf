const express = require('express');
const { ObjectId } = require('mongodb');
const database = require('../utils/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// ========================================
// USER DASHBOARD ROUTES
// ========================================

/**
 * @route GET /api/dashboard/user
 * @desc Get user dashboard data
 * @access Private (User only)
 */
router.get('/user', authenticateToken, authorizeRoles('user'), async (req, res) => {
  try {
    const db = database.getDb();
    const userId = new ObjectId(req.user._id);

    // Get user's bookings
    const bookings = await db.collection('bookings').find({ 
      userId: userId 
    }).sort({ createdAt: -1 }).limit(5).toArray();

    // Get user's favorite workers
    const user = await db.collection('users').findOne({ _id: userId });
    const favoriteWorkers = user?.favoriteWorkers || [];

    // Get recent services
    const recentServices = await db.collection('services').find({ 
      isActive: true 
    }).sort({ popularity: -1 }).limit(6).toArray();

    // Calculate user stats
    const totalBookings = await db.collection('bookings').countDocuments({ userId });
    const completedBookings = await db.collection('bookings').countDocuments({ 
      userId, 
      status: 'completed' 
    });
    const pendingBookings = await db.collection('bookings').countDocuments({ 
      userId, 
      status: { $in: ['pending', 'confirmed'] }
    });

    res.status(200).json({
      success: true,
      data: {
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          addresses: user.addresses || [],
          profileImage: user.profileImage
        },
        stats: {
          totalBookings,
          completedBookings,
          pendingBookings,
          favoriteWorkers: favoriteWorkers.length
        },
        recentBookings: bookings,
        favoriteWorkers,
        recommendedServices: recentServices
      }
    });

  } catch (error) {
    console.error('User dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading user dashboard'
    });
  }
});

/**
 * @route GET /api/dashboard/user/bookings
 * @desc Get user's all bookings with pagination
 * @access Private (User only)
 */
router.get('/user/bookings', authenticateToken, authorizeRoles('user'), async (req, res) => {
  try {
    const db = database.getDb();
    const userId = new ObjectId(req.user._id);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;

    let filter = { userId };
    if (status && status !== 'all') {
      filter.status = status;
    }

    const bookings = await db.collection('bookings')
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const total = await db.collection('bookings').countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        bookings,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('User bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading user bookings'
    });
  }
});

// ========================================
// WORKER DASHBOARD ROUTES
// ========================================

/**
 * @route GET /api/dashboard/worker
 * @desc Get worker dashboard data
 * @access Private (Worker only)
 */
router.get('/worker', authenticateToken, authorizeRoles('worker'), async (req, res) => {
  try {
    const db = database.getDb();
    const workerId = new ObjectId(req.user._id);

    // Get worker's job requests
    const jobRequests = await db.collection('bookings').find({ 
      workerId: workerId 
    }).sort({ createdAt: -1 }).limit(5).toArray();

    // Get worker profile
    const worker = await db.collection('users').findOne({ _id: workerId });

    // Calculate worker stats
    const totalJobs = await db.collection('bookings').countDocuments({ workerId });
    const completedJobs = await db.collection('bookings').countDocuments({ 
      workerId, 
      status: 'completed' 
    });
    const pendingJobs = await db.collection('bookings').countDocuments({ 
      workerId, 
      status: { $in: ['pending', 'confirmed'] }
    });

    // Calculate earnings this month
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const monthlyEarnings = await db.collection('bookings').aggregate([
      {
        $match: {
          workerId: workerId,
          status: 'completed',
          completedAt: { $gte: startOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: '$price' }
        }
      }
    ]).toArray();

    const thisMonthEarnings = monthlyEarnings.length > 0 ? monthlyEarnings[0].totalEarnings : 0;

    // Get work history
    const workHistory = worker.workHistory || [];

    res.status(200).json({
      success: true,
      data: {
        worker: {
          _id: worker._id,
          firstName: worker.firstName,
          lastName: worker.lastName,
          email: worker.email,
          phone: worker.phone,
          skills: worker.skills || [],
          experience: worker.experience,
          hourlyRate: worker.hourlyRate,
          rating: worker.rating,
          isAvailable: worker.isAvailable,
          profileImage: worker.profileImage,
          bio: worker.bio
        },
        stats: {
          totalJobs,
          completedJobs,
          pendingJobs,
          thisMonthEarnings,
          averageRating: worker.rating || 0,
          workHistoryCount: workHistory.length
        },
        recentJobs: jobRequests,
        availability: worker.availability || {},
        workHistory: workHistory.slice(0, 5) // Last 5 work entries
      }
    });

  } catch (error) {
    console.error('Worker dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading worker dashboard'
    });
  }
});

/**
 * @route GET /api/dashboard/worker/jobs
 * @desc Get worker's all job requests with pagination
 * @access Private (Worker only)
 */
router.get('/worker/jobs', authenticateToken, authorizeRoles('worker'), async (req, res) => {
  try {
    const db = database.getDb();
    const workerId = new ObjectId(req.user._id);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;

    let filter = { workerId };
    if (status && status !== 'all') {
      filter.status = status;
    }

    const jobs = await db.collection('bookings')
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const total = await db.collection('bookings').countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        jobs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Worker jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading worker jobs'
    });
  }
});

/**
 * @route POST /api/dashboard/worker/jobs/:jobId/accept
 * @desc Accept a job request
 * @access Private (Worker only)
 */
router.post('/worker/jobs/:jobId/accept', authenticateToken, authorizeRoles('worker'), async (req, res) => {
  try {
    const db = database.getDb();
    const jobId = new ObjectId(req.params.jobId);
    const workerId = new ObjectId(req.user._id);

    const result = await db.collection('bookings').updateOne(
      { 
        _id: jobId, 
        workerId: workerId,
        status: 'pending'
      },
      { 
        $set: { 
          status: 'confirmed',
          confirmedAt: new Date(),
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Job not found or already processed'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job accepted successfully'
    });

  } catch (error) {
    console.error('Accept job error:', error);
    res.status(500).json({
      success: false,
      message: 'Error accepting job'
    });
  }
});

/**
 * @route POST /api/dashboard/worker/jobs/:jobId/complete
 * @desc Mark a job as completed
 * @access Private (Worker only)
 */
router.post('/worker/jobs/:jobId/complete', authenticateToken, authorizeRoles('worker'), async (req, res) => {
  try {
    const db = database.getDb();
    const jobId = new ObjectId(req.params.jobId);
    const workerId = new ObjectId(req.user._id);
    const { notes } = req.body;

    const job = await db.collection('bookings').findOne({
      _id: jobId,
      workerId: workerId,
      status: 'confirmed'
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found or cannot be completed'
      });
    }

    const result = await db.collection('bookings').updateOne(
      { _id: jobId },
      { 
        $set: { 
          status: 'completed',
          completedAt: new Date(),
          completionNotes: notes,
          updatedAt: new Date()
        }
      }
    );

    // Add to worker's work history
    await db.collection('users').updateOne(
      { _id: workerId },
      {
        $push: {
          workHistory: {
            jobId: jobId,
            clientName: job.userName,
            serviceType: job.serviceType,
            description: job.description,
            completedDate: new Date(),
            duration: job.duration || 1,
            earnings: job.price,
            location: job.address,
            notes: notes
          }
        },
        $inc: { completedJobs: 1 }
      }
    );

    res.status(200).json({
      success: true,
      message: 'Job completed successfully'
    });

  } catch (error) {
    console.error('Complete job error:', error);
    res.status(500).json({
      success: false,
      message: 'Error completing job'
    });
  }
});

// ========================================
// ADMIN DASHBOARD ROUTES
// ========================================

/**
 * @route GET /api/dashboard/admin
 * @desc Get admin dashboard data
 * @access Private (Admin only)
 */
router.get('/admin', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const db = database.getDb();

    // Get platform statistics
    const totalUsers = await db.collection('users').countDocuments({ role: 'user' });
    const totalWorkers = await db.collection('users').countDocuments({ role: 'worker' });
    const totalBookings = await db.collection('bookings').countDocuments();
    const activeBookings = await db.collection('bookings').countDocuments({ 
      status: { $in: ['pending', 'confirmed'] }
    });

    // Get recent activities
    const recentUsers = await db.collection('users').find({ role: 'user' })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    const recentWorkers = await db.collection('users').find({ role: 'worker' })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    const recentBookings = await db.collection('bookings').find()
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    // Calculate revenue (this month)
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const monthlyRevenue = await db.collection('bookings').aggregate([
      {
        $match: {
          status: 'completed',
          completedAt: { $gte: startOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$price' }
        }
      }
    ]).toArray();

    const thisMonthRevenue = monthlyRevenue.length > 0 ? monthlyRevenue[0].totalRevenue : 0;

    // Get pending worker applications
    const pendingWorkers = await db.collection('users').find({
      role: 'worker',
      isVerified: false
    }).toArray();

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalWorkers,
          totalBookings,
          activeBookings,
          thisMonthRevenue,
          pendingWorkers: pendingWorkers.length
        },
        recentActivities: {
          newUsers: recentUsers,
          newWorkers: recentWorkers,
          recentBookings
        },
        pendingApprovals: pendingWorkers
      }
    });

  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading admin dashboard'
    });
  }
});

/**
 * @route GET /api/dashboard/admin/users
 * @desc Get all users with pagination and filters
 * @access Private (Admin only)
 */
router.get('/admin/users', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const db = database.getDb();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const role = req.query.role;
    const search = req.query.search;

    let filter = {};
    if (role && role !== 'all') {
      filter.role = role;
    }
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await db.collection('users')
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const total = await db.collection('users').countDocuments(filter);

    // Remove password from response
    const safeUsers = users.map(user => {
      const { password, ...safeUser } = user;
      return safeUser;
    });

    res.status(200).json({
      success: true,
      data: {
        users: safeUsers,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Admin users list error:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading users list'
    });
  }
});

/**
 * @route PUT /api/dashboard/admin/workers/:workerId/verify
 * @desc Verify/approve a worker
 * @access Private (Admin only)
 */
router.put('/admin/workers/:workerId/verify', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const db = database.getDb();
    const workerId = new ObjectId(req.params.workerId);

    const result = await db.collection('users').updateOne(
      { _id: workerId, role: 'worker' },
      { 
        $set: { 
          isVerified: true,
          verifiedAt: new Date(),
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Worker not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Worker verified successfully'
    });

  } catch (error) {
    console.error('Verify worker error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying worker'
    });
  }
});

/**
 * @route DELETE /api/dashboard/admin/users/:userId
 * @desc Delete a user (Admin only)
 * @access Private (Admin only)
 */
router.delete('/admin/users/:userId', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const db = database.getDb();
    const userId = new ObjectId(req.params.userId);

    const result = await db.collection('users').deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user'
    });
  }
});

module.exports = router;