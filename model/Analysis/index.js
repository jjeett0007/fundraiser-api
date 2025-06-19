const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['user', 'fundraise', 'donation', 'system'],
    required: true
  },
  metrics: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'archived'],
    default: 'active'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  lastUpdated: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

const Analysis = mongoose.model('Analysis', analysisSchema);

module.exports = Analysis;
