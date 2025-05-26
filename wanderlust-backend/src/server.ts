import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { stripeRouter } from './routes/stripe';
import { verificationRouter } from './routes/verification';
import zohoRouter from './routes/zoho';
import { uploadRouter } from './routes/upload';
import paymentRoutes from './routes/payment';
import ambassadorRouter from './routes/ambassador';
import subscribersRouter from './routes/subscribers';
import quizRouter from './routes/quiz';
import path from 'path';

// Load environment variables
dotenv.config();
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
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

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
  origin: 'http://localhost:8080', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],
  credentials: true // Enable credentials
}));
console.log('🔒 CORS configured for multiple origins:', ['http://localhost:8080', 'http://localhost:5173']);

// Logging
app.use(morgan('dev'));
app.use(express.json());

// Log all ambassador applications
app.use('/api/ambassador/apply', (req, res, next) => {
  console.log('📝 New ambassador application:', {
    name: req.body.fullName,
    email: req.body.email
  });
  next();
});

// Add logging middleware for quiz submissions
app.use('/api/quiz/submit', (req, res, next) => {
  console.log('📝 Incoming quiz submission:', {
    email: req.body?.answers?.email,
    destination: req.body?.answers?.dest
  });
  next();
});

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/stripe', stripeRouter);
app.use('/api/verification', verificationRouter); // Add this line
app.use('/api/zoho', zohoRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/payment', paymentRoutes);
app.use('/api/ambassador', ambassadorRouter);
app.use('/api/subscribers', subscribersRouter);
app.use('/api/quiz', quizRouter);

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
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('💥 Server error:', err);
  res.status(500).json({ 
    success: false, 
    error: err.message || 'Internal server error' 
  });
});

const HOST = '0.0.0.0';

try {
  const server = app.listen(PORT, HOST, () => {
    console.log('\n=================================');
    console.log('🚀 Server is running!');
    console.log(`📡 Server URL: http://localhost:${PORT}`);
    console.log('\n📍 Available endpoints:');
    console.log(`   GET  http://localhost:${PORT}/health`);
    console.log(`   POST http://localhost:${PORT}/api/stripe/create-payment-intent`);
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