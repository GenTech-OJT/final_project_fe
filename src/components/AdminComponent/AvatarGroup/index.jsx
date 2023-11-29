/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar, Popover } from 'antd'
import React from 'react'
import '../AdminComponent.css'

import { useNavigate } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const AvatarGroup = ({ collapsed, setSelectedKey }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/logout')
    setSelectedKey('')
    localStorage.removeItem('selectedKey')
  }
  const handleProfile = () => {
    navigate('/profile')
    setSelectedKey('')
    localStorage.removeItem('selectedKey')
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
  setSelectedKey: PropTypes.string.isRequired,
}

export default AvatarGroup
