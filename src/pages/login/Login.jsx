import { useDispatch } from 'react-redux'
import { Form, Input, Button, message, Typography } from 'antd'
import { login } from '../../redux/authSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { showToast } from '@components/toast/Toast'
import './Login.css'

const { Text, Title } = Typography

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialValues = {
    email: '',
    password: '',
    remember: true,
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Please input your Email!'),
    password: Yup.string().required('Please input your Password!'),
  })

  const onFinish = async values => {
    // try {
    //   // Replace with actual API endpoint
    //   const response = await axios.post(
    //     'http://localhost:3001/api/users/login',
    //     {
    //       email: values.email,
    //       password: values.password,
    //     }
    //   )

    //   const { token, refreshToken } = response.data
    //   dispatch(login({ token, refreshToken }))
    //   localStorage.setItem('isLoggedIn', 'true') // Lưu trạng thái đăng nhập

    //   message.success('Login successful')
    //   navigate('/admin')
    // } catch (error) {
    //   console.error('Login failed:', error.message)
    //   message.error('Invalid credentials')
    // }
    try {
      const response = await fetch(
        'https://final-project-be.onrender.com/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        }
      )
      const data = await response.json()
      if (response.ok) {
        // localStorage.setItem('admin', data.token)
        const token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzBiOThiM2I2MTViZjIwYzdmODQzYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMjMxNTk2MiwiZXhwIjoxNzAyMzE1OTkyfQ.HF-hz18XXtDSgxMJiJchsXiiFww6qQFfvrbHhMnZc3w'
        const refreshToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzBiOThiM2I2MTViZjIwYzdmODQzYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMjMxNTk2MiwiZXhwIjoxNzMzODUxOTYyfQ.D3Lq6_jL_N5Cie2BZDA4CisMv_m5BNg2CaTCWMUCJmk'
        dispatch(login({ token, refreshToken }))
        localStorage.setItem('isLoggedIn', 'true')
        navigate('/admin')
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
    <>
      <section className="section">
        <div className="container">
          <div className="header">
            <Title className="title">Sign in</Title>
            <Text className="text">
              Please enter your details below to sign in.
            </Text>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onFinish}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onFinish={handleSubmit} layout="vertical">
                <div className="input_email">
                  <Form.Item
                    label="Email"
                    validateStatus={
                      errors.email && touched.email ? 'error' : ''
                    }
                    help={errors.email && touched.email ? errors.email : ''}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Item>
                </div>
                <div className="input_password">
                  <Form.Item
                    label="Password"
                    validateStatus={
                      errors.password && touched.password ? 'error' : ''
                    }
                    help={
                      errors.password && touched.password ? errors.password : ''
                    }
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Item>
                </div>
                <Button block type="primary" htmlType="submit">
                  Log in
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </>
  )
}

export default Login
