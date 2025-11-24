const mongoose = require('mongoose');

const ExpenseLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  category: { type: String }, // food, transport, subscription...
  vendor: { type: String },
  note: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ExpenseLog', ExpenseLogSchema);
