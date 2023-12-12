import { Suspense, useEffect, useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  ProjectOutlined,
} from '@ant-design/icons'
import { Layout, Menu, Button, theme, Select, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import Spinner from './admin/Spinner/Spinner'
import BreadCrumb from './admin/Breadcrumb/Breadcrumb'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedKey } from '../redux/Slice/menuSlice'
import { useTranslation } from 'react-i18next'

const { Header, Sider, Content } = Layout

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const { t, i18n } = useTranslation('translation')
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem('selectedLanguage') || 'eng'
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const selectedKey = useSelector(state => state.menu)

  useEffect(() => {
    const storedSelectedKey = localStorage.getItem('selectedKey')
    if (storedSelectedKey) {
      dispatch(setSelectedKey(storedSelectedKey))
    }
  }, [dispatch])

  const changeLanguage = value => {
    setSelectedLanguage(value)
    i18n.changeLanguage(value)
    // Save selected language to localStorage
    localStorage.setItem('selectedLanguage', value)
  }

  // Update language
  useEffect(() => {
    i18n.changeLanguage(selectedLanguage)
  }, [selectedLanguage, i18n])

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
              icon: <DashboardOutlined />,
              label: t('side_menu.dashboard_label'),
            },
            {
              key: '/admin/employees',
              icon: <UserOutlined />,
              label: t('side_menu.employee_management_label'),
            },
            {
              key: '/admin/projects',
              icon: <ProjectOutlined />,
              label: t('side_menu.project_management_label'),
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
          <Space wrap>
            <Select
              value={selectedLanguage}
              style={{
                width: 120,
              }}
              onChange={changeLanguage}
              options={[
                {
                  value: 'eng',
                  label: t('English'),
                },
                {
                  value: 'vi',
                  label: t('Tiếng Việt'),
                },
              ]}
            />
          </Space>
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
