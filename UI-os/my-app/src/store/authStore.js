import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,

  // Save user + token after login/signup
  login: (user, token) => {
    set({
      user,
      token,
    });
  },

  // Clear everything on logout
  logout: () => {
    set({
      user: null,
      token: null,
    });
    localStorage.removeItem("token");
  },
}));
