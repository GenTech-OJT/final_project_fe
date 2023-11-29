import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import AppFooter from '@components/AdminComponent/AppFooter'
import AppHeader from '@components/AdminComponent/AppHeader'
import AvatarGroup from '@components/AdminComponent/AvatarGroup'
import PageContent from '@components/AdminComponent/PageContent'
import SideMenu from '@components/AdminComponent/SideMenu'
import { Button, Layout, theme } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import './App.css'
const { Header, Content, Footer, Sider } = Layout
const App = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Layout hasSider>
      <Sider
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
          style={{ display: 'flex', alignItems: 'center', paddingTop: '11px' }}
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
        <AvatarGroup collapsed={collapsed} />
        <SideMenu />
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
  )
}
export default App
