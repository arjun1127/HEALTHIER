const mongoose = require('mongoose');

const SleepLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  start: Date,
  end: Date,
  durationMinutes: Number,
  qualityScore: Number, // 0-100 calculated later
  note: String
});

module.exports = mongoose.model('SleepLog', SleepLogSchema);
