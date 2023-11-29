import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import './NotFound.css'

const NotFoundPage = () => {
  const { t } = useTranslation('translation')
  const navigate = useNavigate()
  const backToHome = () => {
    navigate('/users')
  }
  return (
    <div className="background">
      <div className="content">
        <h1 className="content-h1">404</h1>
        <p className="content-p">{t('notfound_content')}</p>
        <Button
          type="primary"
          onClick={backToHome}
          className="back-to-home-btn"
        >
          {t('back_to_home')}
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage
