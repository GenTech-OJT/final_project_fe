import React, { useState } from 'react'
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
} from 'antd'
import { useNavigate } from 'react-router'
import {
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import './create.css'

const { Title } = Typography

const Create = () => {
  const navigate = useNavigate()
  const [avatar, setAvatar] = useState(null)
  const [form] = Form.useForm()

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
    code: '',
    name: '',
    phone: '',
    identity: '',
    dob: null,
    gender: 'male',
    status: true,
    isManager: true,
    position: 'Developer',
    manager: '',
    skills: [{ skill: '', experience: '' }],
    avatar: null,
    description: '',
  }

  const handleFormSubmit = async values => {
    console.log(values)
    try {
      const formData = new FormData()
      if (avatar != null) {
        formData.append('avatar', avatar)
      }

      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value)
      })

      formData.forEach((value, key) => {
        console.log('Form Data: ', `${key}: ${value}`)
      })

      await fetch('http://localhost:3000/employees', {
        method: 'POST',
        body: formData,
      })

      message.success('Employee created successfully!')
      // navigate('/users')
    } catch (error) {
      console.error('Error creating employee:', error)
      message.error('Error creating employee. Please try again.')
    }
  }

  return (
    <div className="page-container">
      <button
        className="back-to-list-button"
        onClick={() => navigate('/users')}
      >
        <ArrowLeftOutlined style={{ marginRight: '7px' }} />
        Back
      </button>
      <Title className="page-title">CREATE EMPLOYEE</Title>
      <div className="create-container">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={initialValues}
        >
          <div className="input-container">
            <Form.Item
              label="Name"
              name="name"
              className="text-input-form"
              rules={[
                {
                  required: true,
                  pattern: new RegExp('^([a-zA-Z]\\s*)+$'),
                  message: 'Please input the employee name !',
                },
                {
                  min: 3,
                  max: 40,
                  message: 'Name must be between 3 and 40 characters',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Code" name="code" className="text-input-form">
              <Input />
            </Form.Item>
          </div>
          <div className="input-container">
            <Form.Item
              label="Phone"
              name="phone"
              className="text-input-form"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
                {
                  pattern: /^[0-9-]{10,}$/,
                  message: 'Please enter a valid 10-digit phone number!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Citizen Identity Card"
              name="identity"
              className="text-input-form"
              rules={[
                {
                  required: true,
                  message: 'Please input your Citizen Identity Card!',
                },
                {
                  pattern: /^[a-zA-Z0-9]{1,20}$/,
                  message: 'Please enter a valid Citizen Identity Card!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="select-container-lg">
            <div className="select-container">
              <Form.Item
                label="Date of Birth"
                name="dob"
                className="select-width-dobgs"
                rules={[
                  {
                    required: true,
                    message: 'Please select your Date of Birth!',
                  },
                ]}
              >
                <DatePicker placement="bottomRight" style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                label="Gender"
                name="gender"
                className="select-width-dobgs"
              >
                <Select>
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Status"
                name="status"
                className="select-width-dobgs"
              >
                <Select>
                  <Select.Option value={true}>Active</Select.Option>
                  <Select.Option value={false}>Inactive</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="select-container">
              <Form.Item
                label="is Manager?"
                name="isManager"
                className="select-width-im"
              >
                <Select>
                  <Select.Option value={true}>Yes</Select.Option>
                  <Select.Option value={false}>No</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Position"
                name="position"
                className="select-width-p"
              >
                <Select>
                  <Select.Option value="Developer">Developer</Select.Option>
                  <Select.Option value="Quality Assurance">
                    Tester
                  </Select.Option>
                  <Select.Option value="CEO">CEO</Select.Option>
                  <Select.Option value="President">President</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Manager"
                name="manager"
                className="manager-input-width"
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="input-container">
            <div className="skill-input">
              <p style={{ marginBottom: '8px' }}>Skills</p>
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
                        <Form.Item
                          {...restField}
                          name={[name, 'skill']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: 'Please input skill!',
                            },
                          ]}
                        >
                          <Input placeholder="Skill" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'experience']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: 'Please input experience!',
                            },
                          ]}
                        >
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
            </div>
            <Form.Item
              label="Description"
              name="description"
              className="text-input-form"
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </div>
          <Form.Item>
            <p style={{ marginBottom: '8px' }}>Avatar</p>
            <Upload
              name="avatar"
              listType="picture"
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Create
