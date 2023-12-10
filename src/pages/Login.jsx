import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Input, Button, message } from 'antd'
import { login } from '../redux/authSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async values => {
    try {
      // Replace with actual API endpoint
      const response = await axios.post(
        'http://localhost:3001/api/users/login',
        {
          email: values.email,
          password: values.password,
        }
      )

      const { token, refreshToken } = response.data
      dispatch(login({ token, refreshToken }))
      localStorage.setItem('isLoggedIn', 'true') // Lưu trạng thái đăng nhập

      message.success('Login successful')
      navigate('/admin')
    } catch (error) {
      console.error('Login failed:', error.message)
      message.error('Invalid credentials')
    }
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div style={{ width: '300px', margin: 'auto', marginTop: '100px' }}>
      <Form
        name="login-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
