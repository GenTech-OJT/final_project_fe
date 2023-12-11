import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import AppFooter from '@components/AdminComponent/AppFooter'
import AppHeader from '@components/AdminComponent/AppHeader'
import AvatarGroup from '@components/AdminComponent/AvatarGroup'
import BreadCrumb from '@components/AdminComponent/Breadcrumb/Breadcrumb'
import PageContent from '@components/AdminComponent/PageContent'
import SideMenu from '@components/AdminComponent/SideMenu'
import Spinner from '@components/AdminComponent/Spinner/Spinner'
import { Button, Layout, theme } from 'antd'
import { Suspense, useState } from 'react'
import { useNavigate } from 'react-router'
import './App.css'
const { Header, Content, Footer, Sider } = Layout
const App = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const [selectedKey, setSelectedKey] = useState(
    localStorage.getItem('selectedKey') || '1'
  )
  return (
    <Layout hasSider>
      <Sider
        className="sider-menu"
        theme="light"
        style={{
          overflow: 'auto',
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', paddingTop: '11px' }}
        >
          <Button
            className="menu-btn"
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          {!collapsed && (
            <img
              style={{ cursor: 'pointer', marginLeft: '12px' }}
              src="../logo-white.png"
              alt=""
              className="logo"
              onClick={() => navigate('/')}
              onKeyDown={() => navigate('/')}
            />
          )}
        </div>
        {/* Avatar */}
        <AvatarGroup setSelectedKey={setSelectedKey} collapsed={collapsed} />
        <SideMenu selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            padding: 0,
          }}
        >
          <AppHeader />
        </Header>
        <Content
          style={{
            minHeight: 280,
            backgroundColor: '#f5f5f5',
          }}
        >
          <Suspense fallback={<Spinner />}>
            <BreadCrumb />
            <PageContent />
          </Suspense>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            background: colorBgContainer,
          }}
        >
          <AppFooter />
        </Footer>
      </Layout>
    </Layout>
  )
}
export default App
