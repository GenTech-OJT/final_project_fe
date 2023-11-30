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
  LoadingOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import './create.css'

const { Title, Text } = Typography

const Create = () => {
  const navigate = useNavigate()
  const [avatar, setAvatar] = useState(null)
  const [form] = Form.useForm()

  const checkFile = file => {
    const isImage = file.type.startsWith('image/')
    file.setType('image/png')

    if (!isImage) {
      message.error('You can only upload image files!')
    } else {
      setAvatar(file)
    }

    return false // Prevent automatic upload by returning false
  }

  const initialValues = {
    isManager: true,
    position: '1',
    gender: 'male',
    status: true,
  }

  const handleFormSubmit = async values => {
    console.log(values)
    try {
      // Handle file upload first
      const formData = new FormData()
      if (avatar) {
        formData.append('avatar', avatar.originFileObj)
      }

      // Add other form data to the FormData
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value)
      })

      // Now, submit the form data with the file to the appropriate endpoint
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

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
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
      <Title className="page-title">ADD EMPLOYEE</Title>
      <div className="create-container">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          onFinishFailed={onFinishFailed}
          initialValues={initialValues}
        >
          <Form.Item label="Code" name="code">
            <Input />
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Citizen Identity Card" name="identity">
            <Input />
          </Form.Item>
          <Form.Item label="Date of Birth" name="dob">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Select defaultValue="male">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select defaultValue={true}>
              <Select.Option value={true}>Active</Select.Option>
              <Select.Option value={false}>Inactive</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="is Manager?" name="isManager">
            <Select defaultValue={true}>
              <Select.Option value={true}>Yes</Select.Option>
              <Select.Option value={false}>No</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Position" name="position">
            <Select defaultValue="1">
              <Select.Option value="1">Dev</Select.Option>
              <Select.Option value="2">Tester</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Manager" name="manager">
            <Input />
          </Form.Item>
          {/* <Form.Item></Form.Item> */}
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
                          message: 'Missing Skill',
                        },
                      ]}
                    >
                      <Input placeholder="Skill" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'last']}
                      rules={[
                        {
                          required: true,
                          message: 'Missing Experience',
                        },
                      ]}
                    >
                      <Input placeholder="Experience (Years)" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Upload
            name="avatar"
            listType="picture"
            maxCount={1}
            action="http://localhost:3000/employees"
            beforeUpload={checkFile}
          >
            <Button icon={<UploadOutlined />}>Upload Avatar (Max: 1)</Button>
          </Upload>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
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
