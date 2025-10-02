import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { storage } from "../utils/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = "http://localhost:5000/api/auth";

  // REGISTER
  const register = async ({ name, email, phone, role, password }) => {
    try {
      const res = await axios.post(`${API_URL}/register`, {
        name,
        email,
        phone,
        role,
        password,
      });

      const registeredUser = res.data.user;
      const token = res.data.token;

      if (!registeredUser || !token) throw new Error("Invalid register response");

      setUser(registeredUser);
      setToken(token);
      await storage.setItem("token", token);

      return registeredUser;
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      return null;
    }
  };

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      const loggedInUser = res.data.user;
      const token = res.data.token;

      if (!loggedInUser || !token) throw new Error("Invalid login response");

      setUser(loggedInUser);
      setToken(token);
      await storage.setItem("token", token);

      return loggedInUser;
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      return null;
    }
  };

  // LOAD USER FROM TOKEN
  const loadUser = async () => {
    setIsLoading(true);
    try {
      const savedToken = await storage.getItem("token");
      if (savedToken) {
        const res = await axios.get(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${savedToken}` },
        });
        setUser(res.data);
        setToken(savedToken);
      } else {
        setUser(null);
        setToken(null);
      }
    } catch (err) {
      console.error("Load user error:", err.message);
      await storage.removeItem("token");
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  // LOGOUT
  const logout = async () => {
    setUser(null);
    setToken(null);
    await storage.removeItem("token");
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
