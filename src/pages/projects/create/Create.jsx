import React, { useState } from 'react'
import {
  Button,
  Col,
  // ConfigProvider,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Badge,
} from 'antd'
import { Formik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router'
// import { showToast } from '@components/toast/ToastCustom'
import Breadcrumb from '@components/admin/Breadcrumb/Breadcrumb'
import { useCreateProject } from '@hooks/useProject'
import { useGetManagers } from '@hooks/useManager'
import { useGetEmployees } from '@hooks/useEmployee'
import { useGetTechnicals } from '@hooks/useTechnical'
// import enUS from 'antd/locale/en_US'
// import viVN from 'antd/locale/vi_VN'
import 'dayjs/locale/en-au'
import 'dayjs/locale/vi'
import './Create.css'

const CreateProject = () => {
  const { mutate: createProjectApi } = useCreateProject()
  const { data: managers, isLoading: loadingManager } = useGetManagers()
  const { data: employees, isLoading: loadingEmployees } = useGetEmployees({
    pageSize: 10000,
  })
  const { data: technicalsDB, isLoading: loadingTechnicalsDB } =
    useGetTechnicals()
  const { t } = useTranslation('translation')
  const [endDate, setEndDate] = useState()
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
  if (loadingTechnicalsDB) {
    return <Spin spinning={loadingTechnicalsDB} fullscreen />
  }

  const breadcrumbItems = [
    {
      key: 'dashboard',
      title: t('breadcrumbs.dashboard'),
      route: '/admin/dashboard',
    },
    {
      key: 'projects',
      title: t('breadcrumbs.employees'),
      route: '/admin/projects',
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
    employees: [],
    status: 'Pending',
    start_date: '',
    end_date: '',
    description: '',
    technical: [],
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^([a-zA-Z0-9]\s*)+$/, t('validate.name_validate'))
      .max(128, t('validate.name_validate_max'))
      .required(t('validate.name_require')),
    manager: Yup.string().required('Please select manager'),
    employees: Yup.array().min(1, 'Please select at least one team member'),
    technical: Yup.array().min(1, 'Please select at least one technical'),
    start_date: Yup.date().required(t('validate.dob_validate')),
    end_date: Yup.date().required(t('validate.dob_validate')),
    status: Yup.string(),
    description: Yup.string(),
  })

  const handleFormSubmit = async values => {
    const formattedValues = {
      ...values,
      employees: teamMembers.map(m => ({
        id: m.id,
        name: m.name,
        avatar: m.avatar,
        joining_time: moment().format('YYYY-MM-DD HH:mm:ss'),
        leaving_time: null,
      })),
      technical: technicals.map(t => ({
        id: t.id,
        name: t.name,
      })),
      start_date: moment(values.start_date.$d).format('YYYY-MM-DD HH:mm:ss'),
      end_date: moment(values.end_date.$d).format('YYYY-MM-DD HH:mm:ss'),
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

    try {
      await createProjectApi(formattedValues, {
        onSuccess: () => {
          showToast(t('message.create_employee_success'), 'success')
          // navigate('/admin/employees')
        },
        onError: () => {
          showToast(t('message.create_employee_fail'), 'error')
        },
      })
    } catch (error) {}
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
                  name="start_date"
                  required
                  validateStatus={
                    errors.start_date && touched.start_date ? 'error' : ''
                  }
                  help={
                    errors.start_date && touched.start_date
                      ? errors.start_date
                      : ''
                  }
                >
                  {/* <ConfigProvider locale={datePickerLocale}> */}
                  <DatePicker
                    placement="bottomRight"
                    name="start_date"
                    className="datePicker"
                    onChange={value => {
                      setFieldValue('start_date', value)
                      if (values.end_date && values.end_date < value) {
                        setFieldValue('end_date', null)
                      } else if (values.end_date === null) {
                        setFieldValue('end_date', endDate)
                      }
                    }}
                    onBlur={handleBlur}
                    value={values.start_date}
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
                  name="end_date"
                  required
                  validateStatus={
                    errors.end_date && touched.end_date ? 'error' : ''
                  }
                  help={
                    errors.end_date && touched.end_date ? errors.end_date : ''
                  }
                >
                  {/* <ConfigProvider locale={datePickerLocale}> */}
                  <DatePicker
                    placement="bottomRight"
                    name="end_date"
                    className="datePicker"
                    onChange={value => {
                      setFieldValue('end_date', value)
                      setEndDate(value)
                    }}
                    onBlur={handleBlur}
                    value={values.end_date}
                    disabledDate={current =>
                      !values.start_date ||
                      (current && current < values.start_date)
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
                  name="employees"
                  validateStatus={
                    errors.employees && touched.employees ? 'error' : ''
                  }
                  help={
                    errors.employees && touched.employees && errors.employees
                  }
                >
                  <Select
                    mode="multiple"
                    name="employees"
                    placeholder="Inserted are removed"
                    maxTagCount={3}
                    defaultValue={values.employees}
                    onBlur={handleBlur}
                    onChange={selectedValues => {
                      const selectedMembers = employees?.data.filter(employee =>
                        selectedValues.includes(employee.id)
                      )
                      setTeamMembers(selectedMembers)
                      setFieldValue('employees', selectedMembers)
                    }}
                  >
                    {employees?.data?.map(e => (
                      <Select.Option key={e.id} value={e.id}>
                        {e.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Technicals"
                  name="technical"
                  validateStatus={
                    errors.technical && touched.technical ? 'error' : ''
                  }
                  help={
                    errors.technical && touched.technical && errors.technical
                  }
                >
                  <Select
                    mode="multiple"
                    name="technical"
                    placeholder="Inserted are removed"
                    maxTagCount={3}
                    defaultValue={values.technical}
                    onBlur={handleBlur}
                    onChange={selectedValues => {
                      const selectedTechnicals = technicalsDB?.filter(t =>
                        selectedValues.includes(t.id)
                      )
                      setTechnicals(selectedTechnicals)
                      setFieldValue('technical', selectedTechnicals)
                    }}
                  >
                    {technicalsDB?.map(t => (
                      <Select.Option key={t.id} value={t.id}>
                        {t.name}
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
                    <Select.Option value={'Pending'}>
                      <Badge status="warning" text="Pending" />
                    </Select.Option>
                    <Select.Option value={'In Progress'}>
                      <Badge status="processing" text="In progress" />
                    </Select.Option>
                    <Select.Option value={'Cancelled'}>
                      <Badge status="error" text="Cancelled" />
                    </Select.Option>
                    <Select.Option value={'Done'}>
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
