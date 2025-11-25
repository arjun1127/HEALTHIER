import { useState, useCallback } from "react";
import { useAuthStore } from "../store/authStore";
import { login as apiLogin, signup as apiSignup } from "../api/auth";

/** 
 * - Stores user + token in Zustand
 * - Loads token instantly from localStorage
 * - No backend profile fetch required
 * - Provides login(), signup(), logout()
 * - Returns key auth state flags
 */

export default function useAuth() {
  const { user, token, login: storeLogin, logout: storeLogout } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!token;

  // LOGIN
  const login = useCallback(
    async ({ email, password }) => {
      setLoading(true);
      try {
        const res = await apiLogin({ email, password }); // { token, user }
        const { token: jwt, user: loggedInUser } = res;

        localStorage.setItem("token", jwt);
        storeLogin(loggedInUser, jwt);

        return { success: true };
      } catch (err) {
        console.error(err);
        return {
          success: false,
          error: err?.error || err?.message || "Login failed",
        };
      } finally {
        setLoading(false);
      }
    },
    [storeLogin]
  );

  // SIGNUP
  const signup = useCallback(
    async ({ name, email, password }) => {
      setLoading(true);
      try {
        const res = await apiSignup({ name, email, password }); // { token, user }
        const { token: jwt, user: newUser } = res;

        localStorage.setItem("token", jwt);
        storeLogin(newUser, jwt);

        return { success: true };
      } catch (err) {
        console.error(err);
        return {
          success: false,
          error: err?.error || err?.message || "Signup failed",
        };
      } finally {
        setLoading(false);
      }
    },
    [storeLogin]
  );

  // LOGOUT
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    storeLogout();
  }, [storeLogout]);

  return {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
  };
}
