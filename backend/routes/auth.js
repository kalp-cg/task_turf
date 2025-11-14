const express = require('express');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const database = require('../utils/database');
const { validateUserRegistration, validateWorkerRegistration, validateLogin } = require('../middleware/validation');
const { 
  generateToken, 
  generateRefreshToken,
  verifyRefreshToken,
  authenticateToken,
  authorizeRoles,
  authorizeOwnerOrAdmin 
} = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Generate JWT Token (Enhanced with role-based data)
const generateTokenLegacy = (user) => {
  return generateToken({
    _id: user._id,
    email: user.email,
    role: user.role,
    firstName: user.firstname,
    lastName: user.lastname
  });
};

// User Registration (Enhanced)
router.post('/register/user', validateUserRegistration, async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password, address } = req.body;
    const db = database.getDb();
    const usersCollection = db.collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with enhanced data structure
    const newUser = {
      email,
      firstName: firstname,
      lastName: lastname,
      phone,
      address,
      role: 'user',
      password: hashedPassword,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    };

    const result = await usersCollection.insertOne(newUser);
    const userWithId = { ...newUser, _id: result.insertedId };
    
    // Generate tokens
    const tokenData = {
      _id: result.insertedId,
      email,
      role: 'user',
      firstName: firstname,
      lastName: lastname
    };
    const accessToken = generateToken(tokenData);
    const refreshToken = generateRefreshToken(tokenData);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          _id: result.insertedId,
          email,
          firstName: firstname,
          lastName: lastname,
          phone,
          address,
          role: 'user',
          isVerified: false,
          createdAt: newUser.createdAt
        },
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    console.error('User registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration'
    });
  }
});

// Worker Registration (Enhanced)
router.post('/register/worker', validateWorkerRegistration, async (req, res) => {
  try {
    console.log('🐛 Worker registration data received:', req.body);
    
    const { firstname, lastname, email, phone, password, address, skill, experience } = req.body;
    const db = database.getDb();
    const usersCollection = db.collection('users');

    // Check if worker already exists
    const existingWorker = await usersCollection.findOne({ email });
    if (existingWorker) {
      return res.status(409).json({
        success: false,
        message: 'Worker with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Calculate dynamic pricing and ratings based on experience
    const experienceNum = parseInt(experience);
    const hourlyRate = experienceNum >= 5 ? 1000 : experienceNum >= 3 ? 800 : 600;
    const rating = experienceNum >= 5 ? 4.8 : experienceNum >= 3 ? 4.5 : 4.2;

    // Create worker with enhanced data structure
    const newWorker = {
      email,
      firstName: firstname,
      lastName: lastname,
      phone,
      address,
      role: 'worker',
      password: hashedPassword,
      // Worker-specific fields
      skills: Array.isArray(skill) ? skill : [skill],
      experience: experienceNum,
      hourlyRate,
      rating,
      description: `${experience} years of experience in ${Array.isArray(skill) ? skill.join(', ') : skill}`,
      completedJobs: 0,
      isAvailable: true,
      isVerified: false,
      profileImage: '',
      // Common fields
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    };

    const result = await usersCollection.insertOne(newWorker);
    
    // Generate tokens
    const tokenData = {
      _id: result.insertedId,
      email,
      role: 'worker',
      firstName: firstname,
      lastName: lastname
    };
    const accessToken = generateToken(tokenData);
    const refreshToken = generateRefreshToken(tokenData);

    res.status(201).json({
      success: true,
      message: 'Worker registered successfully',
      data: {
        user: {
          _id: result.insertedId,
          email,
          firstName: firstname,
          lastName: lastname,
          phone,
          address,
          role: 'worker',
          skills: newWorker.skills,
          experience: experienceNum,
          hourlyRate,
          rating,
          description: newWorker.description,
          isVerified: false,
          isAvailable: true,
          createdAt: newWorker.createdAt
        },
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    console.error('Worker registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration'
    });
  }
});

// Admin Registration (New)
router.post('/register/admin', async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password, adminKey } = req.body;
    
    // Verify admin key (in production, use environment variable)
    if (adminKey !== process.env.ADMIN_REGISTRATION_KEY && adminKey !== 'taskturf-admin-2024') {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin registration key'
      });
    }

    const db = database.getDb();
    const usersCollection = db.collection('users');

    // Check if admin already exists
    const existingAdmin = await usersCollection.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: 'Admin with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin
    const newAdmin = {
      email,
      firstName: firstname,
      lastName: lastname,
      phone,
      role: 'admin',
      password: hashedPassword,
      permissions: ['all'],
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    };

    const result = await usersCollection.insertOne(newAdmin);
    
    // Generate tokens
    const tokenData = {
      _id: result.insertedId,
      email,
      role: 'admin',
      firstName: firstname,
      lastName: lastname
    };
    const accessToken = generateToken(tokenData);
    const refreshToken = generateRefreshToken(tokenData);

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      data: {
        user: {
          _id: result.insertedId,
          email,
          firstName: firstname,
          lastName: lastname,
          phone,
          role: 'admin',
          permissions: newAdmin.permissions,
          isVerified: true,
          createdAt: newAdmin.createdAt
        },
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration'
    });
  }
});

// Universal Login (Enhanced to work with unified user collection)
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = database.getDb();
    
    // Check in unified users collection
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate tokens
    const tokenData = {
      _id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName
    };
    const accessToken = generateToken(tokenData);
    const refreshToken = generateRefreshToken(tokenData);

    // Update last login time
    await db.collection('users').updateOne(
      { _id: user._id },
      { $set: { lastLoginAt: new Date() } }
    );

    // Create user object and get public profile
    const userObj = new User(user);
    const userProfile = userObj.getPublicProfile();

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userProfile,
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login'
    });
  }
});

// Refresh Token
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);
    
    // Find user to ensure they still exist
    const db = database.getDb();
    const userData = await db.collection('users').findOne({ _id: new ObjectId(decoded._id) });
    if (!userData) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate new access token
    const tokenData = {
      _id: userData._id,
      email: userData.email,
      role: userData.role,
      firstName: userData.firstName,
      lastName: userData.lastName
    };
    const newAccessToken = generateToken(tokenData);

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        accessToken: newAccessToken
      }
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
});

// Get Current User Profile (Enhanced)
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const db = database.getDb();
    
    const userData = await db.collection('users').findOne(
      { _id: new ObjectId(req.user._id) },
      { projection: { password: 0 } }
    );

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = new User(userData);
    res.status(200).json({
      success: true,
      data: {
        user: user.getPublicProfile()
      }
    });

  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile'
    });
  }
});

// Update Profile (Enhanced)
router.put('/me', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const updateData = req.body;

    // Remove sensitive fields that shouldn't be updated via this route
    delete updateData.password;
    delete updateData.role;
    delete updateData._id;
    delete updateData.email; // Email changes should be handled separately

    // Update timestamp
    updateData.updatedAt = new Date();

    const db = database.getDb();
    
    // Update user in database
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get updated user data
    const userData = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    const user = new User(userData);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: user.getPublicProfile()
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating profile'
    });
  }
});

// Change Password
router.put('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    const db = database.getDb();
    
    // Find user
    const userData = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, userData.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { 
        $set: { 
          password: hashedNewPassword,
          updatedAt: new Date()
        } 
      }
    );

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error changing password'
    });
  }
});

// Admin: Get all users
router.get('/admin/users', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const role = req.query.role;
    const skip = (page - 1) * limit;

    const db = database.getDb();

    // Build filter
    const filter = {};
    if (role) {
      filter.role = role;
    }

    // Get users with pagination
    const users = await db.collection('users')
      .find(filter, { projection: { password: 0 } })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await db.collection('users').countDocuments(filter);

    res.json({
      success: true,
      data: {
        users: users.map(userData => new User(userData).getPublicProfile()),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting users'
    });
  }
});

// Admin: Get user by ID
router.get('/admin/users/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }

    const db = database.getDb();
    const userData = await db.collection('users').findOne({ _id: new ObjectId(id) });
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = new User(userData);
    res.json({
      success: true,
      data: {
        user: user.getPublicProfile()
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting user'
    });
  }
});

// Verify Token (Enhanced)
router.get('/verify', authenticateToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Token is valid',
    data: {
      user: req.user
    }
  });
});

// Add Address
router.post('/me/addresses', authenticateToken, async (req, res) => {
  try {
    const { label, street, city, state, zipcode, isDefault } = req.body;
    const userId = req.user._id;

    if (!street || !city || !state || !zipcode) {
      return res.status(400).json({
        success: false,
        message: 'All address fields are required'
      });
    }

    const db = database.getDb();
    
    const newAddress = {
      id: new ObjectId().toString(),
      label: label || 'Home',
      street,
      city,
      state,
      zipcode,
      isDefault: isDefault || false,
      createdAt: new Date()
    };

    // If this is set as default, unset all other defaults
    const updateQuery = isDefault 
      ? { $push: { addresses: newAddress }, $set: { 'addresses.$[].isDefault': false } }
      : { $push: { addresses: newAddress } };

    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      updateQuery
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Address added successfully',
      data: { address: newAddress }
    });

  } catch (error) {
    console.error('Add address error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error adding address'
    });
  }
});

