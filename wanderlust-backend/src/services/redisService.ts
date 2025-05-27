import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

console.log('📦 Redis connected to:', process.env.REDIS_URL);

export default redis;