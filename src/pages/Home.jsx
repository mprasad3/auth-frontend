"use client"

import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="home-container">
      <h1>Welcome to Auth App</h1>
      <p>A simple authentication application</p>

      {user ? (
        <div className="welcome-message">
          <p>
            You are logged in as <strong>{user.name}</strong>
          </p>
          <Link to="/profile" className="btn">
            Go to Profile
          </Link>
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/login" className="btn">
            Login
          </Link>
          <Link to="/register" className="btn btn-outline">
            Register
          </Link>
        </div>
      )}
    </div>
  )
}

export default Home

