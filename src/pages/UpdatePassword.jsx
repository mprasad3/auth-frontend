"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Alert from "../components/Alert"
import "../styles/Auth.css"

const UpdatePassword = () => {
  const { updatePassword } = useAuth()
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  })
  const [alert, setAlert] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.newPassword !== formData.confirmNewPassword) {
      setAlert({ message: "New passwords do not match", type: "error" })
      return
    }

    if (formData.password === formData.newPassword) {
      setAlert({ message: "New password must be different from current password", type: "error" })
      return
    }

    setIsLoading(true)

    try {
      const response = await updatePassword({
        password: formData.password,
        newPassword: formData.newPassword,
      })

      if (response.success) {
        setAlert({ message: "Password updated successfully! Please login again.", type: "success" })
        setTimeout(() => navigate("/login"), 1500)
      } else {
        setAlert({ message: response.message || "Failed to update password", type: "error" })
      }
    } catch (error) {
      setAlert({ message: "An error occurred", type: "error" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <h2>Update Password</h2>
      {alert && <Alert message={alert.message} type={alert.type} />}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="password">Current Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Password"}
        </button>

        <button type="button" className="btn btn-outline btn-block" onClick={() => navigate("/profile")}>
          Cancel
        </button>
      </form>
    </div>
  )
}

export default UpdatePassword

