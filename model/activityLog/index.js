const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  ip: { type: String, required: true },
  method: { type: String, required: true },
  url: { type: String, required: true },
  userAgent: { type: String },
  timestamp: { type: Date, default: Date.now },
  requestBodies: { type: Object },
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog;
