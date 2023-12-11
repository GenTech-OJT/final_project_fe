import { ArrowLeftOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Card, Col, Descriptions, Row, Table, Tabs } from 'antd'
import Title from 'antd/es/skeleton/Title'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useNavigate, useParams } from 'react-router-dom'
import Chartpie from '../../../components/Chartpie/Chartpie'
import './Detail.css'

const { TabPane } = Tabs

const EmployeeDetail = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('translation')

  const { id } = useParams()
  const [employee, setEmployee] = useState(null)

  const getStatusDotColor = () => {
    return employee.status === 'active' ? 'green' : 'red'
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
            <Button style={{ backgroundColor: 'blue', color: 'white' }}>
              {status}
            </Button>
          )}
          {status === 'Done' && (
            <Button style={{ backgroundColor: 'green', color: 'white' }}>
              {status}
            </Button>
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
        <>
          <Button
            key={`view-${record.id}`}
            // onClick={() => viewDetail(record)}
            style={{ marginRight: 8 }}
            icon={<EyeOutlined />}
          />
        </>
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
    // Add more data as needed
  ]

  const [data, setData] = useState(hardCodedData) // Use hard-coded data initially
  const [loading, setLoading] = useState(false)
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

  // Function to generate data for Chartpie from employee skills
  const generateChartData = skills => {
    const labels = skills.map(
      skill =>
        `${skill.name.charAt(0).toUpperCase()}${skill.name.slice(1)}   -   ${
          skill.year
        } years`
    )
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

  useEffect(() => {
    const fetchEmployeeDetail = async () => {
      try {
        const response = await fetch(
          `https://final-project-be.onrender.com/employees/${id}`
        )

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const employeeData = await response.json()
        setEmployee(employeeData)
      } catch (error) {
        console.error('Error fetching employee details:', error)
      }
    }

    fetchEmployeeDetail()
  }, [id])

  if (!employee) {
    return <div>Loading...</div>
  }

  return (
    <div className="page-container">
      <h2>Detail Employee</h2>
      <Title className="page-title">EMPLOYEE DETAIL</Title>

      <Tabs
        defaultActiveKey="1"
        tabPosition="top"
        animated={true}
        style={{ height: '100%' }}
      >
        <TabPane tab={<span> {t('employee_details.profile')}</span>} key="1">
          {/* Content for Profile tab */}
          <Card style={{ backgroundColor: ' rgb(245, 245, 245)' }}>
            <Row gutter={16} justify="center" align="middle">
              <Col span={24} className="employee_avt">
                <img
                  src={employee.avatar}
                  alt="Employee Avatar"
                  className="avt"
                />
                <div className="employee_title">
                  <p className="employee_name">{employee.name}</p>
                  <p className="employee_position">{employee.position}</p>
                  <div className="status-show">
                    <div
                      className="status-dot"
                      style={{ backgroundColor: getStatusDotColor() }}
                    ></div>
                    <p className="status-text">
                      {employee.status === 'active'
                        ? t('employee_details.active')
                        : t('employee_details.inactive')}
                    </p>
                  </div>
                </div>
                <div className="vertical-line"></div>
                <Col span={14}>
                  <div className="horizontal_container">
                    <div className="content_1">
                      <div className="employee_content">
                        <p className="employee_label">
                          {t('employee_details.employee_code')}
                          {' : '}
                        </p>
                        <p className="employee_info">{employee.code}</p>
                      </div>
                      <div className="employee_content">
                        <p className="employee_label">
                          {t('employee_details.line_manager')}
                          {' : '}
                        </p>
                        <p className="employee_info">
                          {capitalizeFirstLetter(
                            displayValue(employee.line_manager)
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="content_2">
                      <div className="employee_content">
                        <p className="employee_label">
                          {t('employee_details.phone_number')}
                          {' : '}
                        </p>
                        <p className="employee_info">{employee.phone}</p>
                      </div>
                      <div className="employee_content">
                        <p className="employee_label">Email : </p>
                        <p className="employee_info">{employee.email}</p>
                      </div>
                    </div>
                  </div>
                  {/* Add more view-only information as needed */}
                </Col>
              </Col>
            </Row>
          </Card>
          <Card
            style={{
              marginTop: 20,
              width: '100%',
              backgroundColor: ' rgb(245, 245, 245)',
            }}
          >
            <Row gutter={16} justify="center" align="middle">
              <Col span={23}>
                <p className="title">{t('employee_details.personal_info')}</p>
                <hr className="profile_line" />

                <Col span={26}>
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
                      {capitalizeFirstLetter(displayValue(employee.gender))}{' '}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <span style={{ fontWeight: 'bold' }}>
                          {t('employee_details.identity_code')}
                        </span>
                      }
                      className="custom-label"
                    >
                      {employee.identity}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <span style={{ fontWeight: 'bold' }}>
                          {t('employee_details.phone_number')}
                        </span>
                      }
                      className="custom-label"
                    >
                      {employee.phone}
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
                        displayValue(employee.is_manager ? 'Yes' : 'No')
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <span style={{ fontWeight: 'bold' }}>
                          {t('employee_details.dob')}
                        </span>
                      }
                      className="custom-label"
                    >
                      {employee.dob}
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
                        displayValue(employee.description)
                      )}
                    </Descriptions.Item>
                  </Descriptions>
                  {/* Add more view-only information as needed */}
                </Col>
              </Col>
            </Row>
          </Card>
        </TabPane>
        {/* next page */}
        <TabPane tab={<span>{t('employee_details.skill')}</span>} key="2">
          {/* Content for Skill tab */}
          <Card style={{ backgroundColor: ' rgb(245, 245, 245)' }}>
            <Row gutter={16} justify="center" align="middle">
              <Col span={22}>
                {employee.skills && employee.skills.length > 0 ? (
                  <div>
                    <Chartpie data={generateChartData(employee.skills)} />
                  </div>
                ) : (
                  <p>No skills available</p>
                )}
              </Col>
            </Row>
          </Card>
        </TabPane>
        <TabPane tab={<span>{t('employee_details.project')}</span>} key="3">
          {/* Content for Project tab */}
          <Table
            columns={columns}
            rowKey={record => record.id}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default EmployeeDetail
