/* eslint-disable react/prop-types */
import { Avatar, Popover } from 'antd'
import '../AdminComponent.css'

import { DownOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const AvatarGroup = ({ collapsed }) => {
  const navigate = useNavigate()

  const { t } = useTranslation('translation')

  const handleLogout = () => {
    navigate('/logout')
  }
  const handleProfile = () => {
    navigate('/profile')
  }

  const content = (
    <div className="popup-account">
      <div onClick={handleProfile} onKeyDown={handleProfile}>
        {t('my_account')}
      </div>
      <div onClick={handleLogout} onKeyDown={handleLogout}>
        {t('logout')}
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
