const mongoose = require('mongoose');

const PrefSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dailyCalorieGoal: Number,
  monthlyBudget: Number,
  sleepGoalHours: Number,
  timeZone: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserPreferences', PrefSchema);
