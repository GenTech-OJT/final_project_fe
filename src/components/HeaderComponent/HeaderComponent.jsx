import { Col, Row } from 'antd'
import React from 'react'
import './header.css'
import { Input, Space } from 'antd'
import {
  CaretDownOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons'
const { Search } = Input

const HeaderComponent = () => {
  return (
    <div>
      <Row className="header-container">
        <Col span={6}>
          <span className="header-text">LapTrinhThatDe</span>
        </Col>
        <Col span={12}>
          <Search
            placeholder="input search text"
            // onSearch={onSearch}
            enterButton
            allowClear
          />
        </Col>
        <Col span={6} className="header-action">
          <div className="header-account">
            <UserOutlined style={{ fontSize: '30px' }} />
            <div className="header-signIn">
              <span>Đăng nhập/Đăng ký</span>
              <div>
                <span>Tài Khoản</span>
                <CaretDownOutlined />
              </div>
            </div>
          </div>
          <div>
            <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
            <span className="header-text">Giỏ hàng</span>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default HeaderComponent
