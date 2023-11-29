import { Button } from 'antd'
import './NotFound.css'
import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
  const { t } = useTranslation('translation')
  return (
    <div className="background">
      <div className="content">
        <h1 className="content-h1">404</h1>
        <p className="content-p"> {t('lost_in_space')}</p>
        <Button
          type="primary"
          href="../Dashboard/index.jsx"
          className="back-to-home-btn"
        >
          {t('back_to_home')}
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage
