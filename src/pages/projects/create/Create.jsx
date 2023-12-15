import React, { useEffect, useState } from 'react'
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
import { Formik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { showToast } from '@components/toast/ToastCustom'
import Breadcrumb from '@components/admin/Breadcrumb/Breadcrumb'
import { useCreateProject } from '@hooks/useProject'
import { useGetManagers } from '@hooks/useManager'
import { useGetEmployees } from '@hooks/useEmployee'
// import enUS from 'antd/locale/en_US'
// import viVN from 'antd/locale/vi_VN'
import 'dayjs/locale/en-au'
import 'dayjs/locale/vi'
import './Create.css'

const CreateProject = () => {
  // const { mutate: createProjectApi } = useCreateProject()
  const { data: managers, isLoading: loadingManager } = useGetManagers()
  const { data: employees, isLoading: loadingEmployees } = useGetEmployees({
    pageSize: 10000,
  })
  const { t } = useTranslation('translation')
  const [teamMembers, setTeamMembers] = useState([])
  const [technicals, setTechnicals] = useState([])
  // const navigate = useNavigate()

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

  if (loadingManager) {
    return <Spin spinning={loadingManager} fullscreen />
  }
  if (loadingEmployees) {
    return <Spin spinning={loadingEmployees} fullscreen />
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
    teamMembers: [],
    status: 'pending',
    startDay: '',
    endDay: '',
    description: '',
    technicals: [],
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^([a-zA-Z]\s*)+$/, t('validate.name_validate'))
      .min(3, t('validate.name_validate_min'))
      .max(40, t('validate.name_validate_max'))
      .required(t('validate.name_require')),
    manager: Yup.string(),
    teamMembers: Yup.array().min(1, 'Please select at least one team member'),
    technicals: Yup.array().min(1, 'Please select at least one technical'),
    startDay: Yup.date().required(t('validate.dob_validate')),
    endDay: Yup.date().required(t('validate.dob_validate')),
    status: Yup.string(),
    description: Yup.string(),
  })

  const handleFormSubmit = async values => {
    const formattedValues = {
      ...values,
      teamMembers: teamMembers.map(m => ({
        id: m.id,
        name: m.name,
        avatar: m.avatar,
        assignTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      })),
      technicals: technicals.map(t => ({
        name: t.name,
      })),
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
                    disabledDate={current =>
                      current && current < moment().startOf('day')
                    }
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
                    disabledDate={current =>
                      current &&
                      (current < moment().startOf('day') ||
                        current < values.startDay)
                    }
                  />
                  {/* </ConfigProvider> */}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 24 }}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Team Members"
                  name="teamMembers"
                  validateStatus={
                    errors.teamMembers && touched.teamMembers ? 'error' : ''
                  }
                  help={
                    errors.teamMembers &&
                    touched.teamMembers &&
                    errors.teamMembers
                  }
                >
                  <Select
                    mode="multiple"
                    name="teamMembers"
                    placeholder="Inserted are removed"
                    maxTagCount={3}
                    defaultValue={values.teamMembers}
                    onBlur={handleBlur}
                    onChange={selectedValues => {
                      const selectedMembers = employees?.data.filter(employee =>
                        selectedValues.includes(employee.name)
                      )
                      setTeamMembers(selectedMembers)
                      setFieldValue('teamMembers', selectedMembers)
                    }}
                  >
                    {employees?.data?.map(e => (
                      <Select.Option key={e.id} value={e.name}>
                        {e.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Technicals"
                  name="technicals"
                  validateStatus={
                    errors.technicals && touched.technicals ? 'error' : ''
                  }
                  help={
                    errors.technicals && touched.technicals && errors.technicals
                  }
                >
                  <Select
                    mode="multiple"
                    name="technicals"
                    placeholder="Inserted are removed"
                    maxTagCount={3}
                    defaultValue={values.technicals}
                    onBlur={handleBlur}
                    onChange={selectedValues => {
                      const selectedTechnicals = employees?.data.filter(
                        employee => selectedValues.includes(employee.name)
                      )
                      setTechnicals(selectedTechnicals)
                      setFieldValue('technicals', selectedTechnicals)
                    }}
                  >
                    {employees?.data?.map(e => (
                      <Select.Option key={e.id} value={e.name}>
                        {e.name}
                      </Select.Option>
                    ))}
                  </Select>
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
                      <Badge status="warning" text="Pending" />
                    </Select.Option>
                    <Select.Option value={'inProgress'}>
                      <Badge status="processing" text="In progress" />
                    </Select.Option>
                    <Select.Option value={'cancelled'}>
                      <Badge status="error" text="Cancelled" />
                    </Select.Option>
                    <Select.Option value={'done'}>
                      <Badge status="success" text="Done" />
                    </Select.Option>
                  </Select>
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
              {/* <Button type="primary" htmlType="submit" loading={isPending}> */}
              <Button type="primary" htmlType="submit">
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
