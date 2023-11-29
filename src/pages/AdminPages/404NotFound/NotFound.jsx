import { Button } from 'antd'
import './NotFound.css'

const NotFoundPage = () => {
  return (
    <div className="background">
      <div className="content">
        <h1 className="content-h1">404</h1>
        <p className="content-p">Lost in Space</p>
        <Button type="primary" className="back-to-home-btn">
          Back to home
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage
