import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

const EmployeeTable = ({ columns, data, handleTableChange }) => {
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

EmployeeTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  handleTableChange: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  viewDetail: PropTypes.func.isRequired,
  deleteRecord: PropTypes.func.isRequired,
}

export default EmployeeTable
