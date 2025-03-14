"use client"

import { useState, useEffect } from "react"
import "../styles/App.css"

const Alert = ({ message, type, duration = 3000 }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  if (!visible) return null

  return <div className={`alert ${type}`}>{message}</div>
}

export default Alert

