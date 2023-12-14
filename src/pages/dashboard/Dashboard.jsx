import { useTranslation } from 'react-i18next'
import Breadcrumb from '../../components/admin/Breadcrumb/Breadcrumb'

const Dashboard = () => {
  const { t } = useTranslation('translation')

  const breadcrumbItems = [
    {
      key: 'dashboard',
      title: t('breadcrumbs.dashboard'),
      route: '/admin/dashboard',
    },
  ]

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <h2>Dashboard Page</h2>
      <p>This is the dashboard content.</p>
    </div>
  )
}

export default Dashboard
