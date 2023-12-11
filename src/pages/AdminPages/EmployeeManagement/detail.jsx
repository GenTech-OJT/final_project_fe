import { ArrowLeftOutlined } from '@ant-design/icons'
import { Card, Col, Descriptions, Row, Tabs } from 'antd'
import Title from 'antd/es/skeleton/Title'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Chartpie from '../../../components/Chartpie/Chartpie'
import './detail.css'

const { TabPane } = Tabs

const EmployeeDetail = () => {
  const navigate = useNavigate()

  const { id } = useParams()
  const [employee, setEmployee] = useState(null)

  const getStatusDotColor = () => {
    return employee.status === 'active' ? 'green' : 'red'
  }

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
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
    return value !== null && value !== undefined ? value : 'None'
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
      <button
        className="back-to-list-button"
        onClick={() => navigate('/employees')}
      >
        <ArrowLeftOutlined style={{ marginRight: '7px' }} />
        Back
      </button>
      <Title className="page-title">EMPLOYEE DETAIL</Title>

      <Tabs
        defaultActiveKey="1"
        tabPosition="top"
        animated={true}
        style={{ height: '100%' }}
      >
        <TabPane tab={<span>Profile</span>} key="1">
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
                      {employee.status === 'active' ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>
                <div className="vertical-line"></div>
                <Col span={14}>
                  <div className="horizontal_container">
                    <div className="content_1">
                      <div className="employee_content">
                        <p className="employee_label">Employee code: </p>
                        <p className="employee_info">{employee.code}</p>
                      </div>
                      <div className="employee_content">
                        <p className="employee_label">Line manager: </p>
                        <p className="employee_info">
                          {capitalizeFirstLetter(
                            displayValue(employee.line_manager)
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="content_2">
                      <div className="employee_content">
                        <p className="employee_label">Phone number: </p>
                        <p className="employee_info">{employee.phone}</p>
                      </div>
                      <div className="employee_content">
                        <p className="employee_label">Email: </p>
                        <p className="employee_info">doeJane123@gmail.com</p>
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
                <p className="title">Personal Information</p>
                <hr className="profile_line" />

                <Col span={26}>
                  <Descriptions
                    column={2}
                    bordered
                    className="custom-descriptions"
                  >
                    <Descriptions.Item
                      label={<span style={{ fontWeight: 'bold' }}>Gender</span>}
                      className="custom-label"
                    >
                      {capitalizeFirstLetter(displayValue(employee.gender))}{' '}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <span style={{ fontWeight: 'bold' }}>
                          Identity code
                        </span>
                      }
                      className="custom-label"
                    >
                      {employee.identity}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <span style={{ fontWeight: 'bold' }}>Phone number</span>
                      }
                      className="custom-label"
                    >
                      {employee.phone}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <span style={{ fontWeight: 'bold' }}>Is manager</span>
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
                          Date of birth
                        </span>
                      }
                      className="custom-label"
                    >
                      {employee.dob}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <span style={{ fontWeight: 'bold' }}>Description</span>
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
        <TabPane tab={<span>Skill</span>} key="2">
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
        <TabPane tab={<span>Project</span>} key="3">
          {/* Content for Project tab */}
          <div className="create-container">Project Content</div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default EmployeeDetail
