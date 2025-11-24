const express = require('express');
const SleepLog = require('../models/Sleeping');
const auth = require('../middleware/auth');

const router = express.Router();

// CREATE
router.post('/', auth, async (req, res) => {
  try {
    const payload = req.body;

    // Calculate duration in minutes if start & end are available
    if (payload.start && payload.end) {
      const start = new Date(payload.start);
      const end = new Date(payload.end);
      payload.durationMinutes = Math.round((end - start) / 60000); 
    }

    const log = new SleepLog({ ...payload, userId: req.user._id });
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
    const logs = await SleepLog.find({ userId: req.user._id })
      .sort({ start: -1 });
    res.json(logs);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: "server error" });
  }
});

// GET ONE
router.get('/:id', auth, async (req, res) => {
  try {
    const log = await SleepLog.findOne({
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
    const log = await SleepLog.findOneAndUpdate(
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
    const log = await SleepLog.findOneAndDelete({
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
