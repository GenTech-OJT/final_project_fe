import { useState } from 'react'
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
} from 'antd'
import { useNavigate } from 'react-router'
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { Formik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import './Create.css'
import { showToast } from '@components/toast/Toast'

const EmployeeCreate = () => {
  const navigate = useNavigate()
  const [avatar, setAvatar] = useState(null)
  // const [form] = Form.useForm()

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
    isManager: false,
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
      .required('Please input name'),
    email: Yup.string()
      .email('Please input a valid email!')
      .required('Please input email'),
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
    isManager: Yup.bool(),
    manager: Yup.string(),
    skills: Yup.array()
      .of(
        Yup.object().shape({
          skill: Yup.string().required('Skill is required'),
          experience: Yup.string()
            .required('Experience is required')
            .matches(/^\d+(\.\d+)?$/, 'Experience must be a number'),
        })
      )
      .required('Must have skills')
      .min(1, 'Minimum of 1 skill'),
    description: Yup.string(),
  })

  const handleFormSubmit = values => {
    const formattedValues = {
      ...values,
      dob: moment(values.dob.$d).format('YYYY-MM-DD'),
    }
    // console.log(formattedValues)
    try {
      const formData = new FormData()
      if (avatar != null) {
        formData.append('avatar', avatar)
      } else {
        formData.append('avatar', null)
      }

      Object.entries(formattedValues).forEach(([key, value]) => {
        formData.append(key, value)
      })

      formData.forEach((value, key) => {
        console.log('Form Data: ', `${key}: ${value}`)
      })

      fetch('https://final-project-be.onrender.com/employees', {
        method: 'POST',
        body: formData,
      })

      showToast('Employee created successfully!', 'success')
      navigate('/employees')
    } catch (error) {
      showToast('Error creating employee. Please try again.', 'error')
    }
  }

  return (
    <>
      <h2>Create Employee</h2>
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
          setFieldValue,
          validateField,
          // isSubmitting,
        }) => (
          <Form
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            labelAlign="left"
            style={{
              maxWidth: 600,
            }}
            onFinish={handleSubmit}
            initialValues={initialValues}
          >
            <Form.Item
              label="Name"
              name="name"
              required
              validateStatus={errors.name && touched.name ? 'error' : ''}
              help={errors.name && touched.name ? errors.name : ''}
            >
              <Input
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              required
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
              required
              validateStatus={errors.code && touched.code ? 'error' : ''}
              help={errors.code && touched.code ? errors.code : ''}
            >
              <Input
                name="code"
                value={values.code}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              required
              validateStatus={errors.phone && touched.phone ? 'error' : ''}
              help={errors.phone && touched.phone ? errors.phone : ''}
            >
              <Input
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
              label="Identity Card"
              name="identity"
              required
              validateStatus={
                errors.identity && touched.identity ? 'error' : ''
              }
              help={errors.identity && touched.identity ? errors.identity : ''}
            >
              <Input
                name="identity"
                value={values.identity}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
              label="Date of Birth"
              name="dob"
              required
              validateStatus={errors.dob && touched.dob ? 'error' : ''}
              help={errors.dob && touched.dob ? errors.dob : ''}
            >
              <DatePicker
                placement="bottomRight"
                name="dob"
                className="dob"
                onChange={value => setFieldValue('dob', value)}
                onBlur={handleBlur}
                value={values.dob}
              />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
              validateStatus={errors.gender && touched.gender ? 'error' : ''}
              help={errors.gender && touched.gender && errors.gender}
            >
              <Select
                name="gender"
                onChange={value => setFieldValue('gender', value)}
                onBlur={handleBlur}
                defaultValue={values.gender}
              >
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
              validateStatus={errors.status && touched.status ? 'error' : ''}
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
              validateStatus={errors.manager && touched.manager ? 'error' : ''}
              help={errors.manager && touched.manager ? errors.manager : ''}
            >
              <Input
                name="manager"
                value={values.manager}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item label="Skills" required>
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
                          validateStatus={
                            errors?.skills?.[name]?.skill &&
                            touched?.skills?.[name]?.skill
                              ? 'error'
                              : ''
                          }
                          help={
                            errors?.skills?.[name]?.skill &&
                            touched?.skills?.[name]?.skill
                              ? errors.skills[name].skill
                              : ''
                          }
                        >
                          <Input
                            placeholder="Skill"
                            onChange={e => {
                              setFieldValue(
                                `skills[${name}].skill`,
                                e.target.value
                              )
                              validateField(`skills[${name}].skill`)
                            }}
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'experience']}
                          validateStatus={
                            errors?.skills?.[name]?.experience &&
                            touched?.skills?.[name]?.experience
                              ? 'error'
                              : ''
                          }
                          help={
                            errors?.skills?.[name]?.experience &&
                            touched?.skills?.[name]?.experience
                              ? errors.skills[name].experience
                              : ''
                          }
                        >
                          <Input
                            placeholder="Experience (Years)"
                            onChange={e => {
                              setFieldValue(
                                `skills[${name}].experience`,
                                e.target.value
                              )
                              validateField(`skills[${name}].experience`)
                            }}
                          />
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => {
                            if (fields.length > 1) {
                              const newSkills = values.skills.filter(
                                (_, index) => index !== name
                              )
                              setFieldValue('skills', newSkills)
                              remove(name, key)
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
                errors.description && touched.description && errors.description
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
                action="https://final-project-be.onrender.com/employees"
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
    </>
  )
}

export default EmployeeCreate
