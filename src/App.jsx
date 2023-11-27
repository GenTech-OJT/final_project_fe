import React, { useState } from 'react'
import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { FaChevronDown } from 'react-icons/fa'
import { Layout, Menu, Button, theme, Popover, Avatar } from 'antd'
import PageContent from '@components/PageContent'
import AppHeader from '@components/AppHeader'
import SideMenu from '@components/SideMenu'
import AvatarGroup from '@components/AvatarGroup'
import AppFooter from '@components/AppFooter'
const { Header, Content, Footer, Sider } = Layout

const App = () => {
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

        <div style={{ display: 'flex', alignItems: 'center' }}>
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
            <img src="../logo-white.png" alt="" className="logo" />
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
            margin: '24px 16px',
            padding: 24,
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
