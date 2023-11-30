import React from 'react'
import { Table, Button } from 'antd'
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons'

const EmployeeTable = ({
  columns,
  data,
  handleTableChange,
  edit,
  viewDetail,
  deleteRecord,
}) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      onChange={handleTableChange}
      rowKey="id"
    />
  )
}

export default EmployeeTable
