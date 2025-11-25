import api from "./axios";

export async function createExpense(payload) {
  try {
    const res = await api.post("/expense", payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export async function getExpenses({ page = 1, limit = 20 } = {}) {
  try {
    const res = await api.get(`/expense?page=${page}&limit=${limit}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export async function getExpense(id) {
  try {
    const res = await api.get(`/expense/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export async function updateExpense(id, payload) {
  try {
    const res = await api.put(`/expense/${id}`, payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export async function deleteExpense(id) {
  try {
    const res = await api.delete(`/expense/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export default { createExpense, getExpenses, getExpense, updateExpense, deleteExpense };
