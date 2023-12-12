import {
  ProjectOutlined,
  UserOutlined,
  DashboardOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

const SideMenu = ({ selectedKey, setSelectedKey, setOpen }) => {
  const navigate = useNavigate()

  const { t } = useTranslation('translation')

  const handleMenuClick = item => {
    setSelectedKey(item.key)
    localStorage.setItem('selectedKey', item.key)
    navigate(item.key)
    setOpen(false)
  }

  useEffect(() => {
    const storedKey = localStorage.getItem('selectedKey')
    if (storedKey) {
      setSelectedKey(storedKey)
    }
  }, [])

  return (
    <div className="SideMenu">
      <Menu
        onClick={handleMenuClick}
        theme="light"
        mode="inline"
        defaultSelectedKeys={[selectedKey]}
        selectedKeys={[selectedKey]}
        items={[
          {
            label: t('side_menu.dashboard_label'),
            icon: <DashboardOutlined />,
            key: '/',
          },
          {
            label: t('side_menu.project_management_label'),
            icon: <ProjectOutlined />,
            key: '/projects',
          },
          {
            label: t('side_menu.employee_management_label'),
            icon: <UserOutlined />,
            key: '/employees',
          },
        ]}
      />
    </div>
  )
}

SideMenu.propTypes = {
  selectedKey: PropTypes.string.isRequired,
  setSelectedKey: PropTypes.string.isRequired,
  setOpen: PropTypes.bool,
}

export default SideMenu
