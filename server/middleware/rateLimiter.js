const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
    standardHeaders: true, // Send rate limit info in headers
    legacyHeaders: false,
  });

module.exports = limiter;  