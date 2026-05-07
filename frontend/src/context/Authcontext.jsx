import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true while restoring session

  // ── Restore session on page load ──────────────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setUser(data);
        else localStorage.removeItem("token"); // token expired/invalid
      })
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  // ── Register ──────────────────────────────────────────────────────────────
  const register = async (name, email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        // FastAPI returns detail as string or array — handle both
        const errorMsg = Array.isArray(data.detail)
          ? data.detail[0]?.msg || "Registration failed."
          : data.detail || "Registration failed.";
        return { success: false, error: errorMsg };
      }
      return { success: true };
    } catch {
      return { success: false, error: "Network error. Please try again." };
    }
  };

  // ── Login ─────────────────────────────────────────────────────────────────
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.detail || "Login failed." };
      localStorage.setItem("token", data.access_token);
      setUser(data.user);
      return { success: true };
    } catch {
      return { success: false, error: "Network error. Please try again." };
    }
  };

  // ── Google OAuth ──────────────────────────────────────────────────────────
  const loginWithToken = (token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // ── Helper — get token for protected requests ─────────────────────────────
  const getToken = () => localStorage.getItem("token");

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithToken, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}