// Update Address
router.put('/me/addresses/:addressId', authenticateToken, async (req, res) => {
  try {
    const { addressId } = req.params;
    const { label, street, city, state, zipcode, isDefault } = req.body;
    const userId = req.user._id;

    const db = database.getDb();
    
    const updateFields = {};
    if (label !== undefined) updateFields['addresses.$.label'] = label;
    if (street !== undefined) updateFields['addresses.$.street'] = street;
    if (city !== undefined) updateFields['addresses.$.city'] = city;
    if (state !== undefined) updateFields['addresses.$.state'] = state;
    if (zipcode !== undefined) updateFields['addresses.$.zipcode'] = zipcode;
    if (isDefault !== undefined) updateFields['addresses.$.isDefault'] = isDefault;
    updateFields['addresses.$.updatedAt'] = new Date();

    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId), 'addresses.id': addressId },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    res.json({
      success: true,
      message: 'Address updated successfully'
    });

  } catch (error) {
    console.error('Update address error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating address'
    });
  }
});

// Delete Address
router.delete('/me/addresses/:addressId', authenticateToken, async (req, res) => {
  try {
    const { addressId } = req.params;
    const userId = req.user._id;

    const db = database.getDb();
    
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { addresses: { id: addressId } } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    res.json({
      success: true,
      message: 'Address deleted successfully'
    });

  } catch (error) {
    console.error('Delete address error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting address'
    });
  }
});

// Add Work Entry (for workers to track completed jobs)
router.post('/me/work-history', authenticateToken, authorizeRoles('worker'), async (req, res) => {
  try {
    const { 
      clientName, 
      serviceType, 
      description, 
      completedDate, 
      duration, 
      earnings, 
      rating, 
      review, 
      location 
    } = req.body;
    const workerId = req.user._id;

    const db = database.getDb();
    
    const workEntry = {
      id: new ObjectId().toString(),
      clientName,
      serviceType,
      description,
      completedDate: new Date(completedDate),
      duration: duration || 0,
      earnings: earnings || 0,
      rating: rating || 0,
      review: review || '',
      location: location || '',
      createdAt: new Date()
    };

    // Update worker's work history and stats
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(workerId) },
      { 
        $push: { workHistory: workEntry },
        $inc: { 
          completedJobs: 1,
          totalEarnings: earnings || 0
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Worker not found'
      });
    }

    // Recalculate average rating
    const workerData = await db.collection('users').findOne({ _id: new ObjectId(workerId) });
    if (workerData && workerData.workHistory) {
      const validRatings = workerData.workHistory.filter(work => work.rating > 0);
      if (validRatings.length > 0) {
        const avgRating = validRatings.reduce((sum, work) => sum + work.rating, 0) / validRatings.length;
        await db.collection('users').updateOne(
          { _id: new ObjectId(workerId) },
          { $set: { rating: Math.round(avgRating * 10) / 10 } }
        );
      }
    }

    res.json({
      success: true,
      message: 'Work entry added successfully',
      data: { workEntry }
    });

  } catch (error) {
    console.error('Add work entry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error adding work entry'
    });
  }
});

// Get Top Rated Workers
router.get('/workers/top-rated', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const db = database.getDb();

    const topWorkers = await db.collection('users')
      .find({ 
        role: 'worker', 
        isActive: true,
        rating: { $gt: 0 }
      })
      .sort({ rating: -1, completedJobs: -1 })
      .limit(limit)
      .toArray();

    const workersProfiles = topWorkers.map(workerData => {
      const worker = new User(workerData);
      return worker.getPublicProfile();
    });

    res.json({
      success: true,
      data: {
        workers: workersProfiles
      }
    });

  } catch (error) {
    console.error('Get top workers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting top workers'
    });
  }
});

// Update Worker Availability
router.put('/me/availability', authenticateToken, authorizeRoles('worker'), async (req, res) => {
  try {
    const { availability, isAvailable } = req.body;
    const workerId = req.user._id;

    const db = database.getDb();
    
    const updateData = {};
    if (availability !== undefined) updateData.availability = availability;
    if (isAvailable !== undefined) updateData.isAvailable = isAvailable;
    updateData.updatedAt = new Date();

    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(workerId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Worker not found'
      });
    }

    res.json({
      success: true,
      message: 'Availability updated successfully'
    });

  } catch (error) {
    console.error('Update availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating availability'
    });
  }
});

// Logout (Enhanced)
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    const db = database.getDb();
    
    // Update last logout time
    await db.collection('users').updateOne(
      { _id: new ObjectId(req.user._id) },
      { $set: { lastLogoutAt: new Date() } }
    );

    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout'
    });
  }
});

module.exports = router;
