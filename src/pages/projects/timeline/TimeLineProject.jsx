/* eslint-disable no-unused-vars */
import { useGetProjects } from '@hooks/useProject'
import { Radio, Timeline, Tooltip } from 'antd'
import moment from 'moment'
import { useState } from 'react'

const TimeLineProject = () => {
  const [mode, setMode] = useState('alternate')
  const { data: projects, isLoading: loadingEmployees } = useGetProjects({
    pageSize: 10000,
  })

  const onChange = e => {
    setMode(e.target.value)
  }

  // Chuyển đổi dữ liệu nhân viên thành items cho Timeline
  const timelineItems = projects?.data.map(project => {
    const employeesTooltipContent = project.employees
      ? project.employees
          .map(employee => {
            const joiningTime = employee.periods?.[0]?.joining_time
            const leavingTime = employee.periods?.[0]?.leaving_time
            return `ID: ${employee.id}, Joining Time: ${moment(
              joiningTime
            ).format('DD/MM/YYYY')}, Leaving Time: ${
              leavingTime
                ? moment(leavingTime).format('DD/MM/YYYY')
                : 'Still Active'
            }`
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
    <div>
      <Radio.Group onChange={onChange} value={mode}>
        <Radio value="left">Left</Radio>
        <Radio value="right">Right</Radio>
        <Radio value="alternate">Alternate</Radio>
      </Radio.Group>
      <Timeline mode={mode} items={timelineItems}>
        {/* Timeline nhận items từ timelineItems */}
      </Timeline>
    </div>
  )
}

export default TimeLineProject
