import {
  Avatar,
  Card,
  Col,
  Descriptions,
  Flex,
  Row,
  Space,
  Spin,
  Tabs,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import Title from 'antd/es/skeleton/Title'
import { useState } from 'react'
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
    return <Spin spinning={true} fullscreen />
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
                            displayValue(employee_details.description) ||
                              t('employee_details.no_description')
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
                              key={skill.name}
                              color={getTagColor(index)}
                              style={{ padding: '5px' }}
                            >
                              {capitalizeFirstLetter(skill.name)} - {skill.year}{' '}
                              {t('employee_details.years')}
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
          <Row>
            <CustomSearch />
          </Row>
          <Row gutter={[16, 16]}>
            {dataProject.length > 0 ? (
              dataProject.map(item => (
                <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
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
                          <Tag color="error">
                            {item.currentEmployee.position}
                          </Tag>
                          <a
                            href={`/admin/projects/detail/${item.id}`}
                            className="pro_eye"
                          >
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
              ))
            ) : (
              <Col span={24}>
                <div
                  style={{
                    textAlign: 'center',
                    color: 'gray',
                    marginTop: '10%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <svg
                    width="84"
                    height="61"
                    viewBox="0 0 64 41"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      transform="translate(0 1)"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <ellipse
                        fill="#f5f5f5"
                        cx="32"
                        cy="33"
                        rx="32"
                        ry="7"
                      ></ellipse>
                      <g fillRule="nonzero" stroke="#d9d9d9">
                        <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                        <path
                          d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                          fill="#fafafa"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  {t('employee_details.no_projects')}
                </div>
              </Col>
            )}
          </Row>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default EmployeeDetail
