const mongoose = require('mongoose');

const FoodLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      name: String,
      quantity: { type: Number, default: 1 },
      calories: { type: Number, default: 0 },
      macros: {
        protein: Number,
        carbs: Number,
        fat: Number
      },
      note: String
    }
  ],
  totalCalories: { type: Number, default: 0 },
  mealType: { type: String, enum: ['breakfast','lunch','dinner','snack'], default: 'dinner' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FoodLog', FoodLogSchema);
