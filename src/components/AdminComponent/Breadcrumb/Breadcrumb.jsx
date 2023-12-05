import { Breadcrumb } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

const BreadCrumb = () => {
  const { t } = useTranslation('translation')

  const customBreadcrumbNames = {
    projects: t('projects_breadcrumb'),
    employees: t('employees_breadcrumb'),
    detail: t('detail_breadcrumb'),
    create: t('create_breadcrumb'),
    edit: t('edit_breadcrumb'),
  }

  const location = useLocation()
  const pathSnippets = location.pathname.split('/').filter(i => i)

  // Kiểm tra xem path có trùng với route không
  const isPathMatched =
    pathSnippets.length > 0 &&
    pathSnippets.every(snippet => customBreadcrumbNames[snippet])

  if (!isPathMatched) {
    return null // Nếu không trùng, không hiển thị breadcrumb
  }

  return (
    <Breadcrumb style={{ margin: '20px', fontWeight: '500', color: '#123ec7' }}>
      {pathSnippets.map((snippet, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
        const displayText = customBreadcrumbNames[snippet] || snippet

        // Kiểm tra xem đó có phải là mục breadcrumb cuối cùng không
        const isLastItem = index === pathSnippets.length - 1

        return (
          <Breadcrumb.Item key={url}>
            {isLastItem ? (
              <span>{displayText}</span>
            ) : (
              <Link to={url}>{displayText}</Link>
            )}
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}

export default BreadCrumb
