const express = require('express');
const { ObjectId } = require('mongodb');
const database = require('../utils/database');
const { validateObjectId } = require('../middleware/auth');

const router = express.Router();

// Get all workers
router.get('/', async (req, res) => {
  try {
    const db = database.getDb();
    const usersCollection = db.collection('users');
    
    const { service, location, minRating, maxCharge, sortBy } = req.query;
    
    // Build query filter - get users with role 'worker'
    let filter = { 
      role: 'worker', 
      isAvailable: { $ne: false } // Include workers where isAvailable is not explicitly false
    };
    
    if (service) {
      filter.skills = { $regex: service, $options: 'i' };
    }
    
    if (location) {
      filter.address = { $regex: location, $options: 'i' };
    }
    
    if (minRating) {
      filter.rating = { $gte: parseFloat(minRating) };
    }
    
    if (maxCharge) {
      filter.hourlyRate = { $lte: parseInt(maxCharge) };
    }

    // Build sort options
    let sortOptions = {};
    switch (sortBy) {
      case 'rating':
        sortOptions = { rating: -1 };
        break;
      case 'price_low':
        sortOptions = { hourlyRate: 1 };
        break;
      case 'price_high':
        sortOptions = { hourlyRate: -1 };
        break;
      case 'experience':
        sortOptions = { experience: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    const workers = await usersCollection
      .find(filter, { projection: { password: 0 } })
      .sort(sortOptions)
      .toArray();

    res.status(200).json({
      success: true,
      count: workers.length,
      workers
    });

  } catch (error) {
    console.error('Error fetching workers:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching workers'
    });
  }
});

// Get worker by ID
router.get('/:id', validateObjectId('id'), async (req, res) => {
  try {
    const db = database.getDb();
    const usersCollection = db.collection('users');
    
    const worker = await usersCollection.findOne(
      { 
        _id: new ObjectId(req.params.id),
        role: 'worker'
      },
      { projection: { password: 0 } }
    );

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: 'Worker not found'
      });
    }

    res.status(200).json({
      success: true,
      worker
    });

  } catch (error) {
    console.error('Error fetching worker:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching worker details'
    });
  }
});

// Get workers by service type
router.get('/service/:serviceType', async (req, res) => {
  try {
    const { serviceType } = req.params;
    const { location, sortBy, minRating, maxPrice, date, time } = req.query;
    const db = database.getDb();
    const usersCollection = db.collection('users');
    const bookingsCollection = db.collection('bookings');

    let filter = { 
      role: 'worker',
      skills: { $regex: serviceType, $options: 'i' },
      isAvailable: { $ne: false }
    };

    if (location) {
      filter.address = { $regex: location, $options: 'i' };
    }

    if (minRating) {
      filter.rating = { $gte: parseFloat(minRating) };
    }

    if (maxPrice) {
      filter.hourlyRate = { $lte: parseInt(maxPrice) };
    }

    // If date and time provided, exclude workers who already have bookings at that slot
    if (date && time) {
      try {
        // Find bookings on the given date with matching time and active status
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        const conflictedBookings = await bookingsCollection.find({
          date: { $gte: start, $lte: end },
          time: time,
          status: { $in: ['pending', 'accepted', 'in_progress'] },
          workerId: { $exists: true, $ne: null }
        }, { projection: { workerId: 1 } }).toArray();

        const conflictedWorkerIds = conflictedBookings
          .map(b => b.workerId)
          .filter(Boolean)
          .map(id => (typeof id === 'object' && id._bsontype === 'ObjectID') ? id : new ObjectId(id));

        if (conflictedWorkerIds.length > 0) {
          filter._id = { $nin: conflictedWorkerIds };
        }
      } catch (err) {
        console.error('Error checking worker schedule conflicts:', err);
        // don't fail the whole request, just proceed without conflict filtering
      }
    }

    // Build sort options
    let sortOptions = {};
    switch (sortBy) {
      case 'rating':
        sortOptions = { rating: -1, experience: -1 };
        break;
      case 'price_low':
        sortOptions = { hourlyRate: 1 };
        break;
      case 'price_high':
        sortOptions = { hourlyRate: -1 };
        break;
      case 'experience':
        sortOptions = { experience: -1, rating: -1 };
        break;
      default:
        sortOptions = { rating: -1, experience: -1 };
    }

    const workers = await usersCollection
      .find(filter, { projection: { password: 0 } })
      .sort(sortOptions)
      .toArray();

    if (workers.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No workers found for service: ${serviceType}${location ? ` in ${location}` : ''}`,
        workers: []
      });
    }

    res.status(200).json({
      success: true,
      serviceType,
      count: workers.length,
      workers
    });

  } catch (error) {
    console.error('Error fetching workers by service:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching workers by service'
    });
  }
});

// Update worker profile
router.put('/profile/:workerId', async (req, res) => {
  try {
    const { workerId } = req.params;
    const db = database.getDb();
    const usersCollection = db.collection('users');
    
    const allowedUpdates = ['firstName', 'lastName', 'phone', 'address', 'skills', 'experience', 'isAvailable', 'hourlyRate'];
    const updates = {};
    
    // Filter allowed updates
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    // Update rating based on experience if experience is updated
    if (updates.experience) {
      const experience = parseInt(updates.experience);
      updates.rating = experience >= 7 ? 4.8 : experience >= 4 ? 4.5 : 4.2;
      updates.description = `${experience} years of experience in ${Array.isArray(updates.skills) ? updates.skills.join(', ') : 'various services'}`;
    }

    updates.updatedAt = new Date();

    const result = await usersCollection.updateOne(
      { 
        _id: new ObjectId(workerId),
        role: 'worker'
      },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Worker not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully'
    });

  } catch (error) {
    console.error('Error updating worker profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile'
    });
  }
});

// Toggle worker availability
router.patch('/availability/:workerId', async (req, res) => {
  try {
    const { workerId } = req.params;
    const db = database.getDb();
    const usersCollection = db.collection('users');
    
    const { isAvailable } = req.body;

    const result = await usersCollection.updateOne(
      { 
        _id: new ObjectId(workerId),
        role: 'worker'
      },
      { 
        $set: { 
          isAvailable: Boolean(isAvailable),
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
      message: `Availability ${isAvailable ? 'enabled' : 'disabled'} successfully`
    });

  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating availability'
    });
  }
});

// Get worker statistics
router.get('/stats/dashboard/:workerId', async (req, res) => {
  try {
    const { workerId } = req.params;
    const db = database.getDb();
    const bookingsCollection = db.collection('bookings');
    const workerObjectId = new ObjectId(workerId);

    // Get worker stats
    const stats = await bookingsCollection.aggregate([
      { $match: { workerId: workerObjectId } },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          completedJobs: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
          totalEarnings: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, '$finalAmount', 0] } },
          pendingJobs: { $sum: { $cond: [{ $eq: ['$status', 'accepted'] }, 1, 0] } }
        }
      }
    ]).toArray();

    const workerStats = stats[0] || {
      totalBookings: 0,
      completedJobs: 0,
      totalEarnings: 0,
      pendingJobs: 0
    };

    res.status(200).json({
      success: true,
      stats: workerStats
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
