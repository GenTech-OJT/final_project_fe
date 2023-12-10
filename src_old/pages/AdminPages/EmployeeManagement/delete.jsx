import React, { useState } from 'react'
import { Button, Modal, message } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

const DeleteEmployee = ({ employeeId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { t } = useTranslation('translation')

  const handleDelete = async () => {
    try {
      await fetch(
        `https://final-project-be.onrender.com/employees/${employeeId}`,
        {
          method: 'DELETE',
        }
      )

      message.success('Employee deleted successfully!')
      setIsModalVisible(false)
    } catch (error) {
      console.error('Error deleting employee:', error)
      message.error('Error deleting employee. Please try again.')
      setIsModalVisible(false)
    }
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    handleDelete()
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <Button icon={<DeleteOutlined />} onClick={showModal}></Button>
      <Modal
        title={t('message.delete_confirm')}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      ></Modal>
    </>
  )
}

export default DeleteEmployee
