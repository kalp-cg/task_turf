const express = require('express');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const database = require('../utils/database');
const { authenticateToken, validateObjectId } = require('../middleware/auth');
const { validateProfileUpdate, validatePasswordChange } = require('../middleware/validation');

const router = express.Router();

// Get current user profile (Enhanced)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const db = database.getDb();
    const collection = req.user.role === 'user' ? 'users' : 'workers';
    
    const user = await db.collection(collection).findOne(
      { _id: new ObjectId(req.user.userId) },
      { projection: { password: 0 } }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get additional stats for workers
    if (req.user.role === 'worker') {
      const bookingsCollection = db.collection('bookings');
      const stats = await bookingsCollection.aggregate([
        { $match: { workerId: new ObjectId(req.user.userId) } },
        {
          $group: {
            _id: null,
            totalBookings: { $sum: 1 },
            completedJobs: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
            totalEarnings: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, '$finalAmount', 0] } },
            averageRating: { $avg: '$rating' }
          }
        }
      ]).toArray();

      user.stats = stats[0] || {
        totalBookings: 0,
        completedJobs: 0,
        totalEarnings: 0,
        averageRating: 0
      };
    }

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile'
    });
  }
});

// Update user profile
router.put('/', authenticateToken, validateProfileUpdate, async (req, res) => {
  try {
    const db = database.getDb();
    const collection = req.user.role === 'user' ? 'users' : 'workers';
    
    // Define allowed fields for different user types
    const userAllowedFields = ['firstname', 'lastname', 'phone', 'address', 'profilePhoto'];
    const workerAllowedFields = [...userAllowedFields, 'skill', 'experience', 'bio', 'isAvailable'];
    
    const allowedFields = req.user.role === 'worker' ? workerAllowedFields : userAllowedFields;
    
    // Filter and validate updates
    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key) && req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid updates provided'
      });
    }

    // Special handling for workers
    if (req.user.role === 'worker' && updates.experience) {
      const experience = parseInt(updates.experience);
      updates.charge = experience >= 5 ? 1000 : experience >= 3 ? 800 : 600;
      updates.description = `${experience} years of experience in ${updates.skill || 'various services'}`;
    }

    updates.updatedAt = new Date();

    const result = await db.collection(collection).updateOne(
      { _id: new ObjectId(req.user.userId) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      updatedFields: Object.keys(updates)
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile'
    });
  }
});

// Update profile photo
router.patch('/photo', authenticateToken, async (req, res) => {
  try {
    const { profilePhoto } = req.body;

    if (!profilePhoto) {
      return res.status(400).json({
        success: false,
        message: 'Profile photo URL is required'
      });
    }

    const db = database.getDb();
    const collection = req.user.role === 'user' ? 'users' : 'workers';
    
    const result = await db.collection(collection).updateOne(
      { _id: new ObjectId(req.user.userId) },
      { 
        $set: { 
          profilePhoto,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile photo updated successfully'
    });

  } catch (error) {
    console.error('Error updating profile photo:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile photo'
    });
  }
});

// Change password
router.patch('/password', authenticateToken, validatePasswordChange, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const db = database.getDb();
    const collection = req.user.role === 'user' ? 'users' : 'workers';
    
    // Get current user with password
    const user = await db.collection(collection).findOne({ _id: new ObjectId(req.user.userId) });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    const result = await db.collection(collection).updateOne(
      { _id: new ObjectId(req.user.userId) },
      { 
        $set: { 
          password: hashedNewPassword,
          passwordUpdatedAt: new Date(),
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Failed to update password'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating password'
    });
  }
});

// Delete account
router.delete('/', authenticateToken, async (req, res) => {
  try {
    const { confirmPassword } = req.body;

    if (!confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Password confirmation is required to delete account'
      });
    }

    const db = database.getDb();
    const collection = req.user.role === 'user' ? 'users' : 'workers';
    
    // Get current user with password
    const user = await db.collection(collection).findOne({ _id: new ObjectId(req.user.userId) });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(confirmPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Password is incorrect'
      });
    }

    // Check for active bookings
    const bookingsCollection = db.collection('bookings');
    const userField = req.user.role === 'user' ? 'userId' : 'workerId';
    
    const activeBookings = await bookingsCollection.countDocuments({
      [userField]: new ObjectId(req.user.userId),
      status: { $in: ['pending', 'accepted', 'in_progress'] }
    });

    if (activeBookings > 0) {
      return res.status(409).json({
        success: false,
        message: 'Cannot delete account with active bookings. Please complete or cancel all pending bookings first.'
      });
    }

    // Soft delete - mark as deleted instead of actual deletion
    const result = await db.collection(collection).updateOne(
      { _id: new ObjectId(req.user.userId) },
      { 
        $set: { 
          isDeleted: true,
          deletedAt: new Date(),
          email: `deleted_${Date.now()}_${user.email}`, // Prevent email conflicts
          isActive: false,
          isAvailable: false
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Failed to delete account'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting account'
    });
  }
});

// Get user's booking history
router.get('/bookings', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const db = database.getDb();
    const bookingsCollection = db.collection('bookings');
    
    const userField = req.user.role === 'user' ? 'userId' : 'workerId';
    let matchFilter = { [userField]: new ObjectId(req.user.userId) };
    
    if (status) {
      matchFilter.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const bookings = await bookingsCollection.aggregate([
      { $match: matchFilter },
      {
        $lookup: {
          from: req.user.role === 'user' ? 'workers' : 'users',
          localField: req.user.role === 'user' ? 'workerId' : 'userId',
          foreignField: '_id',
          as: 'otherParty',
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
          otherParty: { $arrayElemAt: ['$otherParty', 0] },
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
    console.error('Error fetching booking history:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching booking history'
    });
  }
});

// Get user preferences
router.get('/preferences', authenticateToken, async (req, res) => {
  try {
    const db = database.getDb();
    const preferencesCollection = db.collection('user_preferences');
    
    const preferences = await preferencesCollection.findOne({ 
      userId: new ObjectId(req.user.userId) 
    });

    // Default preferences if none exist
    const defaultPreferences = {
      notifications: {
        email: true,
        sms: false,
        push: true,
        marketing: false
      },
      privacy: {
        profileVisible: true,
        showPhone: false,
        showEmail: false
      },
      location: {
        autoDetect: true,
        defaultLocation: ''
      }
    };

    res.status(200).json({
      success: true,
      preferences: preferences?.preferences || defaultPreferences
    });

  } catch (error) {
    console.error('Error fetching preferences:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching preferences'
    });
  }
});

// Update user preferences
router.put('/preferences', authenticateToken, async (req, res) => {
  try {
    const { preferences } = req.body;

    if (!preferences) {
      return res.status(400).json({
        success: false,
        message: 'Preferences object is required'
      });
    }

    const db = database.getDb();
    const preferencesCollection = db.collection('user_preferences');
    
    const result = await preferencesCollection.updateOne(
      { userId: new ObjectId(req.user.userId) },
      { 
        $set: { 
          preferences,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    res.status(200).json({
      success: true,
      message: 'Preferences updated successfully'
    });

  } catch (error) {
    console.error('Error updating preferences:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating preferences'
    });
  }
});

module.exports = router;