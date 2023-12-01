import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input } from 'antd'

const EmployeeModal = ({ isModalVisible, save, formRef }) => {
  return (
    <Modal
      title="Create"
      open={isModalVisible}
      onOk={save}
      onCancel={() => setIsModalVisible(false)}
    >
      <Form ref={formRef}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

EmployeeModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  save: PropTypes.func.isRequired,
  formRef: PropTypes.object.isRequired,
}

export default EmployeeModal
