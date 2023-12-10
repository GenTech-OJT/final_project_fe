import React, { useState } from 'react'
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
const { Header, Sider, Content } = Layout

const AppLayout = ({ children }) => {
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
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu mode="inline" theme="dark" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/admin/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/admin/users">Users</Link>
          </Menu.Item>
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
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
