/* eslint-disable react/prop-types */
import { Avatar, Popover } from 'antd'
import React from 'react'
import '../../../App.css'
import { useNavigate } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const AvatarGroup = ({ collapsed }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/users')
  }
  const handleProfile = () => {
    navigate('/profile')
  }

  const content = (
    <div className="popup-account">
      <div onClick={handleProfile} onKeyDown={handleProfile}>
        My Account
      </div>
      <div onClick={handleLogout} onKeyDown={handleLogout}>
        Logout
      </div>
    </div>
  )
  return (
    <Popover
      // style={{ marginTop: '-20px' }}
      content={content}
      trigger="click"
    >
      <div className="avatar-container">
        <Avatar src="https://source.unsplash.com/random" />
        {!collapsed && (
          <div className="avatar-dropdown">
            Ngo Tan Khoa
            <DownOutlined />
          </div>
        )}
      </div>
    </Popover>
  )
}
AvatarGroup.propTypes = {
  collapsed: PropTypes.bool.isRequired,
}
export default AvatarGroup
