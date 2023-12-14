/* eslint-disable no-unused-vars */
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
  Col,
  Row,
} from 'antd'
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { Formik, useField, useFormikContext } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { showToast } from '@components/toast/ToastCustom'
import { useGetEmployeeById, useUpdateEmployee } from '@hooks/useEmployee'
import { useNavigate, useParams } from 'react-router-dom'
import './Edit.css'

const EditEmployee = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: employee, isLoading } = useGetEmployeeById(id)
  const { mutateAsync: updateEmployeeApi } = useUpdateEmployee()

  const initialValues = {
    name: employee?.name,
    email: employee?.email,
    code: employee?.code,
    phone: employee?.phone,
    identity: employee?.identity,
    dob: moment(employee?.dob, 'YYYY-MM-DD'),

    gender: employee?.gender,
    status: employee?.status,
    isManager: employee?.isManager,
    position: employee?.position,
    manager: employee?.manager,
    skills: employee?.skills?.map(skill => ({
      skill: skill.name,
      experience: skill.year,
    })),
    avatar: employee?.avatar,
    description: employee?.description,
  }

  // chỗ này thì nếu cần thì thêm kh cần thì bỏ
  // const [previousValue, setPreviousValue] = useState({
  //   name: initialValues.name,
  //   email: initialValues.email,
  //   code: initialValues.code,
  //   phone: initialValues.phone,
  //   identity: initialValues.identity,
  //   // dob: initialValues.dob,
  //   gender: initialValues.gender,
  //   status: initialValues.status,
  //   isManager: initialValues.isManager,
  //   position: initialValues.position,
  //   manager: initialValues.manager,
  //   skills: [{ skill: '', experience: '' }],
  //   description: initialValues.description,
  // });

  const { t } = useTranslation('translation')
  const [avatar, setAvatar] = useState(null)

  const checkFile = file => {
    const isImage = file.type.startsWith('image/')

    if (!isImage) {
      message.error('You can only upload image files!')
    } else {
      setAvatar(file)
    }

    return false
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

  const handleFormSubmit = async values => {
    const formattedValues = {
      ...values,
      // dob: moment(values.dob.$d).format('YYYY-MM-DD'),
      // avatar: avatar,
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
    }

    console.log('formattedValues', formattedValues)

    try {
      const result = await updateEmployeeApi({ id, data: formattedValues })
      showToast(t('message.create_employee_success'), 'success')
      navigate('/admin/employees')
    } catch (error) {
      console.error('Error creating employee:', error)
      showToast(t('message.create_employee_fail'), 'error')
    }
  }

  // const handleFormSubmit = async values => {
  //   const formattedValues = {
  //     ...values,
  //     // dob: moment(values.dob.$d).format('YYYY-MM-DD'),
  //     // avatar: avatar,
  //   }

  //   try {
  //    await updateEmployeeApi(id, formattedValues, {
  //       onSuccess: () => {
  //         console.log('Success')
  //         showToast(t('message.create_employee_success'), 'success')
  //       },
  //       onError: (error) => {
  //         console.log('Error: ', error)
  //         showToast(t('message.create_employee_fail'), 'error')
  //       },
  //     })
  //   } catch (error) {
  //     console.error('Error creating employee:', error)
  //     showToast(t('message.create_employee_fail'), 'error')
  //   }
  // }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {employee && (
        <Formik
          enableReinitialize
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
            isSubmitting,
          }) => (
            <Form
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={initialValues}
            >
              <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 24 }}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={t('employee.name_employee')}
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
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={t('employee.email_employee')}
                    name="email"
                    required
                    validateStatus={
                      errors.email && touched.email ? 'error' : ''
                    }
                    help={errors.email && touched.email ? errors.email : ''}
                  >
                    <Input
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 24 }}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={t('employee.code')}
                    name="code"
                    required
                    validateStatus={errors.code && touched.code ? 'error' : ''}
                    help={errors.code && touched.code ? errors.code : ''}
                  >
                    <Input
                      name="code"
                      value={values.code}
                      disabled={true}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Item>{' '}
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={t('employee.phone_number_employee')}
                    name="phone"
                    required
                    validateStatus={
                      errors.phone && touched.phone ? 'error' : ''
                    }
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
                </Col>
              </Row>
              <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 24 }}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={t('employee.identity')}
                    name="identity"
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
                      disabled={true}
                      onBlur={handleBlur}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={t('employee.date_of_birth_employee')}
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
                      disabledDate={current => current.isAfter(moment())} // Disable future dates
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 24 }}>
                <Col xs={24} md={12}>
                  <Row gutter={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label={t('employee.gender_employee')}
                        name="gender"
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
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label={t('employee.status_employee')}
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
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={12}>
                  <Row gutter={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label={t('employee.position_employee')}
                        name="position"
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
                          <Select.Option value="Developer">
                            Developer
                          </Select.Option>
                          <Select.Option value="Quality Assurance">
                            Quality Assurance
                          </Select.Option>
                          <Select.Option value="CEO">CEO</Select.Option>
                          <Select.Option value="President">
                            President
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      {/* <SelectManager /> */}
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 24 }}>
                <Col xs={24} md={12}>
                  <Form.Item label={t('employee.skill')} required>
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
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={t('employee.description_employee')}
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
                </Col>
              </Row>
              <Form.Item label={t('employee.is_manager')} name="isManager">
                <Checkbox
                  name="isManager"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.isManager}
                ></Checkbox>
              </Form.Item>
              <Form.Item name="avatar" label={t('employee.avatar')}>
                <Upload
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={checkFile}
                  onChange={info => {
                    if (info.file.status === 'done') {
                      message.success(
                        `${info.file.name} file uploaded successfully`
                      )
                      setAvatar(info.file.originFileObj)
                    } else if (info.file.status === 'error') {
                      message.error(`${info.file.name} file upload failed.`)
                    }
                  }}
                >
                  {avatar || employee?.avatar ? (
                    <img
                      src={
                        avatar ? URL.createObjectURL(avatar) : employee.avatar
                      }
                      alt="avatar"
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                      }}
                    />
                  ) : (
                    <div>
                      <UploadOutlined />
                      <div style={{ marginTop: 8 }}>
                        {t('employee.upload_avatar')}
                      </div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {t('button_input.edit')}
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      )}
    </>
  )
}

export default EditEmployee
