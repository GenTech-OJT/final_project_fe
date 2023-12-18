/* eslint-disable react/prop-types */
import { SearchOutlined } from '@ant-design/icons'
import { Input, Table } from 'antd'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

const itemsPerPageOptions = [5, 10, 20]

const CustomTable = ({
  columns,
  data,
  handleTableChange,
  pagination,
  loading,
  locale,
}) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered={false}
      onChange={handleTableChange}
      showSorterTooltip={false}
      pagination={{
        ...pagination,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
        showSizeChanger: true,
      }}
      loading={loading}
      pageSpageSizeOptions={itemsPerPageOptions}
      scroll={{ x: true, y: '47vh' }}
      locale={locale}
    />
  )
}

CustomTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  handleTableChange: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
}

const CustomSearch = ({ handleChange }) => {
  const { t } = useTranslation('translation')
  return (
    <Input
      placeholder={t('button_input.search')}
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
        pageSpageSizeOptions={itemsPerPageOptions}
        scroll={{ x: true, y: 350 }}
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

export { CustomSearch, CustomTable, SortableTable, itemsPerPageOptions }
