const express = require('express');
const { ObjectId } = require('mongodb');
const database = require('../utils/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create payment intent (fake payment simulation)
router.post('/create-intent', authenticateToken, async (req, res) => {
  try {
    const { 
      bookingId, 
      amount, 
      paymentMethod = 'card',
      currency = 'INR'
    } = req.body;

    const db = database.getDb();
    const bookingsCollection = db.collection('bookings');

    // Verify booking exists
    const booking = await bookingsCollection.findOne({
      _id: new ObjectId(bookingId)
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Create fake payment intent
    const paymentIntent = {
      _id: new ObjectId(),
      bookingId: new ObjectId(bookingId),
      amount: parseInt(amount),
      currency,
      paymentMethod,
      status: 'pending',
      clientSecret: `pi_${new ObjectId().toString()}_secret_fake`,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes
    };

    // Store payment intent
    await db.collection('paymentIntents').insertOne(paymentIntent);

    res.status(201).json({
      success: true,
      data: {
        clientSecret: paymentIntent.clientSecret,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        paymentIntentId: paymentIntent._id
      }
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating payment intent'
    });
  }
});

// Confirm payment (fake payment processing)
router.post('/confirm', authenticateToken, async (req, res) => {
  try {
    const { 
      paymentIntentId, 
      paymentMethodId = 'pm_fake_visa',
      billingDetails
    } = req.body;

    const db = database.getDb();
    const paymentIntentsCollection = db.collection('paymentIntents');
    const bookingsCollection = db.collection('bookings');

    // Find payment intent
    const paymentIntent = await paymentIntentsCollection.findOne({
      _id: new ObjectId(paymentIntentId)
    });

    if (!paymentIntent) {
      return res.status(404).json({
        success: false,
        message: 'Payment intent not found'
      });
    }

    if (paymentIntent.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Payment intent expired'
      });
    }

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate payment success (90% success rate)
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
      // Update payment intent
      await paymentIntentsCollection.updateOne(
        { _id: new ObjectId(paymentIntentId) },
        {
          $set: {
            status: 'succeeded',
            paymentMethodId,
            billingDetails,
            processedAt: new Date(),
            transactionId: `txn_${new ObjectId().toString()}`
          }
        }
      );

      // Update booking payment status
      await bookingsCollection.updateOne(
        { _id: paymentIntent.bookingId },
        {
          $set: {
            paymentStatus: 'paid',
            paymentIntentId: paymentIntent._id,
            paidAt: new Date(),
            updatedAt: new Date()
          }
        }
      );

      res.status(200).json({
        success: true,
        message: 'Payment successful',
        data: {
          status: 'succeeded',
          transactionId: `txn_${new ObjectId().toString()}`,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency
        }
      });

    } else {
      // Payment failed
      await paymentIntentsCollection.updateOne(
        { _id: new ObjectId(paymentIntentId) },
        {
          $set: {
            status: 'failed',
            failureReason: 'Insufficient funds',
            processedAt: new Date()
          }
        }
      );

      res.status(400).json({
        success: false,
        message: 'Payment failed',
        error: 'Insufficient funds'
      });
    }

  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing payment'
    });
  }
});

// Get payment status
router.get('/status/:paymentIntentId', authenticateToken, async (req, res) => {
  try {
    const { paymentIntentId } = req.params;
    const db = database.getDb();

    const paymentIntent = await db.collection('paymentIntents').findOne({
      _id: new ObjectId(paymentIntentId)
    });

    if (!paymentIntent) {
      return res.status(404).json({
        success: false,
        message: 'Payment intent not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        createdAt: paymentIntent.createdAt,
        processedAt: paymentIntent.processedAt || null
      }
    });

  } catch (error) {
    console.error('Error fetching payment status:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payment status'
    });
  }
});

// Refund payment (fake refund)
router.post('/refund', authenticateToken, async (req, res) => {
  try {
    const { paymentIntentId, amount, reason } = req.body;
    const db = database.getDb();

    const paymentIntent = await db.collection('paymentIntents').findOne({
      _id: new ObjectId(paymentIntentId)
    });

    if (!paymentIntent) {
      return res.status(404).json({
        success: false,
        message: 'Payment intent not found'
      });
    }

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        success: false,
        message: 'Payment not eligible for refund'
      });
    }

    // Create refund record
    const refund = {
      _id: new ObjectId(),
      paymentIntentId: paymentIntent._id,
      amount: amount || paymentIntent.amount,
      reason: reason || 'Requested by user',
      status: 'succeeded',
      createdAt: new Date(),
      refundId: `re_${new ObjectId().toString()}`
    };

    await db.collection('refunds').insertOne(refund);

    // Update booking if full refund
    if (!amount || amount >= paymentIntent.amount) {
      await db.collection('bookings').updateOne(
        { _id: paymentIntent.bookingId },
        {
          $set: {
            paymentStatus: 'refunded',
            refundedAt: new Date(),
            updatedAt: new Date()
          }
        }
      );
    }

    res.status(200).json({
      success: true,
      message: 'Refund processed successfully',
      data: {
        refundId: refund.refundId,
        amount: refund.amount,
        status: 'succeeded'
      }
    });

  } catch (error) {
    console.error('Error processing refund:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing refund'
    });
  }
});

// Get payment methods (fake payment methods)
router.get('/methods', authenticateToken, async (req, res) => {
  try {
    const fakeMethods = [
      {
        id: 'pm_fake_visa',
        type: 'card',
        card: {
          brand: 'visa',
          last4: '4242',
          exp_month: 12,
          exp_year: 2025
        },
        billingDetails: {
          name: 'Test User'
        }
      },
      {
        id: 'pm_fake_mastercard',
        type: 'card',
        card: {
          brand: 'mastercard',
          last4: '4444',
          exp_month: 8,
          exp_year: 2026
        },
        billingDetails: {
          name: 'Test User'
        }
      },
      {
        id: 'pm_fake_upi',
        type: 'upi',
        upi: {
          vpa: 'testuser@paytm'
        }
      }
    ];

    res.status(200).json({
      success: true,
      data: {
        paymentMethods: fakeMethods
      }
    });

  } catch (error) {
    console.error('Error fetching payment methods:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payment methods'
    });
  }
});

module.exports = router;