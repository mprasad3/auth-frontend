"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Alert from "../components/Alert"
import "../styles/Auth.css"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [alert, setAlert] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await login(formData)
      console.log("login resp : ",response)
      if (response.success) {
        setAlert({ message: "Login successful!", type: "success" })
        setTimeout(() => navigate("/profile"), 1500)
      } else {
        
        setAlert({ message: response.message || "Login failed", type: "error" })
      }
    } catch (error) {
      setAlert({ message: "An error occurred", type: "error" })
      console.log("error : ",error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {alert && <Alert message={alert.message} type={alert.type} />}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="auth-redirect">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}

export default Login

