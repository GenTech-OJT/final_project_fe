import Breadcrumb from '@components/admin/Breadcrumb/Breadcrumb'
import { useGetEmployeeById } from '@hooks/useEmployee'
import { useGetProjectById } from '@hooks/useProject'
import {
  Avatar,
  Card,
  Col,
  Descriptions,
  Row,
  Space,
  Spin,
  Tabs,
  Tag,
} from 'antd'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'

const DetailProject = () => {
  const { t } = useTranslation('translation')

  const { id } = useParams()
  const { data: projectDetail, isLoading: loadingProject } =
    useGetProjectById(id)
  const { data: managerDetails, isLoading: loadingManagerDetails } =
    useGetEmployeeById(projectDetail?.manager)
  const { TabPane } = Tabs

  if (loadingProject || loadingManagerDetails) {
    return <Spin spinning={true} fullscreen />
  }

  const joinedEmployees = projectDetail?.employees || []

  console.log(projectDetail)
  let badgeStatus
  const status = projectDetail.status
  const technicalNames =
    projectDetail.technical?.map(technical => technical.name) || []

  if (status === 'In Progress') {
    badgeStatus = (
      <Tag color="processing">{t('project.in_progress_status')}</Tag>
    )
  } else if (status === 'Pending') {
    badgeStatus = <Tag color="warning">{t('project.pending_status')}</Tag>
  } else if (status === 'Cancelled') {
    badgeStatus = <Tag color="error">{t('project.cancelled_status')}</Tag>
  } else if (status === 'Done') {
    badgeStatus = <Tag color="success">{t('project.done_status')}</Tag>
  }

  const getTagColor = index => {
    const colors = [
      '#2a9d8f',
      '#7cb518',
      '#6A8EAE',
      '#944bbb',
      '#219ebc',
      '#e76f51',
      '#f47795',
      '#ff9100',
      '#d90429',
      '#ef7a85',
    ]
    return colors[index % colors.length]
  }

  const technicalTags = technicalNames.map(technicalName => (
    <Tag key={technicalName.id} color={getTagColor(technicalName.id)}>
      {technicalName.name}
    </Tag>
  ))

  const breadcrumbItems = [
    {
      key: 'dashboard',
      title: t('breadcrumbs.dashboard'),
      route: '/admin/dashboard',
    },
    {
      key: 'employees',
      title: t('breadcrumbs.projects'),
      route: '/admin/projects',
    },
    {
      key: 'detail',
      title: t('breadcrumbs.project_details'),
      route: `/admin/projects/detail/${id}`,
    },
  ]

  const descritptions = [
    {
      key: 'name',
      label: t('project.name'),
      children: projectDetail?.name,
    },
    {
      key: 'manager',
      label: t('project.manager'),
      children: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={managerDetails?.avatar} />
          <span style={{ marginLeft: '8px' }}>{managerDetails?.name}</span>
        </div>
      ),
      span: 2,
    },
    {
      key: 'start_date',

      label: t('project.start_date'),
      children: moment(projectDetail?.st_date).format('YYYY-MM-DD'),
    },
    {
      key: 'end_date',
      label: t('project.end_date'),
      children: moment(projectDetail?.end_date).format('YYYY-MM-DD'),
      span: 2,
    },
    {
      key: 'status',
      label: t('project.status'),
      children: badgeStatus,
      span: 2,
    },
    {
      key: 'technicals',
      label: t('project.technicals'),
      children: <Space>{technicalTags}</Space>,
      span: 2,
    },
    {
      key: 'descriptions',
      label: t('project.description'),
      children: projectDetail.description ? (
        projectDetail.description
      ) : (
        <span>{t('employee_details.no_description')}</span>
      ),
    },
  ]

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <Tabs defaultActiveKey="Details">
        <TabPane tab={t('project.detail')} key="Details">
          <Descriptions layout="vertical" bordered items={descritptions} />
        </TabPane>

        {/* Add a TabPane for displaying joined members */}
        <TabPane tab={t('project.member')} key="Members">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={12} xl={12}>
              <Card
                title="Project Manager"
                bordered
                style={{
                  backgroundColor: '#f0f2f5',
                  marginBottom: '30px',
                  border: '1px solid #bfbfbf',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={managerDetails?.avatar} />
                  <div style={{ marginLeft: '8px' }}>
                    {managerDetails?.name}
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={12} xl={12}>
              <Card
                title="Team Members"
                bordered
                style={{
                  backgroundColor: '#f0f2f5',
                  border: '1px solid #bfbfbf',
                }}
              >
                <Space size={16} direction="vertical">
                  {joinedEmployees.map(employee => (
                    <div
                      key={employee.id}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Avatar src={employee?.avatar} />
                      <div style={{ marginLeft: '8px' }}>{employee.name}</div>
                    </div>
                  ))}
                </Space>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab={t('project.timeline')} key="TimeLine"></TabPane>
      </Tabs>
    </>
  )
}

export default DetailProject
