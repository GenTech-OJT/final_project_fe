import React from 'react'
import { Tabs, Badge, Descriptions, Spin } from 'antd'
import { useNavigate, useParams } from 'react-router'
import { useGetProjectById } from '@hooks/useProject'
import { useGetEmployeeById } from '@hooks/useEmployee'

const CustomBadge = ({ status, text }) => <Badge status={status} text={text} />

const DetailProject = () => {
  const { id } = useParams()
  const { data: projectDetail, isLoading: loadingProject } =
    useGetProjectById(id)
  const { data: managerDetails, isLoading: loadingManagerDetails } =
    useGetEmployeeById(projectDetail?.manager)
  const { TabPane } = Tabs

  if (loadingProject || loadingManagerDetails) {
    return <Spin spinning={true} fullscreen />
  }

  console.log(projectDetail)
  let badgeStatus
  const status = projectDetail.status
  const technicalNames =
    projectDetail.technical?.map(technical => technical.name) || []

  if (status === 'In Progress') {
    badgeStatus = <CustomBadge status="processing" text="In Progress" />
  } else if (status === 'Pending') {
    badgeStatus = <CustomBadge status="warning" text="Pending" />
  } else if (status === 'Cancelled') {
    badgeStatus = <CustomBadge status="error" text="Cancelled" />
  } else if (status === 'Done') {
    badgeStatus = <CustomBadge status="success" text="Done" />
  }

  const descritptions = [
    {
      key: 'name',
      label: 'Project Name',
      children: projectDetail.name,
    },
    {
      key: 'manager',
      label: 'Manager',
      children: managerDetails.name,
      span: 2,
    },
    {
      key: 'start_date',
      label: 'Start Date',
      children: projectDetail.start_date,
    },
    {
      key: 'end_date',
      label: 'End Date',
      children: projectDetail.end_date,
      span: 2,
    },
    {
      key: 'status',
      label: 'Status',
      children: badgeStatus,
      span: 3,
    },
    {
      key: 'team_members',
      label: 'Team Members',
      children: 'Hoang, Vy',
      span: 2,
    },
    {
      key: 'technicals',
      label: 'Technicals',
      children: <>{technicalNames.join(', ')}</>,
    },
    {
      key: 'descriptions',
      label: 'Descriptions',
      children: projectDetail.description,
    },
  ]

  const tabs = [
    {
      key: 'Details',
      label: 'Details',
      content: (
        <Descriptions
          title="Project Details"
          layout="vertical"
          bordered
          items={descritptions}
        />
      ),
    },
    {
      key: 'TimeLine',
      label: 'TimeLine',
      content: <div>Content of Tab Pane 2</div>,
    },
  ]

  return (
    <Tabs defaultActiveKey="Details">
      {tabs.map(t => (
        <TabPane tab={t.label} key={t.key}>
          {t.content}
        </TabPane>
      ))}
    </Tabs>
  )
}

export default DetailProject
