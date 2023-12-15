import {
  ProjectOutlined,
  TeamOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Card, Col, Flex, Row, Statistic } from 'antd'
import { useTranslation } from 'react-i18next'
import BreadCrumb from '../../components/admin/Breadcrumb/Breadcrumb'
import { useGetDashboard } from '../../hooks/useDashboard'
import { ChartBar, ChartPie } from './Chart/Chart'
import './Dashboard.css'

const Dashboard = () => {
  const { data, isLoading } = useGetDashboard()

  const { t } = useTranslation('translation')

  const breadcrumbItems = [
    {
      key: 'dashboard',
      title: t('breadcrumbs.dashboard'),
      route: '/admin/dashboard',
    },
  ]

  if (isLoading) {
    return <div>...</div>
  }

  return (
    <div className="dashboard">
      <BreadCrumb items={breadcrumbItems} />
      <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Flex justify="space-between">
              <Statistic
                title={t('dashboard_page.employees')}
                value={data?.employeeCount}
                className="custom-statistic"
              ></Statistic>
              <UserOutlined className="custom-icon" />
            </Flex>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Flex justify="space-between">
              <Statistic
                title={t('dashboard_page.project')}
                value={data?.projectCount}
                className="custom-statistic"
              ></Statistic>
              <ProjectOutlined className="custom-icon" />
            </Flex>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Flex justify="space-between">
              <Statistic
                title={t('dashboard_page.skills')}
                value={data?.skillsArray.length}
                className="custom-statistic"
              ></Statistic>
              <ToolOutlined className="custom-icon" />
            </Flex>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Flex justify="space-between">
              <Statistic
                title={t('dashboard_page.position')}
                value={data?.positionCount}
                className="custom-statistic"
              ></Statistic>
              <TeamOutlined className="custom-icon" />
            </Flex>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={12}>
          <ChartPie data={data?.skillsArray} />
        </Col>
        <Col xs={24} sm={12} md={12}>
          <ChartBar />
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
