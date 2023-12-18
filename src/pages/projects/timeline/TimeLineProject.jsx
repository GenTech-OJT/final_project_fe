/* eslint-disable no-unused-vars */
import { useGetEmployees } from '@hooks/useEmployee'
import { Radio, Timeline } from 'antd'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useGetProjects } from '@hooks/useProject'

const TimeLineProject = () => {
  const [mode, setMode] = useState('alternate')
  const { data: projects, isLoading: loadingEmployees } = useGetProjects({
    pageSize: 10000,
  })

  const onChange = e => {
    setMode(e.target.value)
  }

  // Chuyển đổi dữ liệu nhân viên thành items cho Timeline
  const timelineItems = projects?.data.map(project => ({
    key: project.id,
    label: project.name, // Gán nhãn là tên nhân viên
    // Gán nội dung là ngày sinh dưới dạng chuỗi định dạng ngày tháng
    children: (
      <div>
        <p>Start Date: {moment(project.start_date).format('DD/MM/YYYY')}</p>
        <p>End Date: {moment(project.end_date).format('DD/MM/YYYY')}</p>
      </div>
    ),
  }))

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
