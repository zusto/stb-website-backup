import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express from 'express';
import { checkFilePermissions } from './middleware/filePermissions.js';
import generateSitemap from './utils/sitemapGenerator.js';
// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Debug current environment
console.log('🔍 Current environment:', {
    NODE_ENV: process.env.NODE_ENV,
    CWD: process.cwd(),
    dirname: __dirname
});
// Don't exit if .env file is missing in production
if (process.env.NODE_ENV !== 'production') {
    const result = dotenv.config();
    if (result.error) {
        console.warn('⚠️ No .env file found, using environment variables');
    }
}
// Configure dotenv to look in the correct location (one directory up from src)
const envPath = path.resolve(process.cwd(), '.env');
console.log('🔍 Loading environment from:', envPath);
const result = dotenv.config({ path: envPath });
console.log('📦 Environment loading result:', result.error ? 'Failed' : 'Success');
console.log('🔑 Environment variables:', {
    NODE_ENV: process.env.NODE_ENV,
    STRIPE_KEY_STATUS: process.env.STRIPE_SECRET_KEY ? 'Present' : 'Missing',
    CURRENT_DIR: process.cwd(),
    ENV_PATH: envPath
});
if (result.error) {
    console.error(`
⚠️ Environment Error:
   - Failed to load .env file
   - Current working directory: ${process.cwd()}
   - Attempted env path: ${envPath}
   - Error: ${result.error.message}
    `);
    process.exit(1);
}
// Verify environment loaded
console.log('🔑 STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? 'Present' : 'Missing');
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { stripeRouter } from './routes/stripe.js';
import { verificationRouter } from './routes/verification.js';
import zohoRouter from './routes/zoho.js';
import { uploadRouter } from './routes/upload.js';
import paymentRoutes from './routes/payment.js';
import ambassadorRouter from './routes/ambassador.js';
import subscribersRouter from './routes/subscribers.js';
import quizRouter from './routes/quiz.js';
import freebieRouter from './routes/freebies.js';
import intakesRouter from './routes/intakes.js';
// Initialize Express
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const HOST = '0.0.0.0';
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
    origin: process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL || ''
        : [process.env.FRONTEND_URL || '', 'http://localhost:5173'],
    credentials: true
}));
console.log('🔒 CORS configured for:', process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : [process.env.FRONTEND_URL, 'http://localhost:5173']);
// Logging middleware
app.use(morgan('dev'));
// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Add permission checking middleware
app.use('/uploads', checkFilePermissions);
// Add MIME type configuration
app.use('/uploads', (req, res, next) => {
    const filePath = req.path;
    if (filePath.endsWith('.pdf')) {
        res.type('application/pdf');
    }
    else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
        res.type('image/jpeg');
    }
    else if (filePath.endsWith('.png')) {
        res.type('image/png');
    }
    next();
});
app.use('/uploads', express.static(path.join(__dirname, '../public/lovable-uploads'), {
    setHeaders: (res, path) => {
        res.set('Access-Control-Allow-Origin', '*');
        if (path.endsWith('.pdf')) {
            res.set('Content-Type', 'application/pdf');
        }
    }
}));
console.log('📁 Static file serving configured for uploads');
// Logging middleware for specific routes
app.use('/api/ambassador/apply', (req, res, next) => {
    console.log('📝 New ambassador application:', {
        name: req.body.fullName,
        email: req.body.email
    });
    next();
});
app.use('/api/quiz/submit', (req, res, next) => {
    console.log('📝 Quiz submission:', {
        email: req.body?.answers?.email,
        destination: req.body?.answers?.dest
    });
    next();
});
// Logging middleware for Zoho routes
app.use('/api/zoho', (req, res, next) => {
    console.log('📝 Zoho API Request:', {
        method: req.method,
        path: req.path,
        body: req.body,
        timestamp: new Date().toISOString()
    });
    next();
});
// API Routes
app.use('/api/stripe', stripeRouter);
app.use('/api/verification', verificationRouter);
app.use('/api/zoho', zohoRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/payment', paymentRoutes);
app.use('/api/ambassador', ambassadorRouter);
app.use('/api/subscribers', subscribersRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/freebies', freebieRouter);
app.use('/api/intakes', intakesRouter);
// Health check endpoint with detailed logging
app.get('/api/health', (req, res) => {
    console.log('🏥 Health check requested:', {
        path: req.path,
        method: req.method,
        headers: req.headers,
        timestamp: new Date().toISOString()
    });
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV,
        stripe: process.env.STRIPE_SECRET_KEY ? 'configured' : 'not configured',
        uptime: process.uptime(),
        port: PORT,
        host: HOST
    });
});
// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('💥 Server error:', err);
    res.status(500).json({
        success: false,
        error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
    });
});
// Start server
try {
    const server = app.listen(PORT, HOST, async () => {
        console.log('\n=================================');
        console.log('🚀 Server is running!');
        console.log(`📡 Environment: ${process.env.NODE_ENV}`);
        console.log(`📡 Server URL: ${process.env.FRONTEND_URL}`);
        console.log('\n📍 Available endpoints:');
        console.log(`   GET  ${process.env.FRONTEND_URL}/health`);
        console.log(`   POST ${process.env.FRONTEND_URL}/api/stripe/create-payment-intent`);
        console.log('\n⚡ Ready to process requests!');
        console.log('=================================\n');
        await generateSitemap();
    });
    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`❌ Port ${PORT} is already in use`);
        }
        else {
            console.error('❌ Server error:', error);
        }
        process.exit(1);
    });
}
catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
}
