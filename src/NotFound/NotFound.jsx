import { Button } from 'antd'
import '../NotFound/NotFound.css'

const NotFound = () => {
  return (
    <div className="background">
      <div className="content">
        <h1 className="content-h1">404 Not Found</h1>
        <p className="content-p">
          Sorry, the page you are looking for does not exist.
        </p>
        {/* <button className="back-to-home-btn">
          Back to home
        </button> */}
        <Button type="primary" className="back-to-home-btn">
          Back to home
        </Button>
      </div>
    </div>
  )
}

export default NotFound
