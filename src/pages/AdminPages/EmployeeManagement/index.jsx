/* eslint-disable no-undef */
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import {
  CustomSearch,
  CustomTable,
} from '@components/CustomComponent/CustomTable'
import './index.css'
import { showToast } from '@components/Toast/toast'

const EmployeeManagement = () => {
  const [gridData, setGridData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [sortedInfo, setSortedInfo] = useState({})
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 14,
  })

  const navigate = useNavigate()
  const { t } = useTranslation('translation')

  const [loadingData, setLoadingData] = useState(true)

  const formRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/employees?_page=${pagination.current}&_limit=${
            pagination.pageSize
          }&_sort=${sortedInfo.columnKey || 'id'}&_order=${
            sortedInfo.order || 'asc'
          }&q=${searchText}`
        )

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const apiData = await response.json()
        console.log(apiData)
        setGridData(apiData.data)
        setPagination({
          ...pagination,
          total: apiData.pagination.total,
        })
      } catch (error) {
        console.error('Lỗi khi gọi API:', error)
      } finally {
        setLoadingData(false)
      }
    }

    fetchData()
  }, [pagination.current, pagination.pageSize, sortedInfo, searchText])

  const edit = record => {
    formRef.current.setFieldsValue({ ...record })
    setEditRowKey(record.id)
  }

  const viewDetail = record => {
    // Handle logic to view details for the selected record
    console.log('View Detail:', record)
  }

  const deleteRecord = recordId => {
    // Handle logic to delete the selected record
    console.log('Delete Record:', recordId)
  }

  const toggleStatus = record => {
    // Handle logic to toggle status
    const updatedGridData = gridData.map(item => {
      if (item.id === record.id) {
        return {
          ...item,
          status: item.status === 'active' ? 'inactive' : 'active',
        }
      }
      return item
    })
    setGridData(updatedGridData)
    record.status === 'active'
      ? showToast(t('deactivated_successfully'), 'success')
      : showToast(t('activated_successfully'), 'success')
  }

  const handleChange = e => {
    const value = e.target.value
    setSearchText(value)
    setPagination({ ...pagination, current: 1 })
  }

  const handleTableChange = (pagination, filters, sorter) => {
    const isSameColumn = sortedInfo.columnKey === sorter.columnKey
    const order = isSameColumn && sortedInfo.order === 'asc' ? 'desc' : 'asc'

    setSortedInfo({
      columnKey: sorter.columnKey,
      order: order,
    })

    setPagination({
      ...pagination,
      current: isSameColumn ? pagination.current : 1,
    })
  }

  const handlePaginationChange = (current, pageSize) => {
    setPagination({ ...pagination, current, pageSize })
  }

  const itemsPerPageOptions = [5, 10, 20]
  const handleItemsPerPageChange = pageSize => {
    setPagination({ ...pagination, pageSize, current: 1 })
  }

  const convertBooleanToString = isManager => (isManager ? 'Yes' : 'No')

  const columns = [
    {
      title: 'ID',
      align: 'center',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
    },
    {
      title: t('name'),
      align: 'center',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    },
    {
      title: t('status'),
      align: 'center',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
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
          {record.status === 'active' ? t('active') : t('inactive')}
        </Button>
      ),
    },
    {
      title: t('position'),
      align: 'center',
      dataIndex: 'position',
      key: 'position',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'position' && sortedInfo.order,
    },
    {
      title: t('is_manager'),
      align: 'center',
      dataIndex: 'is_manager',
      key: 'is_manager',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'is_manager' && sortedInfo.order,
      render: isManager => convertBooleanToString(isManager),
    },
    {
      title: t('action'),
      align: 'center',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
            key={`view-${record.id}`}
            onClick={() => navigate('/employees/detail')}
            style={{ marginRight: 8 }}
            icon={<EyeOutlined />}
          />
          <Button
            key={`edit-${record.id}`}
            onClick={() => navigate('/employees/edit')}
            style={{ marginRight: 8 }}
            icon={<EditOutlined />}
          />
          <Button
            key={`delete-${record.id}`}
            onClick={() => deleteRecord(record.id)}
            icon={<DeleteOutlined />}
          />
        </>
      ),
    },
  ]

  return (
    <div className="employeeLayout">
      <Spin spinning={loadingData}>
        <Button
          type="primary"
          onClick={() => navigate('/employees/create')}
          style={{ marginBottom: 16 }}
        >
          {t('create')}
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
            data={gridData}
            handleTableChange={handleTableChange}
            edit={edit}
            viewDetail={viewDetail}
            deleteRecord={deleteRecord}
            pagination={{
              ...pagination,
              showSizeChanger: true,
              onShowSizeChange: handleItemsPerPageChange,
              pageSizeOptions: itemsPerPageOptions.map(option =>
                option.toString()
              ),
              onChange: handlePaginationChange,
            }}
          ></CustomTable>
        </div>
      </Spin>
    </div>
  )
}

export default EmployeeManagement
