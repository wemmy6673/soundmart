import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Mock login — replace with real API call
  const login = (email, password) => {
    if (email && password) {
      setUser({ email, name: email.split("@")[0] });
      return { success: true };
    }
    return { success: false, error: "Invalid credentials" };
  };

  // Mock register — replace with real API call
  const register = (name, email, password) => {
    if (name && email && password) {
      setUser({ email, name });
      return { success: true };
    }
    return { success: false, error: "All fields are required" };
  };

  // Called after Google OAuth — stores JWT and user from FastAPI response
  const loginWithToken = (token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, loginWithToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}