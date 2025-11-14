
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');
const database = require('./utils/database');

// Import routes
const authRoutes = require('./routes/auth');
const workerRoutes = require('./routes/workers');
const bookingRoutes = require('./routes/bookings');
const serviceRoutes = require('./routes/services');

// Import authentication middleware
const { optionalAuth, authenticateToken, authorizeRoles } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'TaskTurf API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// API routes with authentication
app.use('/api/workers', optionalAuth, workerRoutes);
app.use('/api/bookings', authenticateToken, bookingRoutes);
app.use('/api/services', optionalAuth, serviceRoutes);

// Legacy endpoints for backward compatibility (with optional auth)
app.get('/workers', optionalAuth, async (req, res) => {
  try {
    const db = database.getDb();
    
    // Check both old workers collection and new users collection for workers
    const legacyWorkers = await db.collection('workers').find({ isActive: true }).toArray();
    const newWorkers = await db.collection('users').find({ 
      role: 'worker', 
      isActive: true, 
      isAvailable: true 
    }).toArray();
    
    // Combine and transform data for consistency
    const allWorkers = [
      ...legacyWorkers.map(worker => ({
        _id: worker._id,
        name: worker.name || `${worker.firstname} ${worker.lastname}`,
        email: worker.email,
        phone: worker.phone || worker.number,
        service: worker.service || worker.skill,
        charge: worker.charge || worker.hourlyRate,
        address: worker.address,
        ratings: worker.ratings || worker.rating,
        description: worker.description,
        experience: worker.experience,
        isAvailable: worker.isAvailable !== false
      })),
      ...newWorkers.map(worker => ({
        _id: worker._id,
        name: `${worker.firstName} ${worker.lastName}`,
        email: worker.email,
        phone: worker.phone,
        service: Array.isArray(worker.skills) ? worker.skills.join(', ') : worker.skills,
        charge: worker.hourlyRate,
        address: worker.address,
        ratings: worker.rating,
        description: worker.description,
        experience: worker.experience,
        isAvailable: worker.isAvailable
      }))
    ];
    
    if (allWorkers.length === 0) {
      return res.status(404).json({ message: "No workers found" });
    }
    
    res.status(200).json(allWorkers);
  } catch (err) {
    res.status(500).json({ error: "Error fetching workers", message: err.message });
  }
});

// Legacy endpoint for service-based worker search
app.get('/workers/:service', optionalAuth, async (req, res) => {
  try {
    const serviceType = req.params.service;
    const db = database.getDb();
    
    // Search in both collections
    const legacyWorkers = await db.collection('workers').find({ 
      skill: { $regex: serviceType, $options: "i" },
      isActive: true,
      isAvailable: true
    }).toArray();
    
    const newWorkers = await db.collection('users').find({ 
      role: 'worker',
      skills: { $regex: serviceType, $options: "i" },
      isActive: true,
      isAvailable: true
    }).toArray();

    // Combine results
    const allWorkers = [
      ...legacyWorkers.map(worker => ({
        _id: worker._id,
        name: worker.name || `${worker.firstname} ${worker.lastname}`,
        email: worker.email,
        phone: worker.phone || worker.number,
        service: worker.service || worker.skill,
        charge: worker.charge || worker.hourlyRate,
        address: worker.address,
        ratings: worker.ratings || worker.rating,
        description: worker.description,
        experience: worker.experience,
        isAvailable: worker.isAvailable !== false
      })),
      ...newWorkers.map(worker => ({
        _id: worker._id,
        name: `${worker.firstName} ${worker.lastName}`,
        email: worker.email,
        phone: worker.phone,
        service: Array.isArray(worker.skills) ? worker.skills.join(', ') : worker.skills,
        charge: worker.hourlyRate,
        address: worker.address,
        ratings: worker.rating,
        description: worker.description,
        experience: worker.experience,
        isAvailable: worker.isAvailable
      }))
    ];

    if (allWorkers.length === 0) {
      return res.status(404).json({ message: `No workers found for service: ${serviceType}` });
    }
    
    res.status(200).json(allWorkers);
  } catch (err) {
    res.status(500).json({ error: "Error fetching workers", message: err.message });
  }
});

// Legacy endpoint for location and service-based search
app.get('/workers/:service/:location', async (req, res) => {
  try {
    const { service, location } = req.params;
    const db = database.getDb();
    const workersCollection = db.collection('workers');
    
    const workers = await workersCollection.find({ 
      skill: { $regex: service, $options: "i" },
      $or: [
        { "address.city": { $regex: location, $options: "i" } },
        { "address.state": { $regex: location, $options: "i" } }
      ],
      isActive: true,
      isAvailable: true
    }).toArray();

    if (workers.length === 0) {
      return res.status(404).json({ 
        message: `No workers found for service: ${service} in location: ${location}` 
      });
    }
    
    res.status(200).json(workers);
  } catch (err) {
    res.status(500).json({ error: "Error fetching workers", message: err.message });
  }
});

// API Routes
app.use('/api/workers', workerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/services', serviceRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  res.status(error.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong!' 
      : error.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: error.stack })
  });
});

// Initialize database and start server
async function startServer() {
  try {
    await database.connect();
    
    app.listen(PORT, () => {
      console.log(`🚀 TaskTurf API Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`📊 Legacy endpoints: http://localhost:${PORT}/workers`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await database.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  await database.close();
  process.exit(0);
});

startServer();

module.exports = app;

