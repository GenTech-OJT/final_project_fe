import React from 'react'
import '../AdminComponent.css'
import AppRoutes from '@routes/index'
import { Card } from 'antd'
const PageContent = () => {
  return (
    <div className="PageContent">
      <Card>
        <AppRoutes />
      </Card>
    </div>
  )
}

export default PageContent
