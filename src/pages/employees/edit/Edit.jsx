/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
  Upload,
  message,
} from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import './Edit.css'
import { useTranslation } from 'react-i18next'
import SelectManager from './SelectManager'
import { useEditEmployee, useGetEmployees } from '@hooks/useEmployee'
import { useQueryClient } from '@tanstack/react-query'
const { Title, Text } = Typography

const EditEmployee = () => {
  const navigate = useNavigate()
  const { data: employeesData } = useGetEmployees({
    pageSize: undefined,
    sortColumn: 'id',
    sortOrder: 'asc',
  })
  const { mutate: editEmployeeApi } = useEditEmployee()

  const { t } = useTranslation('translation')
  const [form] = Form.useForm()
  const { id } = useParams()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [empData, setEmpData] = useState([])
  const [avatar, setAvatar] = useState(null)
  // const [avatar, setAvatar] = useState(null)
  // const [form] = Form.useForm()

  useEffect(() => {
    if (employeesData) {
      const employee = employeesData?.data?.find(employee => employee.id === id)
      if (employee) {
        setEmpData(employee)
        form.setFieldsValue({
          name: employee.name,
          email: employee.email,
          code: employee.code,
          phone: employee.phone,
          identity: employee.identity,
          dob: moment(employee.dob, 'YYYY-MM-DD'),
          gender: employee.gender,
          status: employee.status,
          is_manager: employee.is_manager,
          position: employee.position,
          skills: employee?.skills?.map(skill => ({
            skill: skill.name,
            experience: skill.year,
          })),
          avatar: employee?.avatar,
          manager: employee?.manager,
          description: employee?.description,

          // ... set other form fields
        })
      }
    }
  }, [employeesData, form, id])

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
      editEmployeeApi(updatedData, {
        onSuccess: () => {
          // Xử lý thành công
          message.success('Employee data updated successfully')
          navigate('/employees')
        },
        onError: error => {
          // Xử lý lỗi
          console.error('Failed to update employee data:', error)
          message.error('Failed to update employee data')
        },
        onSettled: () => {
          // Thực hiện các thao tác sau khi hoàn tất (có lỗi hoặc không)
        },
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
                label={
                  <span style={{ fontWeight: 'bold' }}>
                    {t('employee.name_employee')}
                  </span>
                }
                name="name"
                className="text-input-form"
                rules={[
                  {
                    required: true,
                    message: t('validate.name_require'),
                  },
                  {
                    pattern: /^[a-z ,.'-]+$/i,
                    message: t('validate.name_validate'),
                  },
                  {
                    min: 3,
                    message: t('validate.name_validate_min'),
                  },
                  {
                    max: 40,
                    message: t('validate.name_validate_max'),
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
                label={
                  <span style={{ fontWeight: 'bold' }}>
                    {t('employee.email_employee')}
                  </span>
                }
                name="email"
                rules={[
                  {
                    required: true,
                    message: t('validate.email_validate'),
                  },
                  {
                    pattern: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
                    message: t('validate.email_invalid'),
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
              <Form.Item
                label={
                  <span style={{ fontWeight: 'bold' }}>
                    {t('employee.code')}
                  </span>
                }
                name="code"
                className="text-input-form"
              >
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
                label={
                  <span style={{ fontWeight: 'bold' }}>
                    {t('employee.phone_number_employee')}
                  </span>
                }
                name="phone"
                className="text-input-form"
                rules={[
                  {
                    required: true,
                    message: t('validate.phone_validate'),
                  },
                  {
                    pattern: /^[0-9-]{10,}$/,
                    message: t('validate.phone_valid'),
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
                label={
                  <span style={{ fontWeight: 'bold' }}>
                    {t('employee.identity')}
                  </span>
                }
                name="identity"
                className="text-input-form"
                rules={[
                  {
                    required: true,
                    message: t('validate.card_require'),
                  },
                  {
                    pattern: /^[a-zA-Z0-9]{1,20}$/,
                    message: t('validate.card_validate'),
                  },
                ]}
              >
                <Input
                  value={empData?.identity || ''}
                  disabled={true}
                  onChange={e => {
                    form.setFieldsValue({ identity: e.target.value }) // Cập nhật giá trị trường input trong form
                    setEmpData({ ...empData, identity: e.target.value }) // Cập nhật state 'empdata'
                  }}
                />{' '}
              </Form.Item>
              <Form.Item
                label={
                  <span style={{ fontWeight: 'bold' }}>
                    {t('employee.date_of_birth_employee')}
                  </span>
                }
                className="text-input-form"
                name="dob"
                rules={[
                  {
                    required: true,
                    message: t('employee.dob_validate'),
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
                  label={
                    <span style={{ fontWeight: 'bold' }}>
                      {t('employee.gender_employee')}
                    </span>
                  }
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
                  label={
                    <span style={{ fontWeight: 'bold' }}>
                      {t('employee.status_employee')}
                    </span>
                  }
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
                  label={
                    <span style={{ fontWeight: 'bold' }}>
                      {t('employee.position_employee')}
                    </span>
                  }
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

                <SelectManager />
              </div>
            </div>
            <div className="input-container">
              <Form.Item
                label={
                  <span style={{ fontWeight: 'bold' }}>
                    {t('employee.is_manager')}
                  </span>
                }
                name="is_manager"
                className="text-input-form"
              >
                <Select>
                  <Select.Option value={true}>Yes</Select.Option>
                  <Select.Option value={false}>No</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              label={
                <span style={{ fontWeight: 'bold' }}>
                  {t('employee.skill')}
                </span>
              }
            >
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
                              message: t('validate.skills_require'),
                            },
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              message: t('validate.skills_validate'),
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
                              message: t('validate.experience_require'),
                            },
                            {
                              pattern: /^\d*$/,
                              message: t('validate.experience_validate'),
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
                        {t('employee.add_skill')}
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>
            <Form.Item
              label={
                <span style={{ fontWeight: 'bold' }}>
                  {t('employee.description_employee')}
                </span>
              }
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
              <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                {t('employee.avatar')}
              </p>
              {empData?.avatar && (
                <Row
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                  }}
                >
                  {' '}
                  {/* Sử dụng gutter để tạo khoảng cách giữa các cột */}
                  <Col>
                    <img
                      src={empData?.avatar || ''}
                      alt="Avatar"
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                      }}
                    />
                  </Col>
                  <Col span={16}>
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
                  </Col>
                </Row>
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
    </>
  )
}

export default EditEmployee
