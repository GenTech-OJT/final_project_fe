import React from 'react'
import { Descriptions, Avatar, Card, Space } from 'antd'
import './profile.css'

const Profile = () => {
  return (
    <Card className="card_container">
      <h2 className="title">Profile Information </h2>
      <hr style={{ margin: '20px 0' }} />
      <div className="profile-content">
        <div className="avatar-section">
          <Avatar className="avt" icon="user" />
          <div className="username">Admin</div>
        </div>
        <div className="info-section">
          <Descriptions column={1}>
            <Descriptions.Item label="Role">admin</Descriptions.Item>
            <Descriptions.Item label="Email Address">
              admin@gmail.com
            </Descriptions.Item>
            <Descriptions.Item label="Joined On">
              09, May 2020
            </Descriptions.Item>
          </Descriptions>
          <Space className="profile_btn">
            <button className="profile-button">Edit Profile</button>
            <button className="profile-button">Change Password</button>
          </Space>
        </div>
      </div>
    </Card>
  )
}

export default Profile
