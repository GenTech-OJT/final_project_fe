// import React, { useEffect, useState } from 'react'
import {
  Button,
  Col,
  // ConfigProvider,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
  Badge,
} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Formik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { showToast } from '@components/toast/ToastCustom'
import Breadcrumb from '@components/admin/Breadcrumb/Breadcrumb'
import { useCreateProject } from '@hooks/useProject'
import { useGetManagers } from '@hooks/useManager'
// import enUS from 'antd/locale/en_US'
// import viVN from 'antd/locale/vi_VN'
import 'dayjs/locale/en-au'
import 'dayjs/locale/vi'
import './Create.css'
const { RangePicker } = DatePicker

const CreateProject = () => {
  const { mutate: createProjectApi, isPending } = useCreateProject()
  const { data: managers, isLoading } = useGetManagers()
  const { t } = useTranslation('translation')
  const navigate = useNavigate()
  // const [datePickerLocale, setDatePickerLocale] = useState(enUS)
  // const forceUpdate = useForceUpdate()

  // useEffect(() => {
  //   const savedLanguage = localStorage.getItem('selectedLanguage')

  //   if (savedLanguage === 'eng') {
  //     setDatePickerLocale(enUS)
  //   } else if (savedLanguage === 'vi') {
  //     setDatePickerLocale(viVN)
  //   }

  //   forceUpdate()
  // }, [forceUpdate])

  if (isLoading) {
    return <Spin spinning={isLoading} fullscreen />
  }

  const breadcrumbItems = [
    {
      key: 'dashboard',
      title: t('breadcrumbs.dashboard'),
      route: '/admin/dashboard',
    },
    {
      key: 'employees',
      title: t('breadcrumbs.employees'),
      route: '/admin/employees',
    },
    {
      key: 'create',
      title: t('breadcrumbs.create'),
      route: `/admin/employees/create`,
    },
  ]

  const initialValues = {
    name: '',
    manager: '',
    teamMember: [{ name: '' }],
    status: 'pending',
    startDay: '',
    endDay: '',
    description: '',
    technical: [{ name: '' }],
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^([a-zA-Z]\s*)+$/, t('validate.name_validate'))
      .min(3, t('validate.name_validate_min'))
      .max(40, t('validate.name_validate_max'))
      .required(t('validate.name_require')),
    manager: Yup.string(),
    startDay: Yup.date().required(t('validate.dob_validate')),
    endDays: Yup.date().required(t('validate.dob_validate')),
    status: Yup.string(),
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
      startDay: moment(values.startDay.$d).format('YYYY-MM-DD HH:mm:ss'),
      endDay: moment(values.endDay.$d).format('YYYY-MM-DD HH:mm:ss'),
    }

    console.log(33333, formattedValues)
    // const formData = new FormData()
    // Object.entries(formattedValues).forEach(([key, value]) => {
    //   if (key === 'skills') {
    //     value.forEach((skills, index) => {
    //       formData.append(`skills[${index}][name]`, skills.skill)
    //       formData.append(`skills[${index}][year]`, skills.experience)
    //     })
    //   } else {
    //     formData.append(key, value)
    //   }
    // })

    // try {
    //   await createProjectApi(formattedValues, {
    //     onSuccess: () => {
    //       showToast(t('message.create_employee_success'), 'success')
    //       navigate('/admin/employees')
    //     },
    //     onError: () => {
    //       showToast(t('message.create_employee_fail'), 'error')
    //     },
    //   })
    // } catch (error) {}
  }

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
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
        }) => (
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={initialValues}
          >
            <Row
              gutter={{ xs: 8, sm: 12, md: 16, lg: 24 }}
              className="form-container"
            >
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
                  label={t('employee.manager')}
                  name="manager"
                  validateStatus={
                    errors.manager && touched.manager ? 'error' : ''
                  }
                  help={errors.manager && touched.manager && errors.manager}
                >
                  <Select
                    name="manager"
                    onChange={value => setFieldValue('manager', value)}
                    onBlur={handleBlur}
                    defaultValue={values.manager}
                  >
                    {managers?.map(m => (
                      <Select.Option key={m.id} value={m.name}>
                        {m.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 24 }}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Start Day"
                  name="startDay"
                  required
                  validateStatus={
                    errors.startDay && touched.startDay ? 'error' : ''
                  }
                  help={
                    errors.startDay && touched.startDay ? errors.startDay : ''
                  }
                >
                  {/* <ConfigProvider locale={datePickerLocale}> */}
                  <DatePicker
                    placement="bottomRight"
                    name="startDay"
                    className="datePicker"
                    onChange={value => setFieldValue('startDay', value)}
                    onBlur={handleBlur}
                    value={values.startDay}
                  />
                  {/* </ConfigProvider> */}
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="End Day"
                  name="endDay"
                  required
                  validateStatus={
                    errors.endDay && touched.endDay ? 'error' : ''
                  }
                  help={errors.endDay && touched.endDay ? errors.endDay : ''}
                >
                  {/* <ConfigProvider locale={datePickerLocale}> */}
                  <DatePicker
                    placement="bottomRight"
                    name="endDay"
                    className="datePicker"
                    onChange={value => setFieldValue('endDay', value)}
                    onBlur={handleBlur}
                    value={values.endDay}
                  />
                  {/* </ConfigProvider> */}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 24 }}>
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
                    <Select.Option value={'pending'}>
                      <Badge color="yellow" text="Pending" />
                    </Select.Option>
                    <Select.Option value={'inProgress'}>
                      <Badge
                        status="processing"
                        color="blue"
                        text="In progress"
                      />
                    </Select.Option>
                    <Select.Option value={'cancelled'}>
                      <Badge color="volcano" text="Cancelled" />
                    </Select.Option>
                    <Select.Option value={'done'}>
                      <Badge color="green" text="Done" />
                    </Select.Option>
                  </Select>
                </Form.Item>
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

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isPending}>
                {t('button_input.create')}
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </>
  )
}

// const useForceUpdate = () => {
//   const [, setValue] = useState(0)
//   return () => setValue(value => ++value)
// }

export default CreateProject
