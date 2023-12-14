import { Breadcrumb as BreadcrumbAntd } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const { Item } = BreadcrumbAntd

const Breadcrumb = ({ items }) => {
  const { t } = useTranslation()
  return (
    <BreadcrumbAntd style={{ paddingBottom: 10 }}>
      {items?.map(({ key, route, title }, index) => (
        <Item key={index}>
          <Link to={route ?? `/${key}`}>{title}</Link>
        </Item>
      ))}
    </BreadcrumbAntd>
  )
}

export default Breadcrumb
