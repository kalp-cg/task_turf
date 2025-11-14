const express = require('express');
const { ObjectId } = require('mongodb');
const database = require('../utils/database');
const { validateObjectId } = require('../middleware/auth');

const router = express.Router();

// Get all workers
router.get('/', async (req, res) => {
  try {
    const db = database.getDb();
    const workersCollection = db.collection('workers');
    
    const { service, location, minRating, maxCharge, sortBy } = req.query;
    
    // Build query filter
    let filter = { isAvailable: true };
    
    if (service) {
      filter.skill = { $regex: service, $options: 'i' };
    }
    
    if (location) {
      filter.address = { $regex: location, $options: 'i' };
    }
    
    if (minRating) {
      filter.ratings = { $gte: parseFloat(minRating) };
    }
    
    if (maxCharge) {
      filter.charge = { $lte: parseInt(maxCharge) };
    }

    // Build sort options
    let sortOptions = {};
    switch (sortBy) {
      case 'rating':
        sortOptions = { ratings: -1 };
        break;
      case 'price_low':
        sortOptions = { charge: 1 };
        break;
      case 'price_high':
        sortOptions = { charge: -1 };
        break;
      case 'experience':
        sortOptions = { experience: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    const workers = await workersCollection
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
    const workersCollection = db.collection('workers');
    
    const worker = await workersCollection.findOne(
      { _id: new ObjectId(req.params.id) },
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
    const { location } = req.query;
    const db = database.getDb();
    const workersCollection = db.collection('workers');

    let filter = { 
      skill: { $regex: serviceType, $options: 'i' },
      isAvailable: true 
    };

    if (location) {
      filter.address = { $regex: location, $options: 'i' };
    }

    const workers = await workersCollection
      .find(filter, { projection: { password: 0 } })
      .sort({ ratings: -1, experience: -1 })
      .toArray();

    if (workers.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No workers found for service: ${serviceType}${location ? ` in ${location}` : ''}`
      });
    }

    res.status(200).json({
      success: true,
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
    const workersCollection = db.collection('workers');
    
    const allowedUpdates = ['firstname', 'lastname', 'phone', 'address', 'skill', 'experience', 'isAvailable'];
    const updates = {};
    
    // Filter allowed updates
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    // Recalculate charge and ratings if experience is updated
    if (updates.experience) {
      const experience = parseInt(updates.experience);
      updates.charge = experience >= 5 ? 1000 : experience >= 3 ? 800 : 600;
      updates.ratings = experience >= 5 ? 4.8 : experience >= 3 ? 4.5 : 4.2;
      updates.description = `${experience} years of experience in ${updates.skill || 'various services'}`;
    }

    updates.updatedAt = new Date();

    const result = await workersCollection.updateOne(
      { _id: new ObjectId(workerId) },
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
    const workersCollection = db.collection('workers');
    
    const { isAvailable } = req.body;

    const result = await workersCollection.updateOne(
      { _id: new ObjectId(workerId) },
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
