const express = require('express');
const ActivityLog = require('../models/ActivityPerference');
const auth = require('../middleware/auth');

const router = express.Router();

// CREATE
router.post('/', auth, async (req, res) => {
  try {
    const payload = req.body;

    // Optional calories calculation (placeholder)
    if (!payload.caloriesBurned && payload.durationMinutes) {
      payload.caloriesBurned = payload.durationMinutes * 5; // simple formula
    }

    const log = new ActivityLog({ ...payload, userId: req.user._id });
    await log.save();
    res.json(log);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

// GET ALL
router.get('/', auth, async (req, res) => {
  try {
    const logs = await ActivityLog.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

// GET ONE
router.get('/:id', auth, async (req, res) => {
  try {
    const log = await ActivityLog.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!log) return res.status(404).json({ error: "not found" });
    res.json(log);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

// UPDATE
router.put('/:id', auth, async (req, res) => {
  try {
    const log = await ActivityLog.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!log) return res.status(404).json({ error: "not found" });
    res.json(log);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
  try {
    const log = await ActivityLog.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!log) return res.status(404).json({ error: "not found" });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
