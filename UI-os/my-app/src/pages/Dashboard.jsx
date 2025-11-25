import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchSummary() {
    try {
      const res = await api.get("/dashboard/summary");
      setSummary(res.data);
    } catch (err) {
      console.error("Failed to load dashboard summary:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading dashboard...</div>;

  if (!summary) return <div className="text-center mt-10 text-red-500">Failed to load dashboard data.</div>;

  return (
    <div className="p-4">

      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Calories */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <p className="text-gray-500">Calories Today</p>
          <p className="text-4xl font-bold mt-2">{summary.calories || 0}</p>
        </div>

        {/* Expenses */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <p className="text-gray-500">Expenses Today</p>
          <p className="text-4xl font-bold mt-2">₹{summary.expenses || 0}</p>
        </div>

        {/* Sleep */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <p className="text-gray-500">Sleep Duration</p>
          <p className="text-4xl font-bold mt-2">{summary.sleepHours || 0} hrs</p>
        </div>

        {/* Activity */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <p className="text-gray-500">Activity</p>
          <p className="text-4xl font-bold mt-2">{summary.activityMinutes || 0} mins</p>
        </div>

      </div>

      {/* AI Recommendations (later) */}
      <div className="bg-white shadow-md rounded-xl p-6 mt-8">
        <h2 className="text-xl font-bold mb-2">AI Recommendations</h2>
        <p className="text-gray-600">{summary.recommendations || "Your AI coach will appear here soon."}</p>
      </div>

    </div>
  );
}
