import express from 'express';
import { Redis } from 'ioredis';

const router = express.Router();
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

router.post('/store', async (req, res) => {
  try {
    const { email, paymentData } = req.body;
    
    // Store in Redis with 24hr expiry
    await redis.set(
      `payment:${email}`,
      JSON.stringify(paymentData),
      'EX',
      86400 // 24 hours
    );

    console.log('💾 Stored payment data for:', email);
    res.json({ success: true });

  } catch (error) {
    console.error('❌ Payment storage error:', error);
    res.status(500).json({ success: false, error: 'Failed to store payment data' });
  }
});

export default router;