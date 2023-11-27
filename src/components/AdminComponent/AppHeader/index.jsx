import React from 'react'
import '../../../App.css'
import { DownOutlined, SearchOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Input, Space, message } from 'antd'
const onClick = ({ key }) => {
  message.info(`Click on item ${key}`)
}
const items = [
  {
    label: '1st menu item',
    key: '1',
  },
  {
    label: '2nd menu item',
    key: '2',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
]
const AppHeader = () => {
  return (
    <div className="AppHeader">
      <SearchOutlined className="search-header" />
      <Input
        placeholder="Basic usage"
        bordered={false}
        className="header-input"
      />
      {/* Translate */}
      <Dropdown
        menu={{
          items,
          onClick,
        }}
      >
        <a
          onClick={e => e.preventDefault()}
          onKeyDown={e => e.preventDefault()}
        >
          <Space>
            <Avatar src="https://source.unsplash.com/random" />
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  )
}

export default AppHeader
