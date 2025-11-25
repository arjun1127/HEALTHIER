import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_BASE || "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token automatically if present
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch (err) {
    // ignore
  }
  return config;
}, (err) => Promise.reject(err));

// optional: global response interceptor to unwrap data or handle 401 centrally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // for example: auto logout on 401 can go here
    return Promise.reject(err);
  }
);

export default api;
