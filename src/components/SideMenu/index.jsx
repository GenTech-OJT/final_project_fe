import React, { useState } from 'react'
import '../../App.css'
import { Avatar, Button, Menu } from 'antd'
import { DashboardOutlined, UserOutlined } from '@ant-design/icons'
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
          //   label: 'Customers',
          //   key: '/customers',
          // },
        ]}
      />
    </div>
  )
}

export default SideMenu
