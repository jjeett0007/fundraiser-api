const ms = require("ms");
const { RateLimit } = require("../model");
/**
 * Advanced sliding window rate limiter middleware factory.
 * @param {Object} options
 * @param {number|string} options.window - Time window size (e.g. 1m, 10s or ms number)
 * @param {number} options.max - Max requests allowed in window
 * @param {function} options.keyGenerator - function(req) to generate key (default: req.ip)
 * @param {function} [options.skip] - optional function(req) to skip rate limiting for certain requests
 * @returns Express middleware function
 */

function advancedRateLimiter({
  window = "1m",
  max = 10,
  keyGenerator = (req) => req.ip,
  skip = () => false
} = {}) {
  const windowMs = typeof window === "string" ? ms(window) : window;
  if (!windowMs || windowMs <= 0) throw new Error("Invalid window time");

  return async (req, res, next) => {
    if (skip(req)) return next();

    const key = keyGenerator(req);
    const now = Date.now();

    console.log(
      `Rate limiting request from key: ${key} at ${new Date(now).toISOString()}`
    );

    try {
      // Find the document for this key or create if missing
      let record = await RateLimit.findOne({ key });

      if (!record) {
        // Create new record with current timestamp
        record = new RateLimit({ key, timestamps: [now] });
        await record.save();

        // Set headers and allow
        res.set("X-RateLimit-Limit", max);
        res.set("X-RateLimit-Remaining", max - 1);
        res.set("X-RateLimit-Reset", Math.floor((now + windowMs) / 1000));
        return next();
      }

      // Filter timestamps inside window
      record.timestamps = record.timestamps.filter((ts) => ts > now - windowMs);

      if (record.timestamps.length >= max) {
        const retryAfterMs = windowMs - (now - record.timestamps[0]);
        res.set("Retry-After", Math.ceil(retryAfterMs / 1000));
        res.set("X-RateLimit-Limit", max);
        res.set("X-RateLimit-Remaining", 0);
        res.set("X-RateLimit-Reset", Math.floor((now + retryAfterMs) / 1000));
        return res.status(429).json({
          message: "Too many requests, please try again later.",
          retryAfterSeconds: Math.ceil(retryAfterMs / 1000)
        });
      }

      // Add current timestamp and save
      record.timestamps.push(now);
      await record.save();

      // Set rate limit headers
      res.set("X-RateLimit-Limit", max);
      res.set("X-RateLimit-Remaining", max - record.timestamps.length);
      res.set(
        "X-RateLimit-Reset",
        Math.floor((record.timestamps[0] + windowMs) / 1000)
      );

      next();
    } catch (err) {
      console.error("rate limiter error:", err);
      // Fail open (allow request) if DB error
      return res.status(429).json({
        message: "Too many requests, please try again later.",
        retryAfterSeconds: Math.ceil(retryAfterMs / 1000)
      });
    }
  };
}

module.exports = advancedRateLimiter;
