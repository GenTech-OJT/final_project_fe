import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useDeleteProjects } from '@hooks/useProject'
import { showToast } from '@components/toast/ToastCustom'
import PropTypes from 'prop-types'

const DeleteProjects = ({ projectIds }) => {
  const { mutate: deleteProjectApi } = useDeleteProjects()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { t } = useTranslation('translation')

  const handleDelete = async () => {
    try {
      await deleteProjectApi(projectIds, {
        onSuccess: () => {
          showToast(t('message.Projects_deleted_successfully'), 'success')
          setIsModalVisible(false)
        },
        onError: () => {
          showToast(t('message.Projects_deleted_fail'), 'error')
          setIsModalVisible(false)
        },
      })
    } catch (error) {
      showToast(t('message.Projects_deleted_fail'), 'error')
      setIsModalVisible(false)
    }
  }

  const showModal = () => {
    setIsModalVisible(true)
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
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      ></Modal>
    </>
  )
}

DeleteProjects.propTypes = {
  projectIds: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default DeleteProjects
