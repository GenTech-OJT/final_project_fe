/* eslint-disable react/prop-types */
import { Avatar, Popover } from 'antd'
import React from 'react'
import { FaChevronDown } from 'react-icons/fa'
import '../../App.css'
const content = (
  <div>
    <p>My Account</p>
    <p>Logout</p>
  </div>
)
const AvatarGroup = ({ collapsed }) => {
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
