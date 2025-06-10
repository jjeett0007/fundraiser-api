const mongoose = require('mongoose');

const rateLimitSchema = new mongoose.Schema({
  key: { type: String, required: true, index: true },
  timestamps: { type: [Number], default: [] }, // array of timestamps (ms)
}, {
  timestamps: true, // optional createdAt, updatedAt fields
});

rateLimitSchema.index({ key: 1 }); // index for faster queries

const RateLimit = mongoose.model('RateLimit', rateLimitSchema);

module.exports = RateLimit;
