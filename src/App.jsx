import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import AppFooter from '@components/AdminComponent/AppFooter'
import AppHeader from '@components/AdminComponent/AppHeader'
import AvatarGroup from '@components/AdminComponent/AvatarGroup'
import PageContent from '@components/AdminComponent/PageContent'
import SideMenu from '@components/AdminComponent/SideMenu'
import { Button, Layout, theme } from 'antd'
import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router'
import './App.css'
import Login from '@pages/AdminPages/Login'
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
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem('isLogin'))

  useEffect(() => {
    if (!isLogin) {
      navigate('/login')
    }
  }, [isLogin, navigate])

  const handleLogin = () => {
    setIsLogin(true)
    localStorage.setItem('isLogin', 'true')
  }
  return (
    <>
      {isLogin ? (
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
            {/* <div className="demo-logo-vertical" /> */}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: '11px',
              }}
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
                  src="https://wieldy.g-axon.work/assets/images/logo-white.png"
                  alt=""
                  className="logo"
                  onClick={() => navigate('/')}
                  onKeyDown={() => navigate('/')}
                />
              )}
            </div>
            {/* Avatar */}
            <AvatarGroup
              setIsLogin={setIsLogin}
              setSelectedKey={setSelectedKey}
              collapsed={collapsed}
            />
            <SideMenu
              selectedKey={selectedKey}
              setSelectedKey={setSelectedKey}
            />
          </Sider>
          <Layout
          // style={{
          //   marginLeft: 200,
          // }}
          >
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
              <PageContent />
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
      ) : (
        <Routes>
          <Route path="/login" element={<Login setIsLogin={handleLogin} />} />
          {/* Các route khác */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      )}
    </>
  )
}
export default App
