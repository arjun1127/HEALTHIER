// src/api/preference.js
import api from "./axios";

export async function upsertPreference(payload) {
  try {
    const res = await api.post("/preferences", payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export async function getPreference() {
  try {
    const res = await api.get("/preferences");
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export default { upsertPreference, getPreference };
