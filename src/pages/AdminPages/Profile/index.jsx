import React, { useState } from 'react'
import { Descriptions, Avatar, Button, DatePicker } from 'antd'
import './profile.css'

const Profile = () => {
  const [joinedDate, setJoinedDate] = useState(null)

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="avatar-section">
          <Avatar size={120} icon="user" />
          <div className="username">Admin</div>
        </div>
        <div className="info-section">
          <Descriptions title="Profile Information" column={1}>
            <Descriptions.Item label="Role">admin</Descriptions.Item>
            <Descriptions.Item label="Email Address">
              admin@gmail.com
            </Descriptions.Item>
            <Descriptions.Item label="Joined On">
              <DatePicker
                value={joinedDate}
                onChange={date => setJoinedDate(date)}
              />
            </Descriptions.Item>
          </Descriptions>
          <Button type="primary" className="change-password-button">
            Change Password
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Profile
