import express from 'express';
import Stripe from 'stripe';
import { validatePaymentData } from '../middleware/validatePayment.js';

export const stripeRouter = express.Router();

// Delay Stripe initialization until first request
let stripe: Stripe | null = null;

function initializeStripe(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ Missing STRIPE_SECRET_KEY');
    return res.status(500).json({ error: 'Stripe configuration error' });
  }

  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16'
    });
    console.log('💳 Stripe initialized');
  }

  next();
}

// Use initialization middleware
stripeRouter.use(initializeStripe);

stripeRouter.post('/create-payment-intent', validatePaymentData, async (req, res) => {
  try {
    const { amount } = req.body;

    console.log('💰 Creating payment intent:', { amount });

    if (!stripe) {
      throw new Error('Stripe not initialized');
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        environment: process.env.NODE_ENV || 'development',
        created: new Date().toISOString()
      },
      description: 'ISIC Card Payment'
    });

    console.log('✅ Payment intent created:', { 
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      status: paymentIntent.status,
      client_secret: paymentIntent.client_secret?.substring(0, 10) + '...'
    });
    
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      intentId: paymentIntent.id
    });

  } catch (error: any) {
    console.error('❌ Payment intent error:', error);
    res.status(500).json({ 
      error: error.message || 'Payment intent creation failed',
      code: error.code,
      type: error.type
    });
  }
});