/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import '../AdminComponent.css'
import { Menu } from 'antd'
import { DashboardOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'
import PropTypes from 'prop-types'

const SideMenu = ({ selectedKey, setSelectedKey }) => {
  const navigate = useNavigate()

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

SideMenu.propTypes = {
  selectedKey: PropTypes.string.isRequired,
  setSelectedKey: PropTypes.string.isRequired,
}

export default SideMenu
