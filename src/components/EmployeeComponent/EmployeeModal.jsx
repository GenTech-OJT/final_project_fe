import React from 'react'
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

export default EmployeeModal
