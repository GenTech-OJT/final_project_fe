/* eslint-disable react/prop-types */
import {
  IdcardOutlined,
  ProjectOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Card, Space, Statistic } from 'antd'
import Typography from 'antd/es/typography/Typography'
import ChartLine from './Chart/LineChart'
import ChartPie from './Chart/PieChart'
import './index.css'

const Dashboard = () => {
  return (
    <div>
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <div className="dashboard-cards">
        <Space direction="horizontal">
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  borderRadius: 20,
                  fontSize: 30,
                  padding: 10,
                  width: '100%',
                }}
              />
            }
            title={'Users'}
            value={100}
          />
          <DashboardCard
            icon={
              <ProjectOutlined
                style={{
                  borderRadius: 20,
                  fontSize: 30,
                  padding: 10,
                  width: '100%',
                }}
              />
            }
            title={'Project'}
            value={101}
          />
          <DashboardCard
            icon={
              <IdcardOutlined
                style={{
                  borderRadius: 20,
                  fontSize: 30,
                  padding: 10,
                  width: '100%',
                }}
              />
            }
            title={'Position'}
            value={102}
          />
          <DashboardCard
            icon={
              <ToolOutlined
                style={{
                  borderRadius: 20,
                  fontSize: 30,
                  padding: 10,
                  width: '100%',
                }}
              />
            }
            title={'Skills'}
            value={103}
          />
        </Space>
      </div>
      <div className="container">
        <div className="chart-container">
          <ChartPie />
        </div>
        <div className="chart-container-2">
          <ChartLine />
        </div>
      </div>
    </div>
  )
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  )
}

export default Dashboard
