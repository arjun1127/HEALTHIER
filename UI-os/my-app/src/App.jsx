import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth pages
import Login from "./pages/Login";
import Signup from "./pages/SignUp";

// Dashboard & Logs pages
import Dashboard from "./pages/Dashboard";
import Food from "./pages/Food";
import Expense from "./pages/Expense";
import Sleep from "./pages/Sleep";
import Activity from "./pages/Activity";
import Preferences from "./pages/Preference";

// Layout + Protected Route
import Layout from "./components/ui/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />

          {/* Food */}
          <Route path="food" element={<Food />} />

          {/* Expense */}
          <Route path="expense" element={<Expense />} />

          {/* Sleep */}
          <Route path="sleep" element={<Sleep />} />

          {/* Activity */}
          <Route path="activity" element={<Activity />} />

          {/* Preferences */}
          <Route path="preferences" element={<Preferences />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
