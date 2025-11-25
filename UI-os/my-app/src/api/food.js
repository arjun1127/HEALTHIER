import api from "./axios";

export async function createFood(payload) {
  try {
    const res = await api.post("/food", payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export async function getFoods({ page = 1, limit = 20 } = {}) {
  try {
    const res = await api.get(`/food?page=${page}&limit=${limit}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export async function getFood(id) {
  try {
    const res = await api.get(`/food/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export async function updateFood(id, payload) {
  try {
    const res = await api.put(`/food/${id}`, payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export async function deleteFood(id) {
  try {
    const res = await api.delete(`/food/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export default { createFood, getFoods, getFood, updateFood, deleteFood };
