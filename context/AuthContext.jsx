"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api, { setTokens, clearTokens, getAccessToken } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount: if we have a token, verify it and load the admin
  useEffect(() => {
    const load = async () => {
      const token = getAccessToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await api.get("/auth/me");
        setAdmin(data);
      } catch {
        clearTokens();
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    setTokens({ token: data.token, refreshToken: data.refreshToken });
    setAdmin({ _id: data._id, name: data.name, email: data.email });
    return data;
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setAdmin(null);
    if (typeof window !== "undefined") window.location.href = "/admin/login";
  }, []);

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated: !!admin,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};