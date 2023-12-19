/* eslint-disable no-unused-vars */
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useGetProjectById } from '@hooks/useProject'
import { Avatar, Button, Card, Col, Row, Timeline } from 'antd'
import AOS from 'aos'
import 'aos/dist/aos.css' // Import CSS của AOS
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import './Timeline.css'

const TimeLineProject = () => {
  const { id } = useParams()
  const { data: project } = useGetProjectById(id)

  const [reverse, setReverse] = useState(false)

  const handleClick = () => {
    setReverse(!reverse)
  }
  useEffect(() => {
    AOS.init({}) // Khởi tạo AOS

    // Thêm các sự kiện theo scroll nếu cần
    window.addEventListener('scroll', AOS.refresh)

    return () => {
      window.removeEventListener('scroll', AOS.refresh)
    }
  }, [])

  const { t } = useTranslation('translation')
  const timelineItems = project
    ? [
        {
          key: 'start',
          label: (
            <p
              style={{
                marginRight: '15px',
                marginLeft: '15px',
                fontWeight: 'bold',
              }}
            >
              {project.name}
            </p>
          ),
          children: (
            <Row justify="start" align="middle" style={{ margin: '20px 0' }}>
              <Col span={24}>
                <p>
                  {t('project.start_date')}: &nbsp;
                  {moment(project.start_date).format('DD/MM/YYYY')}
                </p>
              </Col>
            </Row>
          ),
          date: moment(project.start_date),
          dot: <AppstoreOutlined style={{ fontSize: '20px', color: 'blue' }} />,
        },
        ...generateEmployeeTimelineItems(project, t),
        {
          key: 'end',
          label: (
            <p
              style={{
                marginLeft: '15px',
                marginRight: '15px',
                fontWeight: 'bold',
              }}
            >
              {project.name}
            </p>
          ),
          children: (
            <Row
              justify="end"
              align="middle"
              style={{ margin: '20px 0', marginRight: '10px' }}
            >
              <Col span={24}>
                <p>
                  {t('project.end_date')}: &nbsp;
                  {moment(project.end_date).format('DD/MM/YYYY')}
                </p>
              </Col>
            </Row>
          ),
          date: moment(project.end_date),
          dot: (
            <AppstoreOutlined style={{ fontSize: '20px', color: 'green' }} />
          ),
        },
      ]
    : []

  return (
    <Card
      className="timeline-card"
      bordered={false}
      title={t('title.timeline')}
      style={{
        width: '90%', // Chỉnh sửa độ rộng tùy thuộc vào thiết bị
        maxWidth: '800px', // Giới hạn độ rộng tối đa
        margin: 'auto',
        marginTop: '20px',
        borderRadius: '20px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px',
        padding: '16px',
      }}
    >
      <Timeline reverse={reverse} mode="alternate" items={timelineItems}>
        {/* Timeline receives items from timelineItems */}
      </Timeline>

      <Button
        type="primary"
        style={{
          marginTop: 16,
          fontWeight: 'bold',
          width: '50%',
          marginLeft: '27%',
        }}
        onClick={handleClick}
      >
        {<MenuUnfoldOutlined />} REVERSE
      </Button>
    </Card>
  )
}

const generateEmployeeTimelineItems = (project, t) => {
  const getRandomColor = () => {
    const array = new Uint32Array(1)
    window.crypto.getRandomValues(array)
    return `#${(array[0] & 0xffffff).toString(16).padStart(6, '0')}`
  }
  return project.employees
    ? project.employees.flatMap(employee => {
        const employeeIcon = (
          <UserOutlined style={{ fontSize: '20px', color: getRandomColor() }} />
        )
        return employee.periods
          ? employee.periods.map(period => {
              const leavingTime = period.leaving_time
                ? moment(period.leaving_time).format('DD/MM/YYYY')
                : null
              return {
                key: `${employee.id}-${period.joining_time}`,
                label: (
                  <p
                    style={{
                      marginLeft: '15px',
                      marginRight: '15px',
                      fontWeight: 'bold',
                    }}
                  >
                    {getEmployeeName(employee.name)}
                  </p>
                ),
                children: (
                  <Card
                    style={{
                      height: 'auto',
                      width: '90%',
                      maxWidth: '600px',
                      margin: 'auto',
                      marginTop: '20px',
                      borderRadius: '20px',
                      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
                      background: 'rgb(240, 240, 255)',
                    }}
                    data-aos="zoom-in-down"
                    data-aos-duration="1500"
                  >
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <p style={{ margin: '7px 0', textAlign: 'center  ' }}>
                          {t('project.joining_time')}: &nbsp;
                          {moment(period.joining_time).format('DD/MM/YYYY')}
                        </p>
                        {leavingTime !== null && ( // Kiểm tra leavingTime khác null
                          <p style={{ margin: '7px 0', textAlign: 'center  ' }}>
                            {t('project.leaving_time')}: &nbsp; {leavingTime}
                          </p>
                        )}
                      </Col>
                    </Row>
                  </Card>
                ),
                date: moment(period.joining_time),
                dot: <Avatar src={employee?.avatar} /> ?? employeeIcon,
              }
            })
          : []
      })
    : []
}

const getEmployeeName = employeeName => {
  // Assuming you have a function to get the employee name by ID
  // You can replace this with your actual implementation
  return `${employeeName}`
}

export default TimeLineProject
