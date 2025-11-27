const express = require("express");
const auth = require("../middleware/auth");

const FoodLog = require("../models/FoodLog");
const SleepLog = require("../models/Sleeping");
const ExpenseLog = require("../models/Expense");
const ActivityLog = require("../models/ActivityPerference");

const router = express.Router();

// GET /api/dashboard/summary
router.get("/summary", auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // 1) FOOD: uses createdAt
    const foodLogs = await FoodLog.find({
      userId,
      createdAt: { $gte: today, $lt: tomorrow }
    });

    let caloriesToday = 0;
    foodLogs.forEach(log => {
      caloriesToday += log.totalCalories || 0;
    });

    // 2) EXPENSE: uses `date` (NOT createdAt)
    const expenseLogs = await ExpenseLog.find({
      userId,
      date: { $gte: today, $lt: tomorrow }
    });

    let expensesToday = 0;
    expenseLogs.forEach(log => {
      expensesToday += log.amount || 0;
    });

    // 3) SLEEP: uses `start`
    const sleepLogs = await SleepLog.find({
      userId,
      start: { $gte: today, $lt: tomorrow }
    });

    let sleepMinutes = 0;
    sleepLogs.forEach(log => {
      sleepMinutes += log.durationMinutes || 0;
    });

    const sleepHours = (sleepMinutes / 60).toFixed(1);

    // 4) ACTIVITY: uses createdAt
    const activityLogs = await ActivityLog.find({
      userId,
      createdAt: { $gte: today, $lt: tomorrow }
    });

    let activityMinutes = 0;
    activityLogs.forEach(log => {
      activityMinutes += log.durationMinutes || 0;
    });

    res.json({
      calories: caloriesToday,
      expenses: expensesToday,
      sleepHours,
      activityMinutes,
      recommendations: "Your personalized AI health suggestions will appear here soon."
    });

  } catch (err) {
    console.error("Dashboard summary error:", err);
    res.status(500).json({ error: "Server error generating summary" });
  }
});

module.exports = router;
