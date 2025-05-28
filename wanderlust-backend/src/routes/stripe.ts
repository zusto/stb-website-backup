import express from 'express';
import Stripe from 'stripe';
import { validatePaymentData } from '../middleware/validatePayment.js';

export const stripeRouter = express.Router();

if (!process.env.STRIPE_SECRET_KEY) {
    console.error(`
⚠️  Stripe Configuration Error
   - STRIPE_SECRET_KEY is not set in environment variables
   - Environment variables should be loaded in server.ts
   - Check server logs for environment loading details
    `);
    process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
});

// Log that routes are initialized
console.log('💳 Stripe routes initialized');

stripeRouter.post('/create-payment-intent', validatePaymentData, async (req, res) => {
  console.log('📨 Received payment intent request:', req.body);
  
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 20), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('✅ Payment intent created:', paymentIntent.id);
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('❌ Error creating payment intent:', error);
    res.status(500).json({ 
      error: 'Error creating payment intent',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});