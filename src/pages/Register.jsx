"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Alert from "../components/Alert";
import "../styles/Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPass) {
      setAlert({ message: "Passwords do not match", type: "error" });
      return;
    }

    setIsLoading(true);

    try {
      const response = await register(formData);

      if (response.success) {
        setAlert({ message: "Registration successful!", type: "success" });
        setTimeout(() => navigate("/login"), 1500)
      } else {
        setAlert({
          message: response.message || "Registration failed",
          type: "error",
        });
      }
    } catch (error) {
      setAlert({ message: "An error occurred", type: "error" });
      console.log("error in registration ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {alert && <Alert message={alert.message} type={alert.type} />}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
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

        <div className="form-group">
          <label htmlFor="confirmPass">Confirm Password</label>
          <input
            type="password"
            id="confirmPass"
            name="confirmPass"
            value={formData.confirmPass}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="auth-redirect">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
