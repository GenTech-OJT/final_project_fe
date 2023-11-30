import React from 'react'
import { Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import '../../pages/AdminPages/EmployeeManagement/employeeStyle.css'
const EmployeeSearch = ({ handleChange }) => {
  return (
    <>
      <Input
        placeholder="Search"
        onChange={handleChange}
        style={{ width: 200, marginBottom: 16 }}
        prefix={<SearchOutlined />}
      />
    </>
  )
}

export default EmployeeSearch
