/* eslint-disable no-undef */
import {
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Typography,
  Upload,
  message,
} from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import './edit.css'
import { useTranslation } from 'react-i18next'
const { Title, Text } = Typography

const EditEmployee = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('translation')
  const [form] = Form.useForm()
  const { id } = useParams()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [empData, setEmpData] = useState([])
  const [avatar, setAvatar] = useState(null)
  // const [avatar, setAvatar] = useState(null)
  // const [form] = Form.useForm()

  useEffect(() => {
    fetch('http://localhost:3000/employees/' + id)
      .then(res => {
        return res.json()
      })
      .then(res => {
        setEmpData(res)
        form.setFieldsValue({
          name: res.name,
          email: res.email,
          code: res.code,
          phone: res.phone,
          identity: res.identity,
          dob: moment(res.dob, 'YYYY-MM-DD'),
          gender: res.gender,
          status: res.status,
          is_manager: res.is_manager,
          position: res.position,
          skills: res?.skills?.map(skill => ({
            skill: skill.name,
            experience: skill.year,
          })),
          avatar: res?.avatar,
          manager: res?.manager,
          description: res?.description,

          // ... set other fields similarly
        })
      })
  }, [])

  const handleFormSubmit = () => {
    form.validateFields().then(values => {
      const updatedData = {
        ...empData,
        ...values,
        name: values.name,
        email: values.email,
        code: values.code,
        phone: values.phone,
        identity: values.identity,
        dob: values.dob.format('YYYY-MM-DD'), // Định dạng lại ngày tháng nếu cần thiết
        gender: values.gender,
        status: values.status,
        is_manager: values.is_manager,
        position: values.position,
        avatar: avatar
          ? URL.createObjectURL(avatar.originFileObj)
          : values.avatar, // Updated avatar value
        skills: values.skills.map(skill => ({
          name: skill.skill,
          year: skill.experience,
        })),
        manager: values.manager,
        description: values.description,

        // Các trường thông tin khác cần cập nhật
      }

      // Gửi request PUT lên server
      fetch(`http://localhost:3000/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          // Xử lý phản hồi từ server khi cập nhật thành công
          // Ví dụ: Hiển thị thông báo thành công, điều hướng trang, etc.
          message.success('Employee data updated successfully')
          navigate('/employees')
        })
        .catch(error => {
          // Xử lý lỗi trong quá trình gửi request PUT lên server
          console.error('There was a problem with the fetch operation:', error)
          message.error('Failed to update employee data')
        })
    })
  }

  const checkFile = file => {
    const isImage = file.type.startsWith('image/')

    if (!isImage) {
      message.error('You can only upload image files!')
      setAvatar(null) // Reset avatar to null if the uploaded file is not an image
      return false
    } else {
      if (!file.originFileObj) {
        message.error('Something went wrong with file upload!')
        return false
      }
      setAvatar(file)
      return true
    }
  }

  return (
    <>
      <Card
        title="Edit EMPLOYEE"
        bordered={false}
        style={{
          width: '100%',
        }}
      >
        {empData && (
          <div className="create-container">
            <Form
              layout="vertical"
              form={form}
              onFinish={handleFormSubmit}
              initialValues={{
                name: empData.name,
                email: empData.email,
                code: empData.code,
                phone: empData.phone,
                identity: empData.identity,
                dob: moment(empData.dob, 'YYYY-MM-DD'),
                gender: empData.gender,
                status: empData.status,
                is_manager: empData.is_manager,
                position: empData.position,
                skills: empData?.skills?.map(skill => ({
                  skill: skill.name,
                  experience: skill.year,
                })),
                avatar: empData?.avatar,
                manager: empData?.manager,
                description: empData?.description,

                // ... set other fields similarly
              }}
            >
              <div className="input-container">
                <Form.Item
                  label={t('employee.name_employee')}
                  name="name"
                  className="text-input-form"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the employee name !',
                    },
                    {
                      pattern: /^[a-z ,.'-]+$/i,
                      message: 'Please enter a valid name!',
                    },
                    {
                      min: 3,
                      max: 40,
                      message: 'Name must be between 3 and 40 characters',
                    },
                  ]}
                >
                  <Input
                    value={empData?.name || ''}
                    onChange={e => {
                      form.setFieldsValue({ name: e.target.value }) // Cập nhật giá trị trường input trong form
                      setEmpData({ ...empData, name: e.target.value }) // Cập nhật state 'empdata'
                    }}
                  />{' '}
                </Form.Item>
                <Form.Item
                  label={t('employee.email_employee')}
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the employee email !',
                    },
                    {
                      pattern:
                        '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
                      message: 'Please enter a valid email!',
                    },
                    {
                      min: 3,
                      max: 40,
                      message: 'Email must be between 3 and 40 characters',
                    },
                  ]}
                  className="text-input-form"
                >
                  <Input
                    value={empData?.email || ''}
                    onChange={e => {
                      form.setFieldsValue({ email: e.target.value }) // Cập nhật giá trị trường input trong form
                      setEmpData({ ...empData, email: e.target.value }) // Cập nhật state 'empdata'
                    }}
                  />{' '}
                </Form.Item>
              </div>
              <div className="input-container">
                <Form.Item label="Code" name="code" className="text-input-form">
                  <Input
                    value={empData?.code || ''}
                    disabled={true}
                    onChange={e => {
                      form.setFieldsValue({ code: e.target.value }) // Cập nhật giá trị trường input trong form
                      setEmpData({ ...empData, code: e.target.value }) // Cập nhật state 'empdata'
                    }}
                  />{' '}
                </Form.Item>

                <Form.Item
                  label={t('employee.phone_number_employee')}
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
                  <Input
                    value={empData?.phone || ''}
                    onChange={e => {
                      form.setFieldsValue({ phone: e.target.value }) // Cập nhật giá trị trường input trong form
                      setEmpData({ ...empData, phone: e.target.value }) // Cập nhật state 'empdata'
                    }}
                  />{' '}
                </Form.Item>
              </div>
              <div className="input-container">
                <Form.Item
                  label={t('employee.identity_employee')}
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
                  <Input
                    value={empData?.identity || ''}
                    onChange={e => {
                      form.setFieldsValue({ identity: e.target.value }) // Cập nhật giá trị trường input trong form
                      setEmpData({ ...empData, identity: e.target.value }) // Cập nhật state 'empdata'
                    }}
                  />{' '}
                </Form.Item>
                <Form.Item
                  label={t('employee.date_of_birth_employee')}
                  className="text-input-form"
                  name="dob"
                  rules={[
                    {
                      required: true,
                      message: 'Please select your Date of Birth!',
                    },
                  ]}
                >
                  <DatePicker
                    placement="bottomRight"
                    style={{ width: '100%' }}
                    disabledDate={current => current.isAfter(moment())} // Disable future dates
                  />
                </Form.Item>
              </div>
              <div className="select-container-lg">
                <div className="select-container">
                  <Form.Item
                    label={t('employee.gender_employee')}
                    name="gender"
                    className="select-width-dobgs"
                  >
                    <Select>
                      <Select.Option value="male">Male</Select.Option>
                      <Select.Option value="female">Female</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    className="select-width-dobgs"
                    label={t('employee.status_employee')}
                    name="status"
                  >
                    <Select>
                      <Select.Option value={true}>Active</Select.Option>
                      <Select.Option value={false}>Inactive</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="select-container">
                  <Form.Item
                    label={t('employee.position_employee')}
                    name="position"
                    className="select-width-dobgs"
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
                    label={t('employee.manager')}
                    name="manager"
                    className="select-width-dobgs"
                  >
                    <Input
                      value={empData?.manager || ''}
                      onChange={e => {
                        form.setFieldsValue({ manager: e.target.value }) // Cập nhật giá trị trường input trong form
                        setEmpData({ ...empData, manager: e.target.value }) // Cập nhật state 'empdata'
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="input-container">
                <Form.Item
                  label={t('employee.is_manager')}
                  name="is_manager"
                  className="text-input-form"
                >
                  <Select>
                    <Select.Option value={true}>Yes</Select.Option>
                    <Select.Option value={false}>No</Select.Option>
                  </Select>
                </Form.Item>
              </div>

              <Form.Item label={t('employee.skill')}>
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
                          {t('employee.add_skill')}
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>
              <Form.Item
                label={t('employee.description_employee')}
                name="description"
              >
                <Input.TextArea
                  rows={4}
                  value={empData?.description || ''}
                  onChange={e => {
                    form.setFieldsValue({ description: e.target.value }) // Cập nhật giá trị trường input trong form
                    setEmpData({ ...empData, description: e.target.value }) // Cập nhật state 'empdata'
                  }}
                />{' '}
              </Form.Item>
              <Form.Item name="avatar">
                <p style={{ marginBottom: '8px' }}>{t('employee.avatar')}</p>
                {empData?.avatar && (
                  <>
                    <img
                      src={empData?.avatar || ''} // Đặt đường dẫn hình ảnh của avatar vào đây
                      alt="Avatar"
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                      }}
                    />
                    <Upload
                      name="avatar"
                      listType="picture"
                      accept="image/*"
                      maxCount={1}
                      action="http://localhost:3000/employees"
                      beforeUpload={checkFile}
                      onRemove={() => setAvatar(null)}
                    >
                      <Button icon={<UploadOutlined />}>
                        {t('employee.upload_avatar')}
                      </Button>
                    </Upload>
                  </>
                )}
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {t('employee.submit')}
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Card>
    </>
  )
}

export default EditEmployee
