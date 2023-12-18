/* eslint-disable no-unused-vars */
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons'
import 'aos/dist/aos.css' // Import CSS của AOS
import AOS from 'aos'
import { useGetProjectById } from '@hooks/useProject'
import { Button, Card, Col, Row, Timeline } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './Timeline.css'

const TimeLineProject = () => {
  const { id } = useParams()
  const { data: project, isLoading } = useGetProjectById(id)
  console.log(project?.employees)

  const [mode, setMode] = useState('alternate')

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

  const onChange = e => {
    setMode(e.target.value)
  }

  const timelineItems = project
    ? [
        {
          key: 'start',
          label: project.name,
          children: (
            <Row justify="start" align="middle" style={{ margin: '20px 0' }}>
              <Col span={24}>
                <p>{`Start Date: ${moment(project.start_date).format(
                  'DD/MM/YYYY'
                )}`}</p>
              </Col>
            </Row>
          ),
          date: moment(project.start_date),
          dot: <AppstoreOutlined style={{ fontSize: '20px', color: 'blue' }} />,
        },
        ...generateEmployeeTimelineItems(project),
        {
          key: 'end',
          label: project.name,
          children: (
            <Row justify="end" align="middle" style={{ margin: '20px 0' }}>
              <Col span={24}>
                <p>{`End Date: ${moment(project.end_date).format(
                  'DD/MM/YYYY'
                )}`}</p>
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
      title="Project Timeline"
      style={{
        width: '90%', // Chỉnh sửa độ rộng tùy thuộc vào thiết bị
        maxWidth: '800px', // Giới hạn độ rộng tối đa
        margin: 'auto',
        marginTop: '20px',
        borderRadius: '20px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
        padding: '16px',
        overflowY: 'auto', // Thêm thanh cuộn dọc
      }}
    >
      <Timeline
        pending="Recording..."
        reverse={reverse}
        mode={mode}
        items={timelineItems}
      >
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

const generateEmployeeTimelineItems = project => {
  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`
  return project.employees
    ? project.employees.flatMap(employee => {
        const employeeIcon = (
          <UserOutlined style={{ fontSize: '20px', color: getRandomColor() }} />
        )
        return employee.periods
          ? employee.periods.map(period => ({
              key: `${employee.id}-${period.joining_time}`,
              label: `${getEmployeeName(employee.name)}`,
              children: (
                <Card
                  style={{
                    height: 'auto', // Chỉnh chiều cao tự động để thẻ phù hợp với nội dung
                    width: '90%', // Điều chỉnh chiều rộng tùy thuộc vào thiết bị
                    maxWidth: '600px',
                    margin: 'auto',
                    marginTop: '20px',
                    borderRadius: '20px',
                    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
                  }}
                  data-aos="zoom-in-down"
                  data-aos-duration="1500"
                >
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <p
                        style={{ margin: '7px 0', textAlign: 'center  ' }}
                      >{`Joining Time: ${moment(period.joining_time).format(
                        'DD/MM/YYYY'
                      )}`}</p>
                      <p
                        style={{ margin: '7px 0', textAlign: 'center  ' }}
                      >{`Leaving Time: ${moment(
                        period.leaving_time || project.end_date
                      ).format('DD/MM/YYYY')}`}</p>
                    </Col>
                  </Row>
                </Card>
              ),
              date: moment(period.joining_time),
              dot: employeeIcon,
            }))
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
