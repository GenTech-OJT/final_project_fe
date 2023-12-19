import {
  Avatar,
  Card,
  Col,
  Descriptions,
  Flex,
  Row,
  Space,
  Tabs,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import Title from 'antd/es/skeleton/Title'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CalendarOutlined, EyeOutlined } from '@ant-design/icons'
import Breadcrumb from '@components/admin/Breadcrumb/Breadcrumb'
import {
  useGetEmployeeById,
  useGetProjectsByEmployeeId,
} from '@hooks/useEmployee'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { CustomSearch } from '../../../components/custom/CustomTable'
import './Detail.css'

const { TabPane } = Tabs

const EmployeeDetail = () => {
  const { id } = useParams()
  const [searchText, setSearchText] = useState('')

  const { data: employee_details, isLoading } = useGetEmployeeById(id)

  const { data: dataProject, isLoading: isLoadingProject } =
    useGetProjectsByEmployeeId(id, searchText)

  const { t } = useTranslation('translation')

  const [activeTab, setActiveTab] = useState('1') // State to keep track of active tab

  useEffect(() => {
    const storedActiveTab = localStorage.getItem('activeTab')
    if (storedActiveTab) {
      setActiveTab(storedActiveTab)
    }
  }, [])

  const handleTabChange = (key, e) => {
    e.preventDefault()
    setActiveTab(key)
    // Store the active tab in localStorage
    localStorage.setItem('activeTab', key)
  }

  const handleChange = e => {
    e.preventDefault()
    const value = e.target.value
    setSearchText(value)
  }

  const getStatusDotColor = () => {
    return employee_details.status === 'active' ? 'green' : 'red'
  }

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
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
      key: 'detail',
      title: t('breadcrumbs.employee_details'),
      route: `/admin/employees/detail/${id}`,
    },
  ]

  const displayValue = value => {
    return value !== null && value !== undefined ? value : ''
  }

  if (isLoading || !employee_details || isLoadingProject) {
    return <div>Loading...</div>
  }
  // Function to get vibrant colors
  const getTagColor = index => {
    const colors = [
      '#2a9d8f',
      '#6A8EAE',
      '#5a189a',
      '#d90429',
      '#BFEBE5',
      '#CFCFCF',
      '#DFDFDF',
      '#EFEFEF',
      '#F9F9F9',
      '#FFFFFF',
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="page-container">
      <Breadcrumb items={breadcrumbItems} />
      <Title className="page-title">EMPLOYEE DETAIL</Title>

      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        defaultActiveKey="1"
        tabPosition="top"
        animated={true}
        style={{ height: '100%' }}
      >
        <TabPane tab={<span> {t('employee_details.profile')}</span>} key="1">
          {/* Content for Profile tab */}
          <Card style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
            <Row gutter={{ sm: 24, md: 24 }} className="info_employee">
              <Col sm={24} lg={12}>
                <Flex>
                  <img
                    src={employee_details.avatar}
                    alt="Employee Avatar"
                    className="avt"
                  />
                  <div className="employee_title">
                    <p className="employee_name">{employee_details?.name}</p>
                    <p className="employee_position">
                      {employee_details.position}
                    </p>
                    <div className="status-show">
                      <div
                        className="status-dot"
                        style={{ backgroundColor: getStatusDotColor() }}
                      ></div>
                      <p className="status-text">
                        {employee_details.status === 'active'
                          ? t('employee_details.active')
                          : t('employee_details.inactive')}
                      </p>
                    </div>
                  </div>
                </Flex>
              </Col>
              <Col sm={24} lg={12} className="simple_info">
                <Row style={{ marginBottom: '5px' }}>
                  <p className="employee_label">
                    {t('employee_details.employee_code')}
                    {' : '}
                  </p>
                  <p className="employee_info">{employee_details.code}</p>
                </Row>
                <Row style={{ marginBottom: '5px' }}>
                  <p className="employee_label">
                    {t('employee_details.line_manager')}
                    {' : '}
                  </p>
                  <p className="employee_info">
                    {capitalizeFirstLetter(
                      displayValue(employee_details.manager)
                    )}
                  </p>
                </Row>
                <Row style={{ marginBottom: '5px' }}>
                  <p className="employee_label">Email :</p>
                  {/* <p className="employee_info">{employee_details.email}</p> */}
                  <p className="employee_info">
                    {capitalizeFirstLetter(
                      displayValue(employee_details.email)
                    )}
                  </p>
                </Row>
              </Col>
            </Row>
          </Card>

          <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 24 }}>
            <Col md={24} lg={24}>
              <Card
                style={{
                  marginTop: 20,
                  width: '100%',
                  backgroundColor: ' rgb(245, 245, 245)',
                }}
              >
                <Row gutter={16} justify="center" align="middle" column={2}>
                  <Col span={23}>
                    <p className="title">
                      {t('employee_details.personal_info')}
                    </p>
                    <hr className="profile_line" />

                    <Col span={24}>
                      <Descriptions
                        column={2}
                        bordered
                        className="custom-descriptions"
                      >
                        <Descriptions.Item
                          label={
                            <span style={{ fontWeight: 'bold' }}>
                              {t('employee_details.gender')}
                            </span>
                          }
                          className="custom-label"
                        >
                          {capitalizeFirstLetter(
                            displayValue(
                              t(
                                `employee_details.genders.${employee_details.gender}`
                              )
                            )
                          )}
                        </Descriptions.Item>
                        <Descriptions.Item
                          label={
                            <span style={{ fontWeight: 'bold' }}>
                              {t('employee_details.identity_code')}
                            </span>
                          }
                          className="custom-label"
                        >
                          {employee_details.identity}
                        </Descriptions.Item>
                        <Descriptions.Item
                          label={
                            <span style={{ fontWeight: 'bold' }}>
                              {t('employee_details.phone_number')}
                            </span>
                          }
                          className="custom-label"
                        >
                          {employee_details.phone}
                        </Descriptions.Item>

                        <Descriptions.Item
                          label={
                            <span style={{ fontWeight: 'bold' }}>
                              {t('employee_details.dob')}
                            </span>
                          }
                          className="custom-label"
                        >
                          {employee_details.dob}
                        </Descriptions.Item>
                        <Descriptions.Item
                          label={
                            <span style={{ fontWeight: 'bold' }}>
                              {t('employee_details.is_manager')}
                            </span>
                          }
                          className="custom-label"
                        >
                          {capitalizeFirstLetter(
                            displayValue(
                              t(
                                `employee_details.is_managers.${employee_details.is_manager}`
                              )
                            )
                          )}
                        </Descriptions.Item>
                        <Descriptions.Item
                          label={
                            <span style={{ fontWeight: 'bold' }}>
                              {t('employee_details.description_employee')}
                            </span>
                          }
                          span={2}
                          className="custom-label"
                        >
                          {capitalizeFirstLetter(
                            displayValue(employee_details.description)
                          )}
                        </Descriptions.Item>

                        {/* Add a new Descriptions.Item for Skills */}
                        <Descriptions.Item
                          label={
                            <span style={{ fontWeight: 'bold' }}>Skills</span>
                          }
                          span={2} // span to cover two columns
                          className="custom-label"
                        >
                          {/* Map through employee_details.skills and display each skill as a Tag */}

                          {employee_details.skills.map((skill, index) => (
                            <Tag
                              key={index}
                              color={getTagColor(index)}
                              style={{ padding: '5px' }}
                            >
                              {capitalizeFirstLetter(skill.name)} - {skill.year}{' '}
                              years
                            </Tag>
                          ))}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </TabPane>
        {/* next page */}

        <TabPane tab={<span>{t('employee_details.project')}</span>} key="3">
          <CustomSearch handleChange={handleChange} />
          <Row gutter={[16, 16]}>
            {dataProject.map((item, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <Card
                  actions={[
                    <Avatar.Group
                      maxCount={2}
                      key="avatar"
                      style={{ cursor: 'default' }}
                    >
                      {item.employees.map(employee => (
                        <Tooltip title={employee.name} key={employee.id}>
                          <Avatar src={employee.avatar} />
                        </Tooltip>
                      ))}
                    </Avatar.Group>,
                    <span key={'date'} className="pro_date">
                      <CalendarOutlined />{' '}
                      {moment(item.start_date).format('YYYY-MM-DD')}
                    </span>,
                    // <span key="date">{item.start_date}</span>,
                  ]}
                >
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Space
                        size="large"
                        style={{
                          width: '100%',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Tag color="error">{item.currentEmployee.position}</Tag>
                        {/* <Typography.Text ellipsis>...</Typography.Text> */}
                        <a href="#" className="pro_eye">
                          <EyeOutlined />
                        </a>
                      </Space>
                    </Col>
                    <Col span={24}>
                      <Typography.Title level={4} className="pro_title">
                        {item.name}
                      </Typography.Title>
                      {item.status === 'Pending' && (
                        <Tag color="#faad14">Pending</Tag>
                      )}
                      {item.status === 'In Progress' && (
                        <Tag color="#1677ff">In Progress</Tag>
                      )}
                      {item.status === 'Cancelled' && (
                        <Tag color="#ff4d4f">Cancelled</Tag>
                      )}
                      {item.status === 'Done' && (
                        <Tag color="#52c41a">Done</Tag>
                      )}
                    </Col>

                    <Col span={24} className="pro_description">
                      {item.description}
                    </Col>
                    <Col span={24}></Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default EmployeeDetail
