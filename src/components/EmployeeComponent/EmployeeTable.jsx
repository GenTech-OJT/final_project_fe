/* eslint-disable react/prop-types */
import { SearchOutlined } from '@ant-design/icons'
import { Input, Table } from 'antd'
import PropTypes from 'prop-types'
import '../../pages/AdminPages/EmployeeManagement/employeeStyle.css'

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

const EmployeeSearch = ({ handleChange }) => {
  return (
    <Input
      placeholder="Search"
      onChange={handleChange}
      style={{ width: 200, marginBottom: 16 }}
      prefix={<SearchOutlined />}
    />
  )
}

EmployeeSearch.propTypes = {
  handleChange: PropTypes.func.isRequired,
}

export { EmployeeSearch, EmployeeTable }
