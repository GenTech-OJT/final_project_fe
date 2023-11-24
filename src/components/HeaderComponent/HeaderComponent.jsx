import { Col, Row } from 'antd'
import React from 'react'
import './header.css'
import { Input, Space } from 'antd'
import {
  CaretDownOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch'
const { Search } = Input

const HeaderComponent = () => {
  return (
    <div>
      <Row className="header-container" gutter={16}>
        <Col span={6}>
          <span className="header-text">LapTrinhThatDe</span>
        </Col>
        <Col span={12}>
          <ButtonInputSearch
            size="large"
            textButton="Tìm kiếm"
            placeholder="input search text"
            // onSearch={onSearch}
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
