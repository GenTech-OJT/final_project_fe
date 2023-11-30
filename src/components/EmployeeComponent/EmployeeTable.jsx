import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

const EmployeeTable = ({ columns, data, handleTableChange, pagination }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      onChange={handleTableChange}
      pagination={pagination}
    />
  )
}

EmployeeTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  handleTableChange: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
}

export default EmployeeTable
