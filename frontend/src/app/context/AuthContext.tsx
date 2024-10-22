"use client";
import axiosInstance from "@/lib/axiosInstance";
import React, { createContext, useState, useEffect, ReactNode } from "react";

// Define the shape of the User object
interface User {
  username: string;
  // Add any other user-related fields if necessary
}

// Define the shape of the Auth context
interface AuthContextType {
  user: User | null;
  login: (formData: { username: string; password: string }) => Promise<User>;
  logout: () => void;
  loading: boolean;
}

// Create a default context value
const defaultAuthContext: AuthContextType = {
  user: null,
  login: async () => Promise.reject(new Error("Not implemented")),
  logout: () => {},
  loading: true,
};

// Create the AuthContext
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Create the AuthProvider component
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // To manage loading state

  useEffect(() => {
    // Check for existing session or user
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (formData: { username: string; password: string }): Promise<User> => {
    const { username, password } = formData;

    // Validate input fields
    if (!username || !password) {
      return Promise.reject(new Error("Username and password are required"));
    }

    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });

      const userData: User = { username, ...response }; // Include any additional data returned from the server

      // Set user in state and session storage
      setUser(userData);
      sessionStorage.setItem("user", JSON.stringify(userData)); // Store in session storage

      return userData;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user"); // Remove user from session storage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
