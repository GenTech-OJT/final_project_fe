import { Radio, Timeline } from 'antd'
import React, { useState, useEffect } from 'react'

const TimeLineProject = () => {
  const [mode, setMode] = useState('left')
  const [userData, setUserData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://reqres.in/api/users?page=2')
        const data = await response.json()
        setUserData(data.data) // Lưu trữ dữ liệu người dùng từ API
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchData()
  }, [])

  const onChange = e => {
    setMode(e.target.value)
  }

  return (
    <div>
      <Radio.Group onChange={onChange} value={mode}>
        <Radio value="left">Left</Radio>
        <Radio value="right">Right</Radio>
        <Radio value="alternate">Alternate</Radio>
      </Radio.Group>
      <Timeline mode={mode}>
        {userData.map(user => (
          <Timeline.Item
            key={user.id}
            label={user.first_name + ' ' + user.last_name} // Gán nhãn là tên người dùng
          >
            {user.email} {/* Gán nội dung là email người dùng */}
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  )
}

export default TimeLineProject
