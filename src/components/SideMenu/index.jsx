import React, { useState } from 'react'
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
  return (
    <div className="SideMenu">
      <Menu
        onClick={item => {
          navigate(item.key)
        }}
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
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
