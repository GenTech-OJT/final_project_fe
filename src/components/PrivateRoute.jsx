import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const isLoggedIn = localStorage.getItem('isLoggedIn') // Kiểm tra trạng thái đăng nhập

  return isAuthenticated || isLoggedIn ? (
    component
  ) : (
    <Navigate to="/login" replace />
  )
}

export default PrivateRoute
