import { useDispatch } from 'react-redux'
import { Form, Input, Button, message, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { showToast } from '@components/toast/ToastCustom'
import './Login.css'
import { useLogin } from '@hooks/useAuth'
import { login } from '@redux/Slice/authSlice'

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

  const { mutate: loginApi, isSuccess } = useLogin()

  const onFinish = async values => {
    loginApi(
      { email: values.email, password: values.password },
      {
        onSuccess: data => {
          const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzBiOThiM2I2MTViZjIwYzdmODQzYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMjMxNTk2MiwiZXhwIjoxNzAyMzE1OTkyfQ.HF-hz18XXtDSgxMJiJchsXiiFww6qQFfvrbHhMnZc3w'
          const refreshToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzBiOThiM2I2MTViZjIwYzdmODQzYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMjMxNTk2MiwiZXhwIjoxNzMzODUxOTYyfQ.D3Lq6_jL_N5Cie2BZDA4CisMv_m5BNg2CaTCWMUCJmk'
          dispatch(login({ token, refreshToken }))
          localStorage.setItem('isLoggedIn', 'true')
          navigate('/admin')
          showToast('Login Successful !', 'success')
        },
      }
    )
  }

  console.log(isSuccess)

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
