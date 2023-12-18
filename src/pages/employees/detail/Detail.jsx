import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Flex,
  Input,
  List,
  Row,
  Tabs,
  Tooltip,
} from 'antd'
import Title from 'antd/es/skeleton/Title'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useParams } from 'react-router-dom'
import Chartpie from '@components/Chartpie/Chartpie'
import Breadcrumb from '@components/admin/Breadcrumb/Breadcrumb'
import {
  useGetEmployeeById,
  useGetProjectsByEmployeeId,
} from '@hooks/useEmployee'
import './Detail.css'
import { EyeOutlined } from '@ant-design/icons'

const { TabPane } = Tabs

const EmployeeDetail = () => {
  const { id } = useParams()
  const [searchText, setSearchText] = useState('')

  const { data: employee_details, isLoading } = useGetEmployeeById(id)

  const { data: dataProject, isLoading: isLoadingProject } =
    useGetProjectsByEmployeeId(id, searchText)

  const { t } = useTranslation('translation')

  const getStatusDotColor = () => {
    return employee_details.status === 'active' ? 'green' : 'red'
  }

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  // Hard-coded data for demonstration purposes
  const hardCodedData = [
    {
      id: 'pro1',
      name: 'Project 01',
      description: 'A dedicated software engineer',
      team_members: [
        {
          id: 'emp1',
          name: 'Vy Nguyen',
          position: 'Software Engineer',
        },
      ],
      manager: 'John Doe',
      start_date: '1990-01-01',
      end_date: '1990-12-01',
      status: 'In progress',
      technicals: [
        {
          name: 'ReactJS',
        },
      ],
    },
    {
      id: 'pro2',
      name: 'Project 02',
      description: 'This project is a project',
      team_members: [
        {
          id: 'emp1',
          name: 'Vy Nguyen',
          position: 'Software Engineer',
        },
      ],
      manager: 'Minh Toan',
      start_date: '1993-01-01',
      end_date: '1993-12-01',
      status: 'Done',
      technicals: [
        {
          name: 'Javascript',
        },
      ],
    },
    // Add more data as needed
  ]

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

  console.log(dataProject, 'dataProject')

  // Function to generate data for Chartpie from employee skills
  const generateChartData = skills => {
    const labels = skills.map(skill => {
      const skillName = skill.name || '' // Default to an empty string if name is null or undefined
      return `${skillName.charAt(0).toUpperCase()}${skillName.slice(1)} - ${
        skill.year
      } ${t('employee_details.years')}`
    })

    const data = skills.map(skill => skill.year)

    return {
      labels,
      datasets: [
        {
          data,
        },
      ],
    }
  }
  const displayValue = value => {
    return value !== null && value !== undefined ? value : ''
  }

  if (isLoading || !employee_details || isLoadingProject) {
    return <div>Loading...</div>
  }

  return (
    <div className="page-container">
      <Breadcrumb items={breadcrumbItems} />
      <h2>{t('employee_details.title')}</h2>
      <Title className="page-title">EMPLOYEE DETAIL</Title>

      <Tabs
        defaultActiveKey="1"
        tabPosition="top"
        animated={true}
        style={{ height: '100%' }}
      >
        <TabPane tab={<span> {t('employee_details.profile')}</span>} key="1">
          {/* Content for Profile tab */}

          {/* Hoang res */}
          <Card style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
            <Row gutter={{ sm: 24, md: 24 }}>
              <Col sm={24} lg={12} className="avatar_status">
                <Flex>
                  <img
                    // src={employee_details.avatar}
                    src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"
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
              <Col sm={24} lg={12}>
                <Row>
                  <p className="employee_label">
                    {t('employee_details.employee_code')}
                    {' : '}
                  </p>
                  <p className="employee_info">{employee_details.code}</p>
                </Row>
                <Row>
                  <p className="employee_label">
                    {t('employee_details.line_manager')}
                    {' : '}
                  </p>
                  <p className="employee_info">
                    {capitalizeFirstLetter(
                      displayValue(employee_details.line_manager)
                    )}
                  </p>
                </Row>
                <Row>
                  <p className="employee_label">Email :</p>
                  {/* <p className="employee_info">{employee_details.email}</p> */}
                  <p className="employee_info">nhatnhatnhar27@gmail.com</p>
                </Row>
              </Col>
            </Row>
          </Card>

          {/* ///// */}
          <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 24 }}>
            <Col md={24} lg={12}>
              <Card
                style={{
                  marginTop: 20,
                  width: '100%',
                  backgroundColor: ' rgb(245, 245, 245)',
                }}
              >
                <Row gutter={16} justify="center" align="middle">
                  <Col span={23}>
                    <p className="title">
                      {t('employee_details.personal_info')}
                    </p>
                    <hr className="profile_line" />

                    <Col span={26}>
                      <Descriptions
                        column={1}
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
                      </Descriptions>
                    </Col>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col md={24} lg={12}>
              <Card
                style={{
                  marginTop: 20,
                  width: '100%',
                  backgroundColor: 'rgb(245, 245, 245)',
                }}
              >
                {/* Skills Content */}
                <p className="title">{t('employee_details.skill')}</p>
                <hr className="profile_line" />
                {/* Add your skill-related content here */}
                <Row gutter={16} justify="center" align="middle">
                  <Col span={22}>
                    {employee_details.skills &&
                    employee_details.skills.length > 0 ? (
                      <div>
                        <Chartpie
                          data={generateChartData(employee_details.skills)}
                        />
                      </div>
                    ) : (
                      <p>No skills available</p>
                    )}
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}></Col>
            <Col span={12}>{/* New Card for Skills */}</Col>
          </Row>
        </TabPane>
        {/* next page */}

        <TabPane tab={<span>{t('employee_details.project')}</span>} key="3">
          <List
            grid={{
              gutter: 16,
              column: 4,
            }}
            dataSource={dataProject}
            renderItem={item => (
              <List.Item>
                <Card
                  title={item.name}
                  extra={
                    <a href="#">
                      <EyeOutlined />
                    </a>
                  }
                  actions={[
                    <Avatar.Group key={'avatar'} maxCount={2}>
                      {item.employees.map(employee => {
                        console.log(employee, 'employee')
                        return (
                          <Tooltip title={employee?.name} key={employee?.id}>
                            <Avatar key={employee?.id} src={employee?.avatar} />
                          </Tooltip>
                        )
                      })}
                    </Avatar.Group>,
                    <span key={'start_date'}>{item.start_date}</span>,
                  ]}
                >
                  {item.description}
                </Card>
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default EmployeeDetail
