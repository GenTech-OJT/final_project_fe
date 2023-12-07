import React, { useEffect, useState } from 'react'
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Typography,
  Space,
  message,
  Upload,
  Checkbox,
  Card,
} from 'antd'
import { useNavigate } from 'react-router'
import {
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { Formik } from 'formik'
import * as Yup from 'yup'
import './create.css'

const CreateEmployee = () => {
  const navigate = useNavigate()
  const [isManager, setIsManager] = useState(false)
  const [formLayout, setFormLayout] = useState('horizontal')
  const [avatar, setAvatar] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    const handleResize = () => {
      setFormLayout(window.innerWidth < 700 ? 'vertical' : 'horizontal')
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const onChange = e => {
    const checked = e.target.checked
    setIsManager(checked)
    console.log(`checked = ${checked}`)
  }

  const checkFile = file => {
    const isImage = file.type.startsWith('image/')

    if (!isImage) {
      message.error('You can only upload image files!')
    } else {
      setAvatar(file)
    }

    return false
  }

  const initialValues = {
    name: '',
    email: '',
    code: '',
    phone: '',
    identity: '',
    dob: null,
    gender: 'male',
    status: true,
    position: 'Developer',
    manager: '',
    skills: [{ skill: '', experience: '' }],
    description: '',
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^([a-zA-Z]\s*)+$/, 'Please input a valid name!')
      .min(3, 'Name must be at least 3 characters')
      .max(40, 'Name must be at most 40 characters')
      .required('Name is required'),
    // email: Yup.string()
    //   .email('Email không hợp lệ')
    //   .required('Vui lòng nhập email'),
    // code: Yup.string(),
    // phone: Yup.string()
    //   .required('Phone number is required')
    //   .matches(/^[0-9-]{10,}$/, 'Please enter a valid 10-digit phone number!'),
    // identity: Yup.string()
    //   .required('Citizen Identity Card is required')
    //   .matches(
    //     /^[a-zA-Z0-9]{1,20}$/,
    //     'Please enter a valid Citizen Identity Card!'
    //   ),
    // dob: Yup.date().required('Date of Birth is required'),
    // manager: Yup.string(),
    // skills: Yup.array().of(
    //   Yup.object().shape({
    //     skill: Yup.string().required('Skill is required'),
    //     experience: Yup.string().required('Experience is required'),
    //   })
    // ),
    // description: Yup.string(),
  })

  const handleFormSubmit = async values => {
    console.log(values)
    try {
      const formData = new FormData()
      if (avatar != null) {
        formData.append('avatar', avatar)
      } else {
        formData.append('avatar', null)
      }

      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value)
      })

      formData.append('isManager', isManager)

      formData.forEach((value, key) => {
        console.log('Form Data: ', `${key}: ${value}`)
      })

      await fetch('http://localhost:3000/employees', {
        method: 'POST',
        body: formData,
      })

      message.success('Employee created successfully!')
      navigate('/employees')
    } catch (error) {
      console.error('Error creating employee:', error)
      message.error('Error creating employee. Please try again.')
    }
  }

  return (
    <>
      <button
        className="back-to-list-button"
        onClick={() => navigate('/employees')}
      >
        <ArrowLeftOutlined style={{ marginRight: '5px', fontSize: '12px' }} />
        Back
      </button>
      <Card
        title="CREATE EMPLOYEE"
        bordered={false}
        style={{
          width: '100%',
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form
              labelCol={{
                span: formLayout === 'vertical' ? 24 : 6,
              }}
              wrapperCol={{
                span: formLayout === 'vertical' ? 24 : 18,
              }}
              labelAlign="left"
              style={{
                maxWidth: 700,
              }}
              form={form}
              layout={formLayout}
              onFinish={handleSubmit}
            >
              <Form.Item
                label="Name"
                name="name"
                validateStatus={errors.name && touched.name ? 'error' : ''}
                help={errors.name && touched.name && errors.name}
              >
                <Input
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                // validateStatus={errors.email && touched.email ? 'error' : ''}
                // help={errors.email && touched.email && errors.email}
              >
                <Input
                // value={values.email}
                // onChange={handleChange}
                // onBlur={handleBlur}
                />
              </Form.Item>
              <Form.Item label="Code" name="code">
                <Input />
              </Form.Item>
              <Form.Item label="Phone" name="phone">
                <Input />
              </Form.Item>
              <Form.Item label="Identity Card" name="identity">
                <Input />
              </Form.Item>
              <Form.Item label="Date of Birth" name="dob">
                <DatePicker placement="bottomRight" />
              </Form.Item>
              <Form.Item label="Gender" name="gender">
                <Select>
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Status" name="status">
                <Select>
                  <Select.Option value={true}>Active</Select.Option>
                  <Select.Option value={false}>Inactive</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Position" name="position">
                <Select>
                  <Select.Option value="Developer">Developer</Select.Option>
                  <Select.Option value="Quality Assurance">
                    Tester
                  </Select.Option>
                  <Select.Option value="CEO">CEO</Select.Option>
                  <Select.Option value="President">President</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="is Manager" name="isManager">
                <Checkbox onChange={onChange} checked={isManager}></Checkbox>
              </Form.Item>
              <Form.Item label="Manager" name="manager">
                <Input />
              </Form.Item>
              <Form.Item label="List">
                <Form.List name="skills">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{
                            display: 'flex',
                            marginBottom: 8,
                          }}
                          align="baseline"
                        >
                          <Form.Item {...restField} name={[name, 'skill']}>
                            <Input placeholder="Skill" />
                          </Form.Item>
                          <Form.Item {...restField} name={[name, 'experience']}>
                            <Input placeholder="Experience (Years)" />
                          </Form.Item>
                          <MinusCircleOutlined
                            onClick={() => {
                              if (fields.length > 1) {
                                remove(name)
                              }
                            }}
                            disabled={fields.length === 1}
                          />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add Skill
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>

              <Form.Item label="Description" name="description">
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item label="Avatar">
                <Upload
                  name="avatar"
                  listType="picture"
                  accept="image/*"
                  maxCount={1}
                  action="http://localhost:3000/employees"
                  beforeUpload={checkFile}
                  onRemove={() => setAvatar(null)}
                >
                  <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Card>
    </>
  )
}

export default CreateEmployee
