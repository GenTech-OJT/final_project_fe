import { DashboardOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import '../AdminComponent.css'
const SideMenu = () => {
  const navigate = useNavigate()
  const [selectedKey, setSelectedKey] = useState(
    localStorage.getItem('selectedKey') || '1'
  )

  const { t } = useTranslation('translation')

  const handleMenuClick = item => {
    setSelectedKey(item.key)
    localStorage.setItem('selectedKey', item.key)
    navigate(item.key)
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
            label: t('dashboard_label'),
            icon: <DashboardOutlined />,
            key: '/',
          },
          {
            label: t('user_management_label'),
            icon: <UserOutlined />,
            key: '/users',
          },
        ]}
      />
    </div>
  )
}

export default SideMenu
