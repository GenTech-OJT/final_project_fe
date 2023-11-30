import React, { useState, useEffect, useRef } from 'react'
import {
  Table,
  Space,
  Input,
  Typography,
  Popconfirm,
  Button,
  Modal,
  Form,
  message,
} from 'antd'
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SaveOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import './employeeStyle.css'

const { Search } = Input
const { Text } = Typography

const EmployeeManagement = () => {
  const [gridData, setGridData] = useState([
    {
      id: 1,
      name: 'John Doe',
      status: 'active',
      position: 'CEO',
      isManage: 'Yes',
    },
    {
      id: 2,
      name: 'Adu a Seng',
      status: 'active',
      position: 'CEO',
      isManage: 'No',
    },
    // Add more data if needed
  ])

  const [searchText, setSearchText] = useState('')
  const [sortedInfo, setSortedInfo] = useState({})
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  })

  const [editRowKey, setEditRowKey] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const formRef = useRef(null)

  useEffect(() => {
    if (!isModalVisible && formRef.current) {
      formRef.current.resetFields()
    }
  }, [isModalVisible])

  const handleDelete = record => {
    const updatedData = gridData.filter(item => item.id !== record.id)
    setGridData(updatedData)
  }

  const isEditing = record => record.id === editRowKey

  const save = async key => {
    try {
      const row = await formRef.current.validateFields()
      const newData = gridData.map(item =>
        item.id === key ? { ...item, ...row } : item
      )
      setGridData(newData)
      setEditRowKey('')
    } catch (error) {
      console.log('Lỗi:', error)
    }
  }

  const edit = record => {
    formRef.current.setFieldsValue({
      name: '',
      email: '',
      age: '',
      message: '',
      ...record,
    })
    setEditRowKey(record.id)
  }

  const cancel = () => setEditRowKey('')

  const handleChange = e => {
    const value = e.target.value
    setSearchText(value)
    setPagination({
      ...pagination,
      current: 1,
    })
  }

  const handleTableChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter)
    setPagination({
      ...pagination,
      current: pagination.current,
    })
  }

  const handleStatusToggle = record => {
    const updatedData = gridData.map(item =>
      item.id === record.id
        ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' }
        : item
    )
    setGridData(updatedData)
  }

  const columns = [
    {
      title: 'ID',
      align: 'center',
      dataIndex: 'id',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
    },
    {
      title: 'Name',
      align: 'center',
      dataIndex: 'name',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
      align: 'center',
      render: (text, record) => (
        <Button type="primary" onClick={() => handleStatusToggle(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Position',
      align: 'center',
      dataIndex: 'position',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'position' && sortedInfo.order,
    },
    {
      title: 'Is Manage',
      align: 'center',
      dataIndex: 'isManage',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'isManage' && sortedInfo.order,
    },
    {
      title: 'Action',
      align: 'center',
      dataIndex: 'action',
      render: (_, record) => {
        const editable = isEditing(record)
        return (
          <Space>
            <EyeOutlined
              onClick={() => viewDetails(record)}
              style={{ color: 'blue', cursor: 'pointer' }}
            />
            <EditOutlined
              onClick={() => edit(record)}
              style={{ color: 'green', cursor: 'pointer' }}
            />
            <DeleteOutlined
              onClick={() => handleDelete(record)}
              style={{ color: 'red', cursor: 'pointer' }}
            />
          </Space>
        )
      },
    },
  ]

  // Lọc dữ liệu theo tên
  const filteredData = gridData.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  )

  // Áp dụng sắp xếp cho dữ liệu đã lọc
  const sortedData = filteredData.slice().sort((a, b) => {
    const sortOrder = sortedInfo.order === 'descend' ? -1 : 1
    const sortKey = sortedInfo.columnKey || 'id'

    const canLocaleCompare =
      a[sortKey] && b[sortKey] && typeof a[sortKey].localeCompare === 'function'

    return canLocaleCompare
      ? a[sortKey].localeCompare(b[sortKey]) * sortOrder
      : (a[sortKey] - b[sortKey]) * sortOrder
  })

  // Áp dụng phân trang cho dữ liệu đã lọc và sắp xếp
  const start = (pagination.current - 1) * pagination.pageSize
  const end = start + pagination.pageSize
  const paginatedData = sortedData.slice(start, end)

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  return (
    <div className="employeeLayout">
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Create User
      </Button>
      <Search
        placeholder="Tìm kiếm theo tên"
        onChange={handleChange}
        style={{ width: 200, marginBottom: 16 }}
        prefix={<SearchOutlined />}
      />
      <Table
        columns={columns}
        dataSource={paginatedData.map(item => ({ ...item, key: item.id }))}
        bordered
        onChange={handleTableChange}
        pagination={pagination}
      />
      <Modal
        title="Create User"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form ref={formRef}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input name!' }]}
          >
            <Input />
          </Form.Item>
          {/* Add more form fields as needed */}
        </Form>
      </Modal>
    </div>
  )
}

export default EmployeeManagement
