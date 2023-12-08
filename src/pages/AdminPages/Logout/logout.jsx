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
        Logout
      </Button>
      <Modal
        title="Are you sure to logout?"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{t('logout_confirm')}</p>
      </Modal>
    </>
  )
}

export default Logout
