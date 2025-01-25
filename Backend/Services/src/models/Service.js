const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['Home Maintenance', 'Cleaning', 'Personal Care', 'Professional', 'Technical']
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);