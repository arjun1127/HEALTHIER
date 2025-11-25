import api from "./axios";

export async function createActivity(payload) {
  try {
    const res = await api.post("/activity", payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export async function getActivities() {
  try {
    const res = await api.get("/activity");
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export async function getActivity(id) {
  try {
    const res = await api.get(`/activity/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export async function updateActivity(id, payload) {
  try {
    const res = await api.put(`/activity/${id}`, payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export async function deleteActivity(id) {
  try {
    const res = await api.delete(`/activity/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export default { createActivity, getActivities, getActivity, updateActivity, deleteActivity };
