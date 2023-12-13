import React from 'react'
import { Navigate, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const isLoggedIn = localStorage.getItem('isLoggedIn') // Kiểm tra trạng thái đăng nhập
  // thuộc tính replace của thành phần <Navigate> được sử dụng để thay thế mục nhập hiện tại trong ngăn xếp lịch sử (history stack). Khi thuộc tính replace được đặt là true, nó sẽ thay thế URL hiện tại trong ngăn xếp lịch sử bằng URL mới.
  return isAuthenticated || isLoggedIn ? (
    component
  ) : (
    <Navigate to="/login" replace />
  )
}

export default PrivateRoute
