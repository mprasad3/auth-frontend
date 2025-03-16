"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
console.log("user : ",user);
  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute

