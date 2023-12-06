/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { useNavigate } from 'react-router'
import PropTypes from 'prop-types'

const Login = ({ setIsLogin }) => {
  const navigate = useNavigate()
  const handleLogin = () => {
    setIsLogin(true) // Đặt trạng thái đăng nhập thành true
    navigate('/')
  }
  return (
    <div onClick={handleLogin} onKeyDown={handleLogin}>
      Login
    </div>
  )
}

Login.propTypes = {
  setIsLogin: PropTypes.bool.isRequired,
}

export default Login
