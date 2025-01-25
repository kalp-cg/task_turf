const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const validate = require('../middleware/validate');
const { createServiceSchema } = require('../validations/serviceValidation');

// Get all services
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = category ? { category } : {};
    
    const services = await Service.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
      
    const count = await Service.countDocuments(query);
    
    res.json({
      services,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: error.message,
        status: 500
      }
    });
  }
});

// Get service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        error: {
          message: 'Service not found',
          status: 404
        }
      });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({
      error: {
        message: error.message,
        status: 500
      }
    });
  }
});

// Create service
router.post('/', validate(createServiceSchema), async (req, res) => {
  try {
    const service = new Service(req.body);
    const savedService = await service.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(500).json({
      error: {
        message: error.message,
        status: 500
      }
    });
  }
});

// Update service
router.put('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!service) {
      return res.status(404).json({
        error: {
          message: 'Service not found',
          status: 404
        }
      });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({
      error: {
        message: error.message,
        status: 500
      }
    });
  }
});

// Delete service
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({
        error: {
          message: 'Service not found',
          status: 404
        }
      });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: {
        message: error.message,
        status: 500
      }
    });
  }
});

module.exports = router;