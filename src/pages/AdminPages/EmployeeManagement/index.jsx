/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from 'react'
import { Button, Select, Spin, message } from 'antd'
import EmployeeTable from '@components/EmployeeComponent/EmployeeTable'
import EmployeeModal from '@components/EmployeeComponent/EmployeeModal'
import EmployeeSearch from '@components/EmployeeComponent/EmployeeSearch'
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import './employeeStyle.css'
import { useNavigate } from 'react-router'

const EmployeeManagement = () => {
  const navigate = useNavigate()
  const [gridData, setGridData] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [sortedInfo, setSortedInfo] = useState({})
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 14,
  })
  const [isModalVisible, setIsModalVisible] = useState(false)
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

  useEffect(() => {
    if (!isModalVisible && formRef.current) {
      formRef.current.resetFields()
    }
  }, [isModalVisible])

  const save = async key => {
    try {
      // Handle the logic to update data if needed
      setEditRowKey('')
    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu:', error)
    }
  }

  const edit = id => {
    navigate('/employe/edit/' + id)
  }

  const viewDetail = id => {
    // Handle logic to view details for the selected record
    navigate('/employe/' + id)
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
    message.success(
      `${record.status === 'active' ? 'Deactivated' : 'Activated'} successfully`
    )
  }

  const handleChange = e => {
    const value = e.target.value
    setSearchText(value)
    setPagination({ ...pagination, current: 1 })
  }

  const handleTableChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter)
    setPagination({ ...pagination })
  }

  const itemsPerPageOptions = [5, 10, 20]
  const handleItemsPerPageChange = pageSize => {
    setPagination({ ...pagination, pageSize, current: 1 })
  }

  const convertBooleanToString = isManager => (isManager ? 'true' : 'false')

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
      title: 'Name',
      align: 'center',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    },
    {
      title: 'Status',
      align: 'center',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
      render: (_, record) => (
        <Button
          type={record.status === 'active' ? 'primary' : 'danger'}
          onClick={() => toggleStatus(record)}
        >
          {record.status === 'active' ? 'Active' : 'Inactive'}
        </Button>
      ),
    },
    {
      title: 'Position',
      align: 'center',
      dataIndex: 'position',
      key: 'position',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'position' && sortedInfo.order,
    },
    {
      title: 'Is Manager',
      align: 'center',
      dataIndex: 'is_manager',
      key: 'is_manager',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'is_manager' && sortedInfo.order,
      render: isManager => convertBooleanToString(isManager),
    },
    {
      title: 'Action',
      align: 'center',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
            key={`view-${record.id}`}
            onClick={() => viewDetail(record.id)}
            style={{ marginRight: 8 }}
            icon={<EyeOutlined />}
          />
          <Button
            key={`edit-${record.id}`}
            onClick={() => edit(record.id)}
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
          onClick={() => setIsModalVisible(true)}
          style={{ marginBottom: 16 }}
        >
          Create
        </Button>

        <EmployeeSearch handleChange={handleChange} />

        <div style={{ overflow: 'auto', width: '100%', background: 'white' }}>
          <EmployeeTable
            columns={columns}
            data={gridData}
            handleTableChange={handleTableChange}
            edit={edit}
            viewDetail={viewDetail}
            deleteRecord={deleteRecord}
            pagination={pagination} // Ensure that you pass the pagination prop
          ></EmployeeTable>
        </div>
        <div style={{ marginBottom: 16, float: 'right' }}>
          Items per page:{' '}
          <Select
            defaultValue={pagination.pageSize}
            onChange={handleItemsPerPageChange}
          >
            {itemsPerPageOptions.map(option => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </div>

        <EmployeeModal
          isModalVisible={isModalVisible}
          save={save}
          formRef={formRef}
        />
      </Spin>
    </div>
  )
}

export default EmployeeManagement
