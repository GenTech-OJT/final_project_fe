import { Modal, Button } from 'antd'
import { navigate } from '@reach/router'
import { useTranslation } from 'react-i18next'
const Logout = () => {
  const { t } = useTranslation('translation')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    setIsModalVisible(false)
    // Perform logout logic
    localStorage.clear()
    navigate('/admin/login')
    window.location.reload()
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {t('Profile_admin.Logout')}
      </Button>
      <Modal
        title={t('message.logout_confirm')}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </>
  )
}

export default Logout