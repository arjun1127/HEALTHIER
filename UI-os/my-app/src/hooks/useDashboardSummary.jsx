import { useEffect, useState } from "react";
import axios from "../api/axios"; // your existing axios instance

export default function useDashboardSummary() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchSummary() {
    try {
      setLoading(true);
      const res = await axios.get("/dashboard/summary");
      setData(res.data);
    } catch (err) {
      console.error("Dashboard summary fetch error:", err);
      setError("Failed to load dashboard summary");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSummary();
  }, []);

  return { data, loading, error, refetch: fetchSummary };
}
