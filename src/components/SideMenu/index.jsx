import React, { useEffect, useState } from 'react'
import '../../App.css'
import { Avatar, Button, Menu } from 'antd'
import {
  DashboardOutlined,
  DatabaseOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router'
const SideMenu = () => {
  const navigate = useNavigate()
  const [selectedKey, setSelectedKey] = useState(
    localStorage.getItem('selectedKey') || '1'
  )

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
            label: 'Dashboard',
            icon: <DashboardOutlined />,
            key: '/',
          },
          {
            label: 'User Management',
            icon: <UserOutlined />,
            key: '/users',
          },
          // {
          //   label: 'Products',
          //   icon: <DatabaseOutlined />,
          //   key: 'products',
          //   type: 'group',
          //   // children dropdown
          //   children: [
          //     { label: 'Revenue', key: 'rev' },
          //     // { label: 'Express', key: '/users' },
          //   ],
          // },
          // {
          //   label: 'Customers',
          //   key: 'customers',
          //   children: [{ label: 'Revenue', key: 'rev' }],
          // },
        ]}
      />
    </div>
  )
}

export default SideMenu
