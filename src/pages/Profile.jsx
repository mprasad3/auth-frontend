"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Alert from "../components/Alert"
import "../styles/Profile.css"

const Profile = () => {
  const { user, deleteAccount } = useAuth()
  const [alert, setAlert] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const navigate = useNavigate()

  const handleDeleteAccount = async () => {
    if (!showConfirm) {
      setShowConfirm(true)
      return
    }

    setIsDeleting(true)

    try {
      const response = await deleteAccount()

      if (response.success) {
        setAlert({ message: "Account deleted successfully", type: "success" })
        setTimeout(() => navigate("/"), 1500)
      } else {
        setAlert({ message: response.message || "Failed to delete account", type: "error" })
        setShowConfirm(false)
      }
    } catch (error) {
      setAlert({ message: "An error occurred", type: "error" })
      setShowConfirm(false)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {alert && <Alert message={alert.message} type={alert.type} />}

      <div className="profile-card">
        <div className="profile-info">
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>

        <div className="profile-actions">
          <Link to="/update-email" className="btn">
            Update Email
          </Link>
          <Link to="/update-password" className="btn">
            Update Password
          </Link>

          {!showConfirm ? (
            <button onClick={handleDeleteAccount} className="btn btn-danger">
              Delete Account
            </button>
          ) : (
            <button onClick={handleDeleteAccount} className="btn btn-danger" disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Confirm Delete"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile

