"use client";

import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = "https://authtask-8bps.onrender.com";

  useEffect(() => {
    // Check if user is logged in on page load
    const checkLoggedIn = async () => {
      try {
        const response = await fetch(`${API_URL}/api/profile`, {
          method: "GET",
          credentials: "include",
        });
        // console.log(" : ", response);
        if (response.ok) {
          const data = await response.json();
          setUser({
            name: data.message.split(" ").pop(), // Extract name from welcome message
            email: data.email,
          });
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Register user
  const register = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      return await response.json();
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: "Registration failed" };
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        // Fetch user profile after successful login
        const profileResponse = await fetch(`${API_URL}/api/profile`, {
          method: "GET",
          credentials: "include",
        });

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setUser({
            name: profileData.message.split(" ").pop(), // Extract name from welcome message
            email: profileData.email,
          });
        }
      }

      return data;
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Login failed" };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      const response = await fetch(`${API_URL}/api/logout`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setUser(null);
      }

      return data;
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, message: "Logout failed" };
    }
  };

  // Update email
  const updateEmail = async (emailData) => {
    try {
      const response = await fetch(`${API_URL}/api/updateEmail`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setUser((prev) => ({
          ...prev,
          email: emailData.newEmail,
        }));
      }

      return data;
    } catch (error) {
      console.error("Update email error:", error);
      return { success: false, message: "Email update failed" };
    }
  };

  // Update password
  const updatePassword = async (passwordData) => {
    try {
      const response = await fetch(`${API_URL}/api/updatePassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordData),
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setUser(null); // Logout after password change
      }

      return data;
    } catch (error) {
      console.error("Update password error:", error);
      return { success: false, message: "Password update failed" };
    }
  };

  // Delete account
  const deleteAccount = async () => {
    try {
      const response = await fetch(`${API_URL}/api/deleteAccount`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setUser(null);
      }

      return data;
    } catch (error) {
      console.error("Delete account error:", error);
      return { success: false, message: "Account deletion failed" };
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateEmail,
    updatePassword,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
