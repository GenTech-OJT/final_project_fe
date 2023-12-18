/* eslint-disable no-unused-vars */
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useGetProjectById } from '@hooks/useProject'
import { Button, Card, Timeline } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import { useParams } from 'react-router'
import './Timeline.css'

const TimeLineProject = () => {
  const { id } = useParams()
  const { data: project, isLoading } = useGetProjectById(id)
  console.log(project)

  const [mode, setMode] = useState('alternate')

  const [reverse, setReverse] = useState(false)

  const handleClick = () => {
    setReverse(!reverse)
  }

  const onChange = e => {
    setMode(e.target.value)
  }

  const timelineItems = project
    ? [
        {
          key: 'start',
          label: project.name,
          children: (
            <div>
              <p
                style={{ margin: '20px 0', marginLeft: '7px' }}
              >{`Start Date: ${moment(project.start_date).format(
                'DD/MM/YYYY'
              )}`}</p>
            </div>
          ),
          date: moment(project.start_date),
          dot: <AppstoreOutlined style={{ fontSize: '20px', color: 'blue' }} />,
        },
        ...generateEmployeeTimelineItems(project),
        {
          key: 'end',
          label: project.name,
          children: (
            <div>
              <p
                style={{ margin: '20px 0', marginRight: '7px' }}
              >{`End Date: ${moment(project.end_date).format(
                'DD/MM/YYYY'
              )}`}</p>
            </div>
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
        width: '60%',
        margin: 'auto',
        marginTop: '20px',
        borderRadius: '20px',
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
        padding: '16px',
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
              label: `${getEmployeeName(employee.id)}`,
              children: (
                <Card
                  style={{
                    height: '10%',
                    width: '90%',
                    margin: 'auto',
                    marginTop: '20px',
                    borderRadius: '20px',
                    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div>
                    <p style={{ margin: '7px 0' }}>
                      {`Joining Time: ${moment(period.joining_time).format(
                        'DD/MM/YYYY'
                      )}`}
                    </p>
                    <p style={{ margin: '7px 0' }}>
                      {`Leaving Time: ${moment(
                        period.leaving_time || project.end_date
                      ).format('DD/MM/YYYY')}`}
                    </p>
                  </div>
                </Card>
              ),
              date: moment(period.joining_time),
              dot: employeeIcon,
            }))
          : []
      })
    : []
}

const getEmployeeName = employeeId => {
  // Assuming you have a function to get the employee name by ID
  // You can replace this with your actual implementation
  return `Employee ${employeeId}`
}

export default TimeLineProject
