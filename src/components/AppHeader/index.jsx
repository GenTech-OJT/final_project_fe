import React from 'react'
import '../../App.css'
import { DownOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Image, Input, Space, message } from 'antd'
import { CiSearch } from 'react-icons/ci'
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
      <CiSearch className="search-header" />
      <Input
        placeholder="Basic usage"
        bordered={false}
        className="header-input"
      />
      ;
      <Dropdown
        menu={{
          items,
          onClick,
        }}
      >
        <a onClick={e => e.preventDefault()}>
          <Space>
            Hover me, Click menu item
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  )
}

export default AppHeader
