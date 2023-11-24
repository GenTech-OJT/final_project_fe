/* eslint-disable react/prop-types */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
import { SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React from 'react'
import './ButotnInputSearch.css'
const ButtonInputSearch = props => {
  const { size, placeholder, textButton } = props
  return (
    <div className="search-container">
      <Input
        style={{ borderRadius: 0 }}
        size={size}
        placeholder={placeholder}
        allowClear
      />
      <Button
        style={{
          borderRadius: 0,
          backgroundColor: '#075ab6',
          borderColor: '#075ab6',
          color: '#fff',
        }}
        size={size}
        icon={<SearchOutlined />}
      >
        {textButton}
      </Button>
    </div>
  )
}

export default ButtonInputSearch
