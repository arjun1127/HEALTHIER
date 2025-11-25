import api from "./axios";

export async function signup({ name, email, password }) {
  try {
    const res = await api.post("/auth/signup", { name, email, password });
    return res.data; // { token, user }
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

export async function login({ email, password }) {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data; // { token, user }
  } catch (err) {
    throw err.response?.data || { error: err.message };
  }
}

// optional helper to fetch current user (if backend returns profile)
// export async function getProfile() {
//   try {
//     const res = await api.get("/auth/me"); // implement on backend if desired
//     return res.data;
//   } catch (err) {
//     throw err.response?.data || { error: err.message };
//   }
// }

export default { signup, login };
