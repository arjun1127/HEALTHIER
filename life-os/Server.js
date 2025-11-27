require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// ---- MIDDLEWARE ----
const requestLogger = require('./middleware/requestLogger');
const rateLimiter = require('./middleware/rateLimiter');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHnadler');

// ---- ROUTES ----
const authRoutes = require('./routes/AuthRoutes');
const foodRoutes = require('./routes/Food');
const expenseRoutes = require('./routes/Expense');
const sleepRoutes = require('./routes/Sleep');
const activityRoutes = require('./routes/Activity');
const preferenceRoutes = require('./routes/Preference');
const dashboardRoutes =require('./routes/dashboardSummary');

const app = express();

// ---- GLOBAL MIDDLEWARE ----
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// apply rate limiting globally (optional)
app.use(rateLimiter);

// ---- API ROUTES ----
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/sleep', sleepRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/preferences', preferenceRoutes);
app.use('/api/dashboard', dashboardRoutes);  

// ---- 404 HANDLER ----
app.use(notFound);

// ---- ERROR HANDLER ----
app.use(errorHandler);

// ---- MONGODB CONNECTION ----
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB Error:', err));

