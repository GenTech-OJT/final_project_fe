/* eslint-disable no-undef */
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import {
  CustomSearch,
  CustomTable,
} from '@components/CustomComponent/CustomTable'
import { showToast } from '@components/Toast/toast'
import { Button, Empty, Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import {
  fetchEmployees,
  fetchEmployeesStart,
} from '../../../redux/slides/employeeSlice'
import './index.css'

const EmployeeManagement = () => {
  const [searchText, setSearchText] = useState('')
  const [sortedInfo, setSortedInfo] = useState({})
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 14,
  })

  const navigate = useNavigate()
  const { t } = useTranslation('translation')
  const dispatch = useDispatch()
  const { employees, loading } = useSelector(state => state.employee)
  const formRef = useRef(null)

  const locale = {
    emptyText: (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('no_data')} />
    ),
  }

  useEffect(() => {
    dispatch(fetchEmployeesStart())

    const fetchData = async () => {
      try {
        const response = await dispatch(
          fetchEmployees({
            page: pagination.current,
            limit: pagination.pageSize,
            sort: sortedInfo.columnKey || 'id',
            order: sortedInfo.order || 'asc',
            query: searchText,
          })
        )

        // Không cần phải setPagination ở đây
      } catch (error) {
        console.error('Error calling API:', error)
        // Không cần phải dispatch(fetchEmployeesFailure(error.message)) ở đây
      }
    }

    fetchData()
  }, [
    dispatch,
    pagination.current,
    pagination.pageSize,
    sortedInfo,
    searchText,
  ])

  const edit = record => {
    formRef.current.setFieldsValue({ ...record })
  }

  const viewDetail = record => {
    console.log('View Detail:', record)
  }

  const deleteRecord = recordId => {
    console.log('Delete Record:', recordId)
  }

  const toggleStatus = async record => {
    try {
      // Dispatch action to update status in the database
      const response = await fetch(
        `http://localhost:3000/employees/${record.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: record.status === 'active' ? 'inactive' : 'active',
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      // Dispatch action to update status in Redux store
      const updatedEmployees = employees.map(item => {
        if (item.id === record.id) {
          return {
            ...item,
            status: record.status === 'active' ? 'inactive' : 'active',
          }
        }
        return item
      })
      dispatch({
        type: 'employee/fetchEmployeesSuccess',
        payload: { data: updatedEmployees },
      })

      // Show success toast
      record.status === 'active'
        ? showToast(t('deactivated_successfully'), 'success')
        : showToast(t('activated_successfully'), 'success')
    } catch (error) {
      console.error('Error updating status:', error)
      // Show error toast
      showToast(t('status_update_failed'), 'error')
    }
  }

  const handleChange = e => {
    const value = e.target.value
    setSearchText(value)
    setPagination({ ...pagination, current: 1 })
  }

  const handleTableChange = (pagination, sorter) => {
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
            onClick={() => viewDetail(record)}
            style={{ marginRight: 8 }}
            icon={<EyeOutlined />}
          />
          <Button
            key={`edit-${record.id}`}
            onClick={() => edit(record)}
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
      <Spin spinning={loading}>
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
            data={employees}
            handleTableChange={handleTableChange}
            pagination={{
              ...pagination,
              showSizeChanger: true,
              onShowSizeChange: handleItemsPerPageChange,
              pageSizeOptions: itemsPerPageOptions.map(option =>
                option.toString()
              ),
              onChange: handlePaginationChange,
            }}
            locale={locale}
          ></CustomTable>
        </div>
      </Spin>
    </div>
  )
}

export default EmployeeManagement
