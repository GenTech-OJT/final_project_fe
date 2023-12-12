/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar, Button, Col, Popover, Row } from 'antd'
import '../AdminComponent.css'

import { DownOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const AvatarGroup = ({ collapsed, setSelectedKey }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const { t } = useTranslation('translation')
  const hide = () => {
    setOpen(false)
  }
  const handleOpenChange = newOpen => {
    setOpen(newOpen)
  }
  const handleLogout = () => {
    navigate('/login')
    setSelectedKey('')
    localStorage.removeItem('selectedKey')
  }
  // const handleProfile = () => {
  //   navigate('/profile')
  //   setSelectedKey('')
  //   localStorage.removeItem('selectedKey')
  // }

  const content = (
    <div className="popup-account">
      <div onClick={handleLogout} onKeyDown={handleLogout}>
        {t('side_menu.logout')}
      </div>
    </div>
  )
  return (
    // <Popover
    //   // style={{ marginTop: '-20px' }}
    //   content={content}
    //   trigger="click"
    //   open={open}
    //   onOpenChange={handleOpenChange}
    // >
    //   <div className="avatar-container">
    //     <Avatar src="https://source.unsplash.com/random" />
    //     {!collapsed && (
    //       <div className="avatar-dropdown">
    //         Ngo Tan Khoa
    //         <DownOutlined />
    //       </div>
    //     )}
    //   </div>
    // </Popover>
    <Popover
      content={content}
      title="Title"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Row
        align="middle"
        gutter={8}
        style={{ cursor: 'pointer', marginTop: '10px' }}
      >
        <Col flex="none">
          <Avatar src="https://source.unsplash.com/random" />
        </Col>
        {!collapsed && (
          <Col flex="none">
            <div className="avatar-dropdown">
              Ngo Tan Khoa
              <DownOutlined />
            </div>
          </Col>
        )}
      </Row>
    </Popover>
  )
}
AvatarGroup.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  setSelectedKey: PropTypes.string.isRequired,
}

export default AvatarGroup
