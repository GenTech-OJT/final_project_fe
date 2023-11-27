/* eslint-disable react/prop-types */
import { Avatar, Popover } from 'antd'
import React from 'react'
import { FaChevronDown } from 'react-icons/fa'
import '../../App.css'
import { useNavigate } from 'react-router-dom'
const AvatarGroup = ({ collapsed }) => {
  const history = useNavigate()

  const handleLogout = () => {
    history('/users')
  }
  const handleProfile = () => {
    history('/profile')
  }

  const content = (
    <div className="popup-account">
      <p onClick={handleProfile}>My Account</p>
      <p onClick={handleLogout}>Logout</p>
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
            <FaChevronDown />
          </div>
        )}
      </div>
    </Popover>
  )
}

export default AvatarGroup
