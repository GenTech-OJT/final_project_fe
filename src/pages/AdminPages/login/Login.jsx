import { useNavigate } from 'react-router'
import { Button, Checkbox, Form, Input, Typography, Select, Space } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { showToast } from '@components/Toast/toast'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './login.css'

const { Text, Title } = Typography

export default function App() {
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
  const { t, i18n } = useTranslation('translation')
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem('selectedLanguage') || 'eng'
  )

  const changeLanguage = value => {
    setSelectedLanguage(value)
    i18n.changeLanguage(value)
    // Save selected language to localStorage
    localStorage.setItem('selectedLanguage', value)
  }

  // Update language
  useEffect(() => {
    i18n.changeLanguage(selectedLanguage)
  }, [selectedLanguage, i18n])
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
    <>
      <div className="language_container">
        <Space wrap>
          <Select
            value={selectedLanguage}
            style={{
              width: 120,
            }}
            onChange={changeLanguage}
            options={[
              {
                value: 'eng',
                label: t('English'),
              },
              {
                value: 'vi',
                label: t('Vietnamese'),
              },
            ]}
          />
        </Space>
      </div>
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
                <div className="remember_me">
                  <Field name="remember">
                    {({ field }) => (
                      <Form.Item valuePropName="checked">
                        <Checkbox {...field}>Remember me</Checkbox>
                      </Form.Item>
                    )}
                  </Field>
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
