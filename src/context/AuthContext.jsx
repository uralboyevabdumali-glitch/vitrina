import { createContext, useContext, useState, useCallback } from "react";
import { loginUser, registerUser, updatePassword } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("vitrina-user");
    return saved ? JSON.parse(saved) : null;
  });

  const persistUser = useCallback((userData) => {
    if (userData) {
      localStorage.setItem("vitrina-user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("vitrina-user");
    }
    setUser(userData);
  }, []);

  const login = async (credentials) => {
    const safeUser = await loginUser(credentials);
    persistUser(safeUser);
    return safeUser;
  };

  const register = async (userData) => {
    await registerUser(userData);
  };

  const logout = useCallback(() => {
    persistUser(null);
  }, [persistUser]);

  const changePassword = async (userId, currentPassword, newPassword) => {
    try {
      await loginUser({ login: user?.login || user?.email, password: currentPassword });
    } catch {
      throw new Error("WRONG_PASSWORD");
    }
    await updatePassword(userId, newPassword);
    logout();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
