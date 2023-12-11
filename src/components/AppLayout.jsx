import { Suspense, useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Layout, Menu, Button, theme } from 'antd'
import { Link } from 'react-router-dom'
import Spinner from './admin/Spinner/Spinner'
import BreadCrumb from './admin/Breadcrumb/Breadcrumb'

const { Header, Sider, Content } = Layout

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

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
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
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
          ]}
        />
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
