import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { stripeRouter } from './routes/stripe';
import { verificationRouter } from './routes/verification';
import { zohoRouter } from './routes/zoho';

// Load environment variables
delete require.cache[require.resolve('dotenv')];
require('dotenv').config();
console.log('🔧 Environment loaded');

// Log environment variables (excluding sensitive data)
console.log('Environment variables:', {
  PORT: process.env.PORT,
  STRIPE_KEY: process.env.STRIPE_SECRET_KEY?.substring(0, 8) + '...',
  FRONTEND_URL: process.env.FRONTEND_URL
});

// Check for required environment variables
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('⚠️  Missing STRIPE_SECRET_KEY in environment variables');
  process.exit(1);
}

const app = express();

// Error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  process.exit(1);
});

// Error handling for unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('💥 Unhandled Rejection:', error);
  process.exit(1);
});

// Security middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://studenttravelbuddy.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(morgan('dev'));

// Mount routes
app.use('/api/stripe', stripeRouter);
app.use('/api/verification', verificationRouter);
app.use('/api/zoho', zohoRouter);

// Health check
app.get('/health', (req, res) => {
  console.log('💓 Health check endpoint hit');
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    stripe: !!process.env.STRIPE_SECRET_KEY ? 'configured' : 'not configured'
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

try {
  const server = app.listen(PORT, HOST, () => {
    console.log('\n=================================');
    console.log('🚀 Server is running!');
    console.log(`📡 Server URL: https://studenttravelbuddy.com`);
    console.log('\n📍 Available endpoints:');
    console.log(`   GET  https://studenttravelbuddy.com}/health`);
    console.log(`   POST https://studenttravelbuddy.com/api/stripe/create-payment-intent`);
    console.log('\n⚡ Ready to process payments!');
    console.log('=================================\n');
  });

  server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use. Please try another port.`);
    } else {
      console.error('❌ Server error:', error);
    }
    process.exit(1);
  });
} catch (error) {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
}