const express = require('express');
const FoodLog = require('../models/FoodLog');
const auth = require('../middleware/auth');

const router = express.Router();

// Create food log
router.post('/', auth, async (req, res) => {
  try {
    const payload = req.body;
    // calculate total calories if not provided
    if (!payload.totalCalories && payload.items) {
      payload.totalCalories = payload.items.reduce((s, i) => s + (i.calories || 0) * (i.quantity || 1), 0);
    }
    const log = new FoodLog({ ...payload, userId: req.user._id });
    await log.save();
    res.json(log);
  } catch (err) {
    console.error(err); res.status(500).json({ error: 'server error' });
  }
});

// Get all food logs for user (paginated)
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const logs = await FoodLog.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .skip((page-1)*limit)
      .limit(parseInt(limit));
    res.json(logs);
  } catch (err) { console.error(err); res.status(500).json({ error: 'server error' }); }
});

// Get one
router.get('/:id', auth, async (req, res) => {
  try {
    const log = await FoodLog.findOne({ _id: req.params.id, userId: req.user._id });
    if (!log) return res.status(404).json({ error: 'not found' });
    res.json(log);
  } catch (err) { console.error(err); res.status(500).json({ error: 'server error' }); }
});

// Update
router.put('/:id', auth, async (req, res) => {
  try {
    const log = await FoodLog.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, { new: true });
    if (!log) return res.status(404).json({ error: 'not found' });
    res.json(log);
  } catch (err) { console.error(err); res.status(500).json({ error: 'server error' }); }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const log = await FoodLog.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!log) return res.status(404).json({ error: 'not found' });
    res.json({ success: true });
  } catch (err) { console.error(err); res.status(500).json({ error: 'server error' }); }
});

module.exports = router;
