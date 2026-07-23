import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import redis from '../config/cache.js';

const isTestEnv = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'testing';

export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return standard RateLimit-* headers
    legacyHeaders: false, // Disable older X-RateLimit-* headers
    validate: { trustProxy: false },
    message: {
        success: false,
        message: 'Too many authentication attempts from this IP, please try again after 15 minutes.',
    },
    // Use RedisStore only in non-testing environments to avoid mock issues in unit tests
    store: isTestEnv ? undefined : new RedisStore({
        sendCommand: (...args) => redis.call(args[0], ...args.slice(1)),
    }),
});
