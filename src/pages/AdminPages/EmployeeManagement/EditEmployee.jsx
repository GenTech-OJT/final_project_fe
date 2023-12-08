import React, { useEffect, useState } from 'react'
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  message,
  Upload,
  Checkbox,
  Card,
} from 'antd'
import { useNavigate, useParams } from 'react-router'
import {
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { Formik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import './editEmployee.css'

const EditEmployee = () => {
  const navigate = useNavigate()
  const [formLayout, setFormLayout] = useState('horizontal')
  const [form] = Form.useForm()
  const { id } = useParams()

  const [empData, setEmpData] = useState([])
  const [avatar, setAvatar] = useState(null)

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

  // const checkFile = file => {
  //   const isImage = file.type.startsWith('image/')

  //   if (!isImage) {
  //     message.error('You can only upload image files!')
  //   } else {
  //     setAvatar(file)
  //   }

  //   return false
  // }

  const checkFile = file => {
    const isImage = file.type.startsWith('image/')

    if (!isImage) {
      message.error('You can only upload image files!')
    } else {
      setAvatar(file)
    }

    return false
  }
  useEffect(() => {
    fetch('http://localhost:3000/employees/' + id)
      .then(res => {
        return res.json()
      })
      .then(res => {
        setEmpData(res)
        form.setFieldsValue({
          name: res.name,
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

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^([a-zA-Z]\s*)+$/, 'Please input a valid name!')
      .min(3, 'Name must be at least 3 characters')
      .max(40, 'Name must be at most 40 characters')
      .required('Please input name'),
    email: Yup.string()
      .email('Please input a valid email!')
      .required('Please input name'),
    code: Yup.string().required('Please input code'),
    phone: Yup.string()
      .required('Please input phone number')
      .matches(/^[0-9-]{10,}$/, 'Please input a valid 10-digit phone number!'),
    identity: Yup.string()
      .required('Please input the citizen identity card')
      .matches(
        /^[a-zA-Z0-9]{1,20}$/,
        'Please input a valid citizen identity card!'
      ),
    dob: Yup.date().required('Please input date of birth'),
    gender: Yup.string(),
    status: Yup.string(),
    position: Yup.string(),
    is_manager: Yup.bool(),
    manager: Yup.string(),
    // skills: Yup.array().of(
    //   Yup.object().shape({
    //     skill: Yup.string().required('Skill is required'),
    //     experience: Yup.string().required('Experience is required'),
    //   })
    // ),
    description: Yup.string(),
  })

  const handleFormSubmit = () => {
    form.validateFields().then(values => {
      const updatedData = {
        ...empData,
        ...values,
        name: values.name,
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
        title="Edit EMPLOYEE"
        bordered={false}
        style={{
          width: '100%',
        }}
      >
        {empData && (
          <Formik
            initialValues={{
              name: empData.name,
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
              setFieldValue,
              // isSubmitting,
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
                  maxWidth: 600,
                }}
                layout={formLayout}
                onFinish={handleSubmit}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  validateStatus={errors.name && touched.name ? 'error' : ''}
                  help={errors.name && touched.name ? errors.name : ''}
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
                  label="Email"
                  name="email"
                  validateStatus={errors.email && touched.email ? 'error' : ''}
                  help={errors.email && touched.email ? errors.email : ''}
                >
                  <Input
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
                <Form.Item
                  label="Code"
                  name="code"
                  validateStatus={errors.code && touched.code ? 'error' : ''}
                  help={errors.code && touched.code ? errors.code : ''}
                >
                  <Input
                    value={empData?.code || ''}
                    onChange={e => {
                      form.setFieldsValue({ code: e.target.value }) // Cập nhật giá trị trường input trong form
                      setEmpData({ ...empData, code: e.target.value }) // Cập nhật state 'empdata'
                    }}
                  />{' '}
                </Form.Item>
                <Form.Item
                  label="Phone"
                  name="phone"
                  validateStatus={errors.phone && touched.phone ? 'error' : ''}
                  help={errors.phone && touched.phone ? errors.phone : ''}
                >
                  <Input
                    value={empData?.phone || ''}
                    onChange={e => {
                      form.setFieldsValue({ phone: e.target.value }) // Cập nhật giá trị trường input trong form
                      setEmpData({ ...empData, phone: e.target.value }) // Cập nhật state 'empdata'
                    }}
                  />{' '}
                </Form.Item>
                <Form.Item
                  label="Identity Card"
                  name="identity"
                  validateStatus={
                    errors.identity && touched.identity ? 'error' : ''
                  }
                  help={
                    errors.identity && touched.identity ? errors.identity : ''
                  }
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
                  label="Date of Birth"
                  name="dob"
                  className="select-width-dobgs"
                  validateStatus={errors.dob && touched.dob ? 'error' : ''}
                  help={errors.dob && touched.dob ? errors.dob : ''}
                >
                  <DatePicker
                    placement="bottomRight"
                    style={{ width: '100%' }}
                  />
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
                <Form.Item
                  label="Status"
                  name="status"
                  validateStatus={
                    errors.status && touched.status ? 'error' : ''
                  }
                  help={errors.status && touched.status && errors.status}
                >
                  <Select
                    name="status"
                    onChange={value => setFieldValue('status', value)}
                    onBlur={handleBlur}
                    defaultValue={values.status}
                  >
                    <Select.Option value={true}>Active</Select.Option>
                    <Select.Option value={false}>Inactive</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Position"
                  name="position"
                  validateStatus={
                    errors.position && touched.position ? 'error' : ''
                  }
                  help={errors.position && touched.position && errors.position}
                >
                  <Select
                    name="position"
                    onChange={value => setFieldValue('position', value)}
                    onBlur={handleBlur}
                    defaultValue={values.position}
                  >
                    <Select.Option value="Developer">Developer</Select.Option>
                    <Select.Option value="Quality Assurance">
                      Quality Assurance
                    </Select.Option>
                    <Select.Option value="CEO">CEO</Select.Option>
                    <Select.Option value="President">President</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="is Manager" name="isManager">
                  <Checkbox
                    name="isManager"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.isManager}
                  ></Checkbox>
                </Form.Item>
                <Form.Item
                  label="Manager"
                  name="manager"
                  validateStatus={
                    errors.manager && touched.manager ? 'error' : ''
                  }
                  help={errors.manager && touched.manager ? errors.manager : ''}
                >
                  <Input
                    name="manager"
                    value={values.manager}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
                <Form.Item label="Skills">
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
                            <Form.Item
                              {...restField}
                              name={[name, 'experience']}
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
                </Form.Item>

                <Form.Item
                  label="Description"
                  name="description"
                  validateStatus={
                    errors.description && touched.description ? 'error' : ''
                  }
                  help={
                    errors.description &&
                    touched.description &&
                    errors.description
                  }
                >
                  <Input.TextArea
                    rows={4}
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
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
        )}
      </Card>
    </>
  )
}

export default EditEmployee
