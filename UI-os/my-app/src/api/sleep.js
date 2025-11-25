import api from "./axios";

export async function createSleep(payload) {
  try {
    const res = await api.post("/sleep", payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export async function getSleeps() {
  try {
    const res = await api.get("/sleep");
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export async function getSleep(id) {
  try {
    const res = await api.get(`/sleep/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export async function updateSleep(id, payload) {
  try {
    const res = await api.put(`/sleep/${id}`, payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export async function deleteSleep(id) {
  try {
    const res = await api.delete(`/sleep/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export default { createSleep, getSleeps, getSleep, updateSleep, deleteSleep };
