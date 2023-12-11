import React, { useState } from 'react'
import { Button, Modal, message } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

const DeleteEmployee = ({ employeeId, onDeleteSuccess }) => {
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
      onDeleteSuccess()
    } catch (error) {
      console.error('Error deleting employee:', error)
      message.error('Error deleting employee. Please try again.')
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
      <Button type="danger" icon={<DeleteOutlined />} onClick={showModal}>
        {t('Delete')}
      </Button>
      <Modal
        title={t('delete_confirm')}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>{t('delete_confirm')}</p>
      </Modal>
    </>
  )
}
DeleteEmployee.propTypes = {
  employeeId: PropTypes.string.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
}

export default DeleteEmployee
