import { Suspense, useEffect, useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Layout, Menu, Button, theme } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from './admin/Spinner/Spinner'
import BreadCrumb from './admin/Breadcrumb/Breadcrumb'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedKey } from '../redux/Slice/menuSlice'

const { Header, Sider, Content } = Layout

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const selectedKey = useSelector(state => state.menu)

  useEffect(() => {
    const storedSelectedKey = localStorage.getItem('selectedKey')
    if (storedSelectedKey) {
      dispatch(setSelectedKey(storedSelectedKey))
    }
  }, [dispatch])

  const menuItems = [
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

  console.log('selectedKey', selectedKey)

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          selectedKeys={[selectedKey]}
          onClick={item => {
            localStorage.setItem('selectedKey', item.key)
            dispatch(setSelectedKey(item.key))
            navigate(item.key)
          }}
          items={[
            {
              key: '/admin/dashboard',
              icon: <UserOutlined />,
              label: 'Dashboard',
            },
            {
              key: '/admin/employees',
              icon: <VideoCameraOutlined />,
              label: 'Employees',
            },
            {
              key: '/admin/projects',
              icon: <UploadOutlined />,
              label: 'Projects',
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
