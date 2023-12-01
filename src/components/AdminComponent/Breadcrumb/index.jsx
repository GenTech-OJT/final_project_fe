import { Breadcrumb } from 'antd'
import { Link, useLocation } from 'react-router-dom'

const customBreadcrumbNames = {
  projects: 'Projects',
  projectdetail: 'Project Detail',
  users: 'Users',
  userdetail: 'User Detail',
  profile: 'Profile',
  login: 'Login',
}

const BreadCrumb = () => {
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
    <Breadcrumb style={{ margin: '16px' }}>
      {pathSnippets.map((snippet, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
        const displayText = customBreadcrumbNames[snippet] || snippet // Use the snippet directly

        return (
          <Breadcrumb.Item key={url}>
            <Link to={url}>{displayText}</Link>
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}

export default BreadCrumb
