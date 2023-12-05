/* eslint-disable react/prop-types */
import { SearchOutlined } from '@ant-design/icons'
import { Input, Table } from 'antd'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

const CustomTable = ({ columns, data, handleTableChange, pagination }) => {
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

CustomTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  handleTableChange: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
}

const CustomSearch = ({ handleChange }) => {
  const { t } = useTranslation('translation')
  return (
    <Input
      placeholder={t('search')}
      onChange={handleChange}
      style={{ width: 200, marginBottom: 16 }}
      prefix={<SearchOutlined />}
    />
  )
}

CustomSearch.propTypes = {
  handleChange: PropTypes.func.isRequired,
}

const SortableTable = ({
  columns,
  data,
  handleTableChange,
  pagination,
  handleChange,
}) => {
  const { t } = useTranslation('translation')
  return (
    <>
      <Input
        placeholder={t('position')}
        onChange={handleChange}
        style={{ width: 200, marginBottom: 16 }}
        prefix={<SearchOutlined />}
      />
      <Table
        columns={columns}
        dataSource={data}
        bordered
        onChange={handleTableChange}
        pagination={pagination}
      />
    </>
  )
}

SortableTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  handleTableChange: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export { CustomSearch, CustomTable, SortableTable }
