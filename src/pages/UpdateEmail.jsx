"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Alert from "../components/Alert"
import "../styles/Auth.css"

const UpdateEmail = () => {
  const { user, updateEmail } = useAuth()
  const [formData, setFormData] = useState({
    email: user?.email || "",
    newEmail: "",
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

    if (formData.email === formData.newEmail) {
      setAlert({ message: "New email must be different from current email", type: "error" })
      return
    }

    setIsLoading(true)

    try {
      const response = await updateEmail(formData)

      if (response.success) {
        setAlert({ message: "Email updated successfully!", type: "success" })
        setTimeout(() => navigate("/profile"), 1500)
      } else {
        setAlert({ message: response.message || "Failed to update email", type: "error" })
      }
    } catch (error) {
      setAlert({ message: "An error occurred", type: "error" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <h2>Update Email</h2>
      {alert && <Alert message={alert.message} type={alert.type} />}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Current Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="newEmail">New Email</label>
          <input
            type="email"
            id="newEmail"
            name="newEmail"
            value={formData.newEmail}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Email"}
        </button>

        <button type="button" className="btn btn-outline btn-block" onClick={() => navigate("/profile")}>
          Cancel
        </button>
      </form>
    </div>
  )
}

export default UpdateEmail

