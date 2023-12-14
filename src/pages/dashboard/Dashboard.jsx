import {
  ProjectOutlined,
  TeamOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Card, Col, Flex, Row, Statistic } from 'antd'
import './Dashboard.css'
import { ChartPie, ChartBar } from './Chart/Chart'
const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard Page</h2>
      <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Flex justify="space-between">
              <Statistic
                title="Employees"
                value={100}
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
                title="Projects"
                value={100}
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
                title="Skills"
                value={100}
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
                title="Positions"
                value={100}
                className="custom-statistic"
              ></Statistic>
              <TeamOutlined className="custom-icon" />
            </Flex>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={12}>
          <ChartPie />
        </Col>
        <Col xs={24} sm={12} md={12}>
          <ChartBar />
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
