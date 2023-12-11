import React, { Suspense, useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { Layout, Menu, Button, theme, Dropdown, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import Spinner from './admin/Spinner/Spinner'
import BreadCrumb from './admin/Breadcrumb/Breadcrumb'

const { Header, Sider, Content, Footer } = Layout

const AppLayout = ({ children }) => {
  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Button onClick={() => console.log('Logout')}>
          <UserOutlined /> Profile
        </Button>
      </Menu.Item>
      <Menu.Item key="1">
        <Button type="link" onClick={() => console.log('Logout')}>
          <LogoutOutlined /> Logout
        </Button>
      </Menu.Item>
    </Menu>
  )

  const items = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'Dashboard',
      to: '/admin/dashboard',
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: 'Employees',
      to: '/admin/employees',
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'Projects',
      to: '/admin/projects',
    },
  ]

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu mode="inline" theme="dark" defaultSelectedKeys={['1']}>
          {items.map(item => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.to}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Dropdown overlay={menu} trigger={['click']}>
            <Avatar icon={<UserOutlined />} />
          </Dropdown>
        </Header>
        <BreadCrumb />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Suspense fallback={<Spinner />}>
            <BreadCrumb />
            {children}
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
