const express = require('express');
const UserPreferences = require('../models/UserPreference');
const auth = require('../middleware/auth');

const router = express.Router();

// CREATE OR UPDATE (UPSERT)
router.post('/', auth, async (req, res) => {
  try {
    const pref = await UserPreferences.findOneAndUpdate(
      { userId: req.user._id },
      req.body,
      { upsert: true, new: true }
    );
    res.json(pref);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

// GET CURRENT USER PREF
router.get('/', auth, async (req, res) => {
  try {
    const pref = await UserPreferences.findOne({ userId: req.user._id });
    res.json(pref || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
