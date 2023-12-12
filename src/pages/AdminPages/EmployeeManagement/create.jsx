import React, { useState, useEffect } from 'react'
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
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { Formik, useField, useFormikContext } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { showToast } from '@components/Toast/toast'
import { useTranslation } from 'react-i18next'
import './create.css'

const SelectManager = () => {
  const { setFieldValue, values } = useFormikContext()
  const [managers, setManagers] = useState([])
  const { t } = useTranslation('translation')

  useEffect(() => {
    fetch('http://localhost:3000/employees')
      .then(response => response.json())
      .then(data => {
        const managerNames = data.data.map(m => m.name)
        setManagers(managerNames)
      })
      .catch(error => {
        //  console.error('Error fetching data:', error)
      })
  }, [])

  const [field, meta] = useField('manager')

  return (
    <Form.Item
      label={t('employee.manager')}
      name="manager"
      className="select-width-dobgs"
      validateStatus={meta.error && meta.touched ? 'error' : ''}
      help={meta.error && meta.touched && meta.error}
    >
      <Select
        {...field}
        onChange={value => setFieldValue('manager', value)}
        onBlur={field.onBlur}
        defaultValue={values.manager}
      >
        {managers.map(m => (
          <Select.Option key={m} value={m}>
            {m}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  )
}

const CreateEmployee = () => {
  const { t } = useTranslation('translation')
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
      .matches(/^([a-zA-Z]\s*)+$/, t('validate.name_validate'))
      .min(3, t('validate.name_validate_min'))
      .max(40, t('validate.name_validate_max'))
      .required(t('validate.name_require')),
    email: Yup.string()
      .email(t('validate.email_invalid'))
      .required(t('validate.email_validate')),
    code: Yup.string().required(t('validate.code_validate')),
    phone: Yup.string()
      .required(t('validate.phone_validate'))
      .min(9, t('validate.phone_valid'))
      .max(10, t('validate.phone_valid')),
    identity: Yup.string()
      .required(t('validate.card_require'))
      .matches(/^[a-zA-Z0-9]{1,20}$/, t('validate.card_validate')),
    dob: Yup.date().required(t('validate.dob_validate')),
    gender: Yup.string(),
    status: Yup.string(),
    position: Yup.string(),
    isManager: Yup.bool(),
    manager: Yup.string(),
    skills: Yup.array()
      .of(
        Yup.object().shape({
          skill: Yup.string().required(t('validate.skill_validate')),
          experience: Yup.string()
            .required(t('validate.experience_require'))
            .matches(/^\d+(\.\d+)?$/, t('validate.experience_validate')),
        })
      )
      .required(t('validate.skills_require'))
      .min(1, t('validate.skills_validate')),
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

      // formData.forEach((value, key) => {
      //   console.log('Form Data: ', `${key}: ${value}`)
      // })

      fetch('http://localhost:3000/employees', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (response.ok) {
            showToast(t('message.create_employee_success'), 'success')
            navigate('/employees')
            return response.json()
          } else {
            showToast(t('message.create_employee_fail'), 'error')
            throw new Error(`Request failed with status: ${response.status}`)
          }
        })
        .then(data => {})
        .catch(error => {
          showToast(t('message.create_employee_fail'), 'error')
        })
    } catch (error) {}
  }

  return (
    <>
      <div className="create-container">
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
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={initialValues}
            >
              <div className="input-container">
                <Form.Item
                  label={t('employee.name_employee')}
                  name="name"
                  className="text-input-form"
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
                  label={t('employee.email_employee')}
                  name="email"
                  className="text-input-form"
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
              </div>
              <div className="input-container">
                <Form.Item
                  label={t('employee.code')}
                  name="code"
                  className="text-input-form"
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
                  label={t('employee.phone_number_employee')}
                  name="phone"
                  className="text-input-form"
                  required
                  validateStatus={errors.phone && touched.phone ? 'error' : ''}
                  help={errors.phone && touched.phone ? errors.phone : ''}
                >
                  <Input
                    name="phone"
                    type="number"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
              </div>
              <div className="input-container">
                <Form.Item
                  label={t('employee.identity')}
                  name="identity"
                  className="text-input-form"
                  required
                  validateStatus={
                    errors.identity && touched.identity ? 'error' : ''
                  }
                  help={
                    errors.identity && touched.identity ? errors.identity : ''
                  }
                >
                  <Input
                    name="identity"
                    value={values.identity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
                <Form.Item
                  label={t('employee.date_of_birth_employee')}
                  name="dob"
                  className="text-input-form"
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
              </div>
              <div className="select-container-lg">
                <div className="select-container">
                  <Form.Item
                    label={t('employee.gender_employee')}
                    name="gender"
                    className="select-width-dobgs"
                    validateStatus={
                      errors.gender && touched.gender ? 'error' : ''
                    }
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
                    label={t('employee.status_employee')}
                    name="status"
                    className="select-width-dobgs"
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
                </div>
                <div className="select-container">
                  <Form.Item
                    label={t('employee.position_employee')}
                    name="position"
                    className="select-width-dobgs"
                    validateStatus={
                      errors.position && touched.position ? 'error' : ''
                    }
                    help={
                      errors.position && touched.position && errors.position
                    }
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

                  <SelectManager />
                </div>
              </div>
              <div className="input-container">
                <Form.Item
                  label={t('employee.skill')}
                  required
                  className="text-input-form"
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
                                placeholder={t('employee.skill_placeholder')}
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
                                placeholder={t(
                                  'employee.experience_placeholder'
                                )}
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
                  className="text-input-form"
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
              </div>
              <Form.Item
                label={t('employee.is_manager')}
                name="isManager"
                className="text-input-form"
              >
                <Checkbox
                  name="isManager"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.isManager}
                ></Checkbox>
              </Form.Item>
              <Form.Item label={t('employee.avatar')}>
                <Upload
                  name="avatar"
                  listType="picture"
                  accept="image/*"
                  maxCount={1}
                  action="https://final-project-be.onrender.com/employees"
                  beforeUpload={checkFile}
                  onRemove={() => setAvatar(null)}
                >
                  <Button icon={<UploadOutlined />}>
                    {t('employee.upload_avatar')}
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {t('button_input.create')}
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default CreateEmployee
