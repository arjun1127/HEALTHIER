const express = require('express');
const ExpenseLog = require('../models/Expense');
const auth = require('../middleware/auth');

const router = express.Router();

// CREATE
router.post('/', auth, async (req, res) => {
  try {
    const log = new ExpenseLog({ ...req.body, userId: req.user._id });
    await log.save();
    res.json(log);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

// GET ALL (paginated)
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const logs = await ExpenseLog.find({ userId: req.user._id })
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(logs);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: "server error" });
  }
});

// GET ONE
router.get('/:id', auth, async (req, res) => {
  try {
    const log = await ExpenseLog.findOne({
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
    const log = await ExpenseLog.findOneAndUpdate(
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
    const log = await ExpenseLog.findOneAndDelete({
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
