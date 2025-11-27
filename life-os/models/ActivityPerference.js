const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: String, // running, badminton, gym...
  durationMinutes: Number,
  distanceKm: Number,
  caloriesBurned: Number,
  intensity: { type: String, enum: ['low','medium','high'], default: 'medium' },
  createdAt: { type: Date, default: Date.now }
},{ timestamps: true });

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);
