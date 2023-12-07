import { useNavigate } from 'react-router'
import { Button, Checkbox, Form, Input, Typography } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { showToast } from '@components/Toast/toast'
import './login.css'

const { Text, Title } = Typography

export default function App() {
  const navigate = useNavigate()
  const onFinish = async values => {
    console.log('Received values of form: ', values)
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      })
      const data = await response.json()
      if (response.ok) {
        console.log('Login successful:', data)
        localStorage.setItem('admin', data.token)
        navigate('/')
        showToast('Login Successful !', 'success')
      } else {
        console.error('Login failed:', data.error)
        showToast('Login Failed !', 'error')
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="header">
          <Title className="title">Sign in</Title>
          <Text className="text">
            Please enter your details below to sign in.
          </Text>
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button block="true" type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  )
}
