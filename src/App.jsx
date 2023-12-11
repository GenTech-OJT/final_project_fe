import {
  CloseOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import AppFooter from '@components/AdminComponent/AppFooter'
import AppHeader from '@components/AdminComponent/AppHeader'
import AvatarGroup from '@components/AdminComponent/AvatarGroup'
import PageContent from '@components/AdminComponent/PageContent'
import SideMenu from '@components/AdminComponent/SideMenu'
import { Button, Col, Drawer, Layout, Row, theme } from 'antd'
import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router'
import './App.css'
import Login from '@pages/AdminPages/Login/Login'
const { Header, Content, Footer, Sider } = Layout
const App = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

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

  useEffect(() => {
    // Kiểm tra kích thước màn hình và set state isMobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900)
    }

    handleResize() // Đảm bảo kiểm tra kích thước ban đầu
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  if (isMobile) {
    return (
      <>
        <MenuOutlined
          type="primary"
          className="btn-open"
          onClick={showDrawer}
          style={{ margin: '20px' }}
        />
        <Layout hasSider>
          <Drawer
            // className="sider-menu"
            // theme="light"
            // style={{
            //   overflow: 'auto',
            // }}
            // trigger={null}
            // collapsible
            // collapsed={collapsed}

            placement="left"
            closable={false}
            onClose={onClose}
            open={open}
            key="left"
            className="menu-mobile"
          >
            {/* <div className="demo-logo-vertical" /> */}

            <Row
              align="middle"
              justify="space-between"
              style={{ paddingTop: '11px' }}
            >
              <Col>
                {/* <Button
          className="menu-btn"
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        /> */}
                <a
                  href="/"
                  onClick={() => navigate('/')}
                  onKeyDown={() => navigate('/')}
                >
                  <img
                    style={{ cursor: 'pointer', marginLeft: '12px' }}
                    src="https://wieldy.g-axon.work/assets/images/logo-white.png"
                    alt=""
                    className="logo"
                  />
                </a>
              </Col>
              <Col>
                <Button
                  className="close-icon"
                  onClick={onClose}
                  onKeyDown={onClose}
                >
                  <CloseOutlined />
                </Button>
              </Col>
            </Row>
            {/* Avatar */}
            <AvatarGroup
              setIsLogin={setIsLogin}
              setSelectedKey={setSelectedKey}
              collapsed={collapsed}
            />
            <SideMenu
              setOpen={setOpen}
              selectedKey={selectedKey}
              setSelectedKey={setSelectedKey}
            />
          </Drawer>
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
      </>
    )
  }
  return (
    <div>
      <div>
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
      </div>
    </div>
  )
}
export default App
