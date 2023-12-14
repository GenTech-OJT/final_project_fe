/* eslint-disable no-undef */
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { CustomSearch, CustomTable } from '@components/custom/CustomTable'
import { Button, Spin, Empty } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import './List.css'
import { useGetEmployees, useChangeStatus } from '@hooks/useEmployee'
import { showToast } from '@components/toast/ToastCustom'
// import DeleteEmployee from './delete'

const EmployeeList = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('translation')

  const [tableData, setTableData] = useState({
    gridData: [],
    searchText: '',
    sortedInfo: {},
    pagination: {
      current: 1,
      pageSize: 5,
      total: 14,
    },
  })

  const employees = {
    page: tableData.pagination.current,
    pageSize: tableData.pagination.pageSize,
    sortColumn: tableData.sortedInfo.columnKey || 'id',
    sortOrder: tableData.sortedInfo.order || 'asc',
    searchText: tableData.searchText,
  }

  const { data, refetch, isLoading } = useGetEmployees(employees)

  console.log('data', data)

  const edit = id => {
    navigate('/admin/employees/edit/' + id)
  }

  const viewDetail = record => {
    navigate(`/admin/employees/detail/${record.id}`)
  }

  const deleteRecord = recordId => {
    // Handle logic to delete the selected record
    console.log('Delete Record:', recordId)
  }

  const { mutateAsync: changeStatusMutateAsync } = useChangeStatus()

  const toggleStatus = async record => {
    try {
      await changeStatusMutateAsync(record.id, {
        status: record.status === 'active' ? 'inactive' : 'active',
      })

      const updatedData = await refetch()
      console.log('updatedData after refetch:', updatedData)

      if (
        changeStatusMutateAsync.isSuccess &&
        updatedData.isSuccess &&
        updatedData.data &&
        updatedData.data.data
      ) {
        // Cập nhật dữ liệu trong bảng
        setTableData({
          ...tableData,
          gridData: updatedData.data.data,
        })

        // Hiển thị thông báo thành công
        const successMessage =
          record.status === 'active'
            ? t('message.deactivated_successfully')
            : t('message.activated_successfully')

        showToast(successMessage, 'success')
      } else {
        console.error('Error updating status:', updatedData.error)
        throw new Error('Error updating status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      showToast(t('status_update_failed'), 'error')
    }
  }

  const handleChange = e => {
    const value = e.target.value
    setTableData({
      ...tableData,
      searchText: value,
      pagination: { ...tableData.pagination, current: 1 },
    })
  }

  const locale = {
    emptyText: (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={t('employee.no_data')}
      />
    ),
  }

  const handleTableChange = (pagination, filters, sorter) => {
    const isSameColumn = tableData.sortedInfo.columnKey === sorter.columnKey
    const order =
      isSameColumn && tableData.sortedInfo.order === 'asc' ? 'desc' : 'asc'

    setTableData({
      ...tableData,
      sortedInfo: {
        columnKey: sorter.columnKey,
        order: order,
      },
      pagination: {
        ...pagination,
        current: pagination.current,
      },
    })
  }

  const handlePaginationChange = (current, pageSize) => {
    setTableData({
      ...tableData,
      pagination: { ...tableData.pagination, current, pageSize },
    })
  }

  const itemsPerPageOptions = [5, 10, 20]
  const handleItemsPerPageChange = pageSize => {
    // Update pagination in the state
    setTableData({
      ...tableData,
      pagination: { ...tableData.pagination, pageSize, current: 1 },
    })
  }

  const convertBooleanToString = isManager => (isManager ? 'Yes' : 'No')

  const columns = [
    {
      title: 'ID',
      align: 'center',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      sortOrder:
        tableData.sortedInfo.columnKey === 'id' && tableData.sortedInfo.order,
    },
    {
      title: t('table_header.name'),
      align: 'center',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      sortOrder:
        tableData.sortedInfo.columnKey === 'name' && tableData.sortedInfo.order,
    },
    {
      title: t('table_header.status'),
      align: 'center',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      sortOrder:
        tableData.sortedInfo.columnKey === 'status' &&
        tableData.sortedInfo.order,
      render: (_, record) => (
        <Button
          type={record.status === 'active' ? 'primary' : 'danger'}
          onClick={() => toggleStatus(record)}
          style={{
            backgroundColor: record.status === 'active' ? '#1890ff' : '#ff4d4f',
            borderColor: 'transparent',
            color: 'white',
          }}
        >
          {record.status === 'active'
            ? t('button_input.active')
            : t('button_input.inactive')}
        </Button>
      ),
    },
    {
      title: t('table_header.position'),
      align: 'center',
      dataIndex: 'position',
      key: 'position',
      sorter: true,
      sortOrder:
        tableData.sortedInfo.columnKey === 'position' &&
        tableData.sortedInfo.order,
    },
    {
      title: t('table_header.is_manager'),
      align: 'center',
      dataIndex: 'is_manager',
      key: 'is_manager',
      sorter: true,
      sortOrder:
        tableData.sortedInfo.columnKey === 'is_manager' &&
        tableData.sortedInfo.order,
      render: isManager => convertBooleanToString(isManager),
    },
    {
      title: t('table_header.action'),
      align: 'center',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
            key={`view-${record.id}`}
            onClick={() => viewDetail(record)}
            style={{ marginRight: 8 }}
            icon={<EyeOutlined />}
          />
          <Button
            key={`edit-${record.id}`}
            onClick={() => edit(record.id)}
            style={{ marginRight: 8 }}
            icon={<EditOutlined />}
          />
          {/* <DeleteEmployee key={`delete-${record.id}`}
            onClick={() => deleteRecord(record.id)}
            style={{ marginRight: 8 }}
            employeeId={record.id}
            icon={<DeleteOutlined />} /> */}

          {/* <DeleteEmployee
            key={`delete-${record.id}`}
            onClick={() => deleteRecord(record.id)}
            style={{ marginRight: 8 }}
            icon={<DeleteOutlined />}
            employeeId={record.id}
          /> */}
        </>
      ),
    },
  ]

  return (
    <div className="employeeLayout">
      <Button
        type="primary"
        onClick={() => navigate('/admin/employees/create')}
        style={{ marginBottom: 16 }}
      >
        {t('button_input.create')}
      </Button>

      <CustomSearch handleChange={handleChange} />

      <div
        style={{
          overflow: 'auto',
          width: '100%',
          whiteSpace: 'nowrap',
          backgroundColor: 'white',
        }}
      >
        <CustomTable
          columns={columns}
          data={data?.data}
          handleTableChange={handleTableChange}
          edit={edit}
          viewDetail={viewDetail}
          deleteRecord={deleteRecord}
          pagination={{
            ...tableData.pagination,
            showSizeChanger: true,
            onShowSizeChange: handleItemsPerPageChange,
            pageSizeOptions: itemsPerPageOptions.map(option =>
              option.toString()
            ),
            onChange: handlePaginationChange,
          }}
          locale={locale}
          loading={isLoading}
        ></CustomTable>
      </div>
    </div>
  )
}

export default EmployeeList
