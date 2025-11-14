const express = require('express');
const { ObjectId } = require('mongodb');
const database = require('../utils/database');
const { validateObjectId } = require('../middleware/auth');

const router = express.Router();

// Get all services with filtering and search
router.get('/', async (req, res) => {
  try {
    const { category, search, location, minPrice, maxPrice, sortBy, limit, page } = req.query;
    const db = database.getDb();
    const servicesCollection = db.collection('services');
    
    // Build query filter
    let filter = { isActive: true };
    
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (location) {
      filter.availableLocations = { $regex: location, $options: 'i' };
    }
    
    if (minPrice || maxPrice) {
      filter.basePrice = {};
      if (minPrice) filter.basePrice.$gte = parseInt(minPrice);
      if (maxPrice) filter.basePrice.$lte = parseInt(maxPrice);
    }

    // Build sort options
    let sortOptions = {};
    switch (sortBy) {
      case 'price_low':
        sortOptions = { basePrice: 1 };
        break;
      case 'price_high':
        sortOptions = { basePrice: -1 };
        break;
      case 'rating':
        sortOptions = { averageRating: -1 };
        break;
      case 'popular':
        sortOptions = { bookingCount: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    // Pagination
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 20;
    const skip = (pageNumber - 1) * limitNumber;

    const services = await servicesCollection
      .find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNumber)
      .toArray();

    const total = await servicesCollection.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: services.length,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      services
    });

  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching services'
    });
  }
});

// Get service by ID with available workers
router.get('/:id', validateObjectId('id'), async (req, res) => {
  try {
    const db = database.getDb();
    const servicesCollection = db.collection('services');
    const workersCollection = db.collection('workers');
    
    const service = await servicesCollection.findOne({ _id: new ObjectId(req.params.id) });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Get available workers for this service
    const workers = await workersCollection
      .find({ 
        skill: { $regex: service.category, $options: 'i' },
        isAvailable: true
      })
      .project({ password: 0 })
      .sort({ ratings: -1 })
      .limit(10)
      .toArray();

    res.status(200).json({
      success: true,
      service: {
        ...service,
        availableWorkers: workers
      }
    });

  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching service details'
    });
  }
});

// Get services by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { location, limit = 10 } = req.query;
    const db = database.getDb();
    const servicesCollection = db.collection('services');

    let filter = { 
      category: { $regex: category, $options: 'i' },
      isActive: true
    };

    if (location) {
      filter.availableLocations = { $regex: location, $options: 'i' };
    }

    const services = await servicesCollection
      .find(filter)
      .sort({ averageRating: -1, bookingCount: -1 })
      .limit(parseInt(limit))
      .toArray();

    if (services.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No services found for category: ${category}${location ? ` in ${location}` : ''}`
      });
    }

    res.status(200).json({
      success: true,
      count: services.length,
      services
    });

  } catch (error) {
    console.error('Error fetching services by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching services by category'
    });
  }
});

// Get service categories with counts
router.get('/categories/all', async (req, res) => {
  try {
    const db = database.getDb();
    const servicesCollection = db.collection('services');

    const categories = await servicesCollection.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          averagePrice: { $avg: '$basePrice' },
          minPrice: { $min: '$basePrice' },
          maxPrice: { $max: '$basePrice' },
          averageRating: { $avg: '$averageRating' }
        }
      },
      { $sort: { count: -1 } }
    ]).toArray();

    res.status(200).json({
      success: true,
      categories: categories.map(cat => ({
        name: cat._id,
        count: cat.count,
        averagePrice: Math.round(cat.averagePrice),
        priceRange: {
          min: cat.minPrice,
          max: cat.maxPrice
        },
        averageRating: parseFloat(cat.averageRating?.toFixed(1) || '4.0')
      }))
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching service categories'
    });
  }
});

// Search services with filters
router.post('/search', async (req, res) => {
  try {
    const { query, filters = {}, location, sortBy, page = 1, limit = 20 } = req.body;
    const db = database.getDb();
    const servicesCollection = db.collection('services');

    // Build search query
    let searchFilter = { isActive: true };

    if (query) {
      searchFilter.$text = { $search: query };
    }

    // Apply filters
    if (filters.category) {
      searchFilter.category = { $in: Array.isArray(filters.category) ? filters.category : [filters.category] };
    }

    if (filters.priceRange) {
      searchFilter.basePrice = {
        $gte: filters.priceRange.min || 0,
        $lte: filters.priceRange.max || 50000
      };
    }

    if (filters.rating) {
      searchFilter.averageRating = { $gte: filters.rating };
    }

    if (location) {
      searchFilter.availableLocations = { $regex: location, $options: 'i' };
    }

    // Sort options
    let sortOptions = {};
    switch (sortBy) {
      case 'relevance':
        sortOptions = query ? { score: { $meta: 'textScore' } } : { bookingCount: -1 };
        break;
      case 'price_low':
        sortOptions = { basePrice: 1 };
        break;
      case 'price_high':
        sortOptions = { basePrice: -1 };
        break;
      case 'rating':
        sortOptions = { averageRating: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const services = await servicesCollection
      .find(searchFilter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    const total = await servicesCollection.countDocuments(searchFilter);

    res.status(200).json({
      success: true,
      query,
      filters,
      results: {
        count: services.length,
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        services
      }
    });

  } catch (error) {
    console.error('Error searching services:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching services'
    });
  }
});

// Get trending/popular services
router.get('/trending/popular', async (req, res) => {
  try {
    const { limit = 8 } = req.query;
    const db = database.getDb();
    const servicesCollection = db.collection('services');

    const trendingServices = await servicesCollection
      .find({ isActive: true })
      .sort({ bookingCount: -1, averageRating: -1 })
      .limit(parseInt(limit))
      .toArray();

    res.status(200).json({
      success: true,
      count: trendingServices.length,
      services: trendingServices
    });

  } catch (error) {
    console.error('Error fetching trending services:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching trending services'
    });
  }
});

// Rate a service (Public endpoint)
router.post('/:id/rate', validateObjectId('id'), async (req, res) => {
  try {
    const { rating, review, userId, userName } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const db = database.getDb();
    const servicesCollection = db.collection('services');
    const ratingsCollection = db.collection('service_ratings');

    // Check if user already rated this service
    const existingRating = await ratingsCollection.findOne({
      serviceId: new ObjectId(req.params.id),
      userId: new ObjectId(userId)
    });

    if (existingRating) {
      return res.status(409).json({
        success: false,
        message: 'You have already rated this service'
      });
    }

    // Add new rating
    const newRating = {
      serviceId: new ObjectId(req.params.id),
      userId: new ObjectId(userId),
      userName: userName || 'Anonymous User',
      rating: parseInt(rating),
      review: review || '',
      createdAt: new Date()
    };

    await ratingsCollection.insertOne(newRating);

    // Update service average rating
    const ratings = await ratingsCollection.find({ serviceId: new ObjectId(req.params.id) }).toArray();
    const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

    await servicesCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { 
        $set: { 
          averageRating: parseFloat(averageRating.toFixed(1)),
          totalRatings: ratings.length,
          updatedAt: new Date()
        }
      }
    );

    res.status(201).json({
      success: true,
      message: 'Rating submitted successfully',
      newRating
    });

  } catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting rating'
    });
  }
});

module.exports = router;