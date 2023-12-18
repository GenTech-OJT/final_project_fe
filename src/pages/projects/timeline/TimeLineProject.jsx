/* eslint-disable no-unused-vars */
import { useGetProjectById, useGetProjects } from '@hooks/useProject'
import { Radio, Timeline, Tooltip } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import './Timeline.css'
import { useParams } from 'react-router'
const TimeLineProject = () => {
  const { id } = useParams()
  console.log(id)
  const [mode, setMode] = useState('alternate')
  const { data: projects, isLoading: loadingEmployees } = useGetProjects({
    pageSize: 10000,
  })
  const { data: project_id, isLoading } = useGetProjectById(id)
  console.log(project_id)
  const onChange = e => {
    setMode(e.target.value)
  }

  // Chuyển đổi dữ liệu nhân viên thành items cho Timeline
  const timelineItems = projects?.data.map(project => {
    const employeesTooltipContent = project.employees
      ? project.employees
          .map(employee => {
            const periodsContent = employee.periods
              ? employee.periods
                  .map(period => {
                    const joiningTime = period.joining_time
                    const leavingTime = period.leaving_time
                    return `Joining Time: ${moment(joiningTime).format(
                      'DD/MM/YYYY'
                    )}, Leaving Time: ${
                      leavingTime
                        ? moment(leavingTime).format('DD/MM/YYYY')
                        : 'Null'
                    }`
                  })
                  .join('\n')
              : ''
            return `ID: ${employee.id}\n${periodsContent}`
          })
          .join('\n')
      : ''
    return {
      key: project.id,
      label: project.name,
      children: (
        <Tooltip title={employeesTooltipContent}>
          <div>
            <p>Start Date: {moment(project.start_date).format('DD/MM/YYYY')}</p>
            <p>End Date: {moment(project.end_date).format('DD/MM/YYYY')}</p>
          </div>
        </Tooltip>
      ),
    }
  })

  return (
    <div className="timeline-container">
      <Timeline mode={mode} items={timelineItems}>
        {/* Timeline nhận items từ timelineItems */}
      </Timeline>
    </div>
  )
}

export default TimeLineProject
