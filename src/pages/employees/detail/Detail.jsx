import { EyeOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Descriptions,
  Flex,
  Row,
  Table,
  Tabs,
  Tag,
} from 'antd'
import Title from 'antd/es/skeleton/Title'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Breadcrumb from '@components/admin/Breadcrumb/Breadcrumb'
import { useGetEmployeeById } from '@hooks/useEmployee'
import { useParams } from 'react-router-dom'
import './Detail.css'

const { TabPane } = Tabs

const EmployeeDetail = () => {
  const { id } = useParams()
  const { data: employee_details, isLoading } = useGetEmployeeById(id)
  const { t } = useTranslation('translation')

  const getStatusDotColor = () => {
    return employee_details.status === 'active' ? 'green' : 'red'
  }

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const columns = [
    {
      title: t('project_details.project_name'),
      dataIndex: 'name',
      sorter: true,
      width: '10%',
    },
    {
      title: t('project_details.manager_name'),
      dataIndex: 'manager',
      width: '10%',
    },
    {
      title: t('project_details.start_date'),
      dataIndex: 'start_date',
      width: '10%',
    },
    {
      title: t('project_details.end_date'),
      dataIndex: 'end_date',
      width: '10%',
      render: (end_date, record) => (
        <span>{record.status === 'Done' ? end_date : null}</span>
      ),
    },
    {
      title: t('project_details.status'),
      dataIndex: 'status',
      width: '10%',
      render: status => (
        <span>
          {status === 'In progress' && (
            <Tag
              color="#2db7f5"
              style={{ fontSize: '14px', padding: '8px 12px' }}
            >
              {status}
            </Tag>
          )}
          {status === 'Done' && (
            <Tag
              color="#87d068"
              style={{ fontSize: '14px', padding: '8px 12px' }}
            >
              {status}
            </Tag>
          )}
        </span>
      ),
    },
    {
      title: t('project_details.action'),
      align: 'center',
      key: 'action',
      width: '5%',
      render: (_, record) => (
        <Button
          key={`view-${record.id}`}
          // onClick={() => viewDetail(record)}
          style={{ marginRight: 8 }}
          icon={<EyeOutlined />}
        />
      ),
    },
  ]

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

  const [data, setData] = useState(hardCodedData) // Use hard-coded data initially
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  })

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    })

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData(hardCodedData) // Reset to hard-coded data when pageSize changes
    }
  }

  const displayValue = value => {
    return value !== null && value !== undefined ? value : ''
  }

  if (isLoading || !employee_details) {
    return <div> Loading...</div>
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

          {/* ///// */}
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
          {/* Content for Project tab */}
          <Table
            columns={columns}
            rowKey={record => record.id}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={isLoading}
            onChange={handleTableChange}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default EmployeeDetail
