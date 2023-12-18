/* eslint-disable no-unused-vars */
import { useGetProjectById } from '@hooks/useProject'
import { Timeline } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import { useParams } from 'react-router'
import './Timeline.css'

const TimeLineProject = () => {
  const { id } = useParams()
  const { data: project, isLoading } = useGetProjectById(id)
  console.log(project)

  const [mode, setMode] = useState('alternate')

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
              <p>{`Start Date: ${moment(project.start_date).format(
                'DD/MM/YYYY'
              )}`}</p>
            </div>
          ),
          date: moment(project.start_date),
        },
        ...generateEmployeeTimelineItems(project),
        {
          key: 'end',
          label: project.name,
          children: (
            <div>
              <p>{`End Date: ${moment(project.end_date).format(
                'DD/MM/YYYY'
              )}`}</p>
            </div>
          ),
          date: moment(project.end_date),
        },
      ]
    : []

  return (
    <div className="timeline-container">
      <Timeline mode={mode} items={timelineItems}>
        {/* Timeline receives items from timelineItems */}
      </Timeline>
    </div>
  )
}

const generateEmployeeTimelineItems = project => {
  return project.employees
    ? project.employees.flatMap(employee => {
        return employee.periods
          ? employee.periods.map(period => ({
              key: `${employee.id}-${period.joining_time}`,
              label: `${getEmployeeName(employee.id)}`,
              children: (
                <div>
                  <p>{`(${moment(period.joining_time).format(
                    'DD/MM/YYYY'
                  )} - ${moment(period.leaving_time || project.end_date).format(
                    'DD/MM/YYYY'
                  )})`}</p>
                </div>
              ),
              date: moment(period.joining_time),
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
