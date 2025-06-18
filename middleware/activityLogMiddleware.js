const jwt = require("jsonwebtoken");
const { ActivityLog } = require("../model");
const config = require("../config/index");
const jwtSecret = config.jwt.secret;

const activityLogger = async (req, res, next) => {
  try {
    let userId;
    const authHeader = req.headers.authorization;

    console.log("user agent", req.headers["user-agent"]);

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, jwtSecret);
      userId = decoded.id;
    }

    const logData = {
      userId: userId || undefined,
      ip: req.ip || req.connection.remoteAddress,
      method: req.method,
      url: req.originalUrl || req.url,
      userAgent: req.headers["user-agent"],
      timestamp: new Date(),
      requestBodies: req.body || {}
    };

    // Save asynchronously, don't block the request
    ActivityLog.create(logData).catch((err) => {
      console.error("ActivityLog error:", err);
    });
    next();
  } catch (err) {
    console.error("ActivityLogger middleware error:", err);
  }
};

module.exports = activityLogger;
