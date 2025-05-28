import { Redis } from 'ioredis';
// Initialize Redis client
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
export async function storePaymentDetails(email, paymentData) {
    try {
        const key = `payment:${email}`;
        await redis.set(key, JSON.stringify(paymentData), 'EX', 3600); // Expires in 1 hour
        console.log('💾 Stored payment data for:', email);
    }
    catch (error) {
        console.error('❌ Redis store error:', error);
        throw error;
    }
}
export async function getStoredPaymentDetails(email) {
    try {
        const key = `payment:${email}`;
        const data = await redis.get(key);
        if (!data) {
            console.warn('⚠️ No payment data found for:', email);
            return null;
        }
        return JSON.parse(data);
    }
    catch (error) {
        console.error('❌ Redis get error:', error);
        throw error;
    }
}
