/* eslint-disable no-undef */
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { CustomSearch, CustomTable } from '@components/custom/CustomTable'
import { showToast } from '@components/toast/ToastCustom'
import { useUpdateEmployee } from '@hooks/useEmployee'
import { Avatar, Button, Empty, Tooltip } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import Breadcrumb from '../../../components/admin/Breadcrumb/Breadcrumb'
import '../../../components/custom/CustomTable.css'
import { useGetProjects } from '@hooks/useProject'

const ProjectList = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('translation')

  const breadcrumbItems = [
    {
      key: 'dashboard',
      title: t('breadcrumbs.dashboard'),
      route: '/admin/dashboard',
    },
    {
      key: 'projects',
      title: t('breadcrumbs.projects'),
      route: '/admin/projects',
    },
  ]
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 })
  const [sort, setSort] = useState({ sortColumn: 'id', sortOrder: 'asc' })
  const [searchText, setSearchText] = useState('')

  const { data, isLoading } = useGetProjects({
    ...pagination,
    ...sort,
    searchText,
  })

  const edit = id => {
    navigate('/admin/employees/edit/' + id)
  }

  const viewDetail = record => {
    navigate(`/admin/employees/detail/${record.id}`)
  }

  const deleteRecord = recordId => {
    // Handle logic to delete the selected record
  }

  const updateEmployeeMutation = useUpdateEmployee(({ id, data }) =>
    updateEmployeeApi(id, data)
  )

  const toggleStatus = async (id, status) => {
    try {
      const response = await updateEmployeeMutation.mutateAsync({
        id,
        data: { status: status === 'active' ? 'inactive' : 'active' },
      })

      if (response) {
        const updatedEmployee = response

        const successMessage =
          updatedEmployee.status === 'active'
            ? t('message.activated_successfully')
            : t('message.deactivated_successfully')

        showToast(successMessage, 'success')
      } else {
        showToast(t('status_update_failed'), 'error')
      }
    } catch (error) {
      showToast(t('status_update_failed'), 'error')
    }
  }

  const handleChange = e => {
    const value = e.target.value
    setSearchText(value)
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
    setPagination({
      ...pagination,
      page: pagination.current,
      pageSize: pagination.pageSize,
    })
    if (sorter.order) {
      setSort({
        sortColumn: sorter.field,
        sortOrder: sorter.order === 'ascend' ? 'asc' : 'desc',
      })
    }
  }

  const columns = [
    {
      title: 'P-ID',
      align: 'center',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
    },
    {
      title: t('project_details.project_name'),
      align: 'center',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: t('project_details.manager_name'),
      align: 'center',
      dataIndex: 'manager',
      key: 'manager',
      sorter: true,
    },

    {
      title: t('project_details.start_date'),
      align: 'center',
      dataIndex: 'start_date',
      key: 'start_date',
      sorter: true,
    },
    {
      title: t('project_details.team_member'),
      dataIndex: 'employees',
      key: 'employees',
      render: employees => (
        <Avatar.Group maxCount={2} size="small">
          {employees.map(employee => (
            <Tooltip title={employee.name} key={employee.id}>
              <Avatar src={employee.avatar} />
            </Tooltip>
          ))}
        </Avatar.Group>
      ),
    },
    {
      title: t('project_details.end_date'),
      align: 'center',
      dataIndex: 'end_date',
      key: 'end_date',
      sorter: true,
    },
    {
      title: t('project_details.status'),
      align: 'center',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      render: (_, record) => (
        <Button
          type={record.status === 'active' ? 'primary' : 'danger'}
          onClick={() => {
            toggleStatus(record.id, record.status)
          }}
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
      title: t('project_details.action'),
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
    <div className="projectLayout">
      <Breadcrumb items={breadcrumbItems} />
      <br />
      <Button
        type="primary"
        // onClick={() => navigate('/admin/employees/create')}
        style={{ marginBottom: 16, float: 'right' }}
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
            total: data?.pagination.total,
            current: pagination.page,
            pageSize: pagination.pageSize,
          }}
          locale={locale}
          loading={isLoading}
        />
      </div>
    </div>
  )
}

export default ProjectList
