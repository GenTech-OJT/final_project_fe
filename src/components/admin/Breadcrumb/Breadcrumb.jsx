import { Breadcrumb as BreadcrumbAntd } from 'antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const { Item } = BreadcrumbAntd

const Breadcrumb = ({ items }) => {
  return (
    <BreadcrumbAntd style={{ paddingBottom: 10 }}>
      {items?.map(({ id, route, title }) => (
        <Item key={id}>
          <Link to={route ?? `/${id}`}>{title}</Link>
        </Item>
      ))}
    </BreadcrumbAntd>
  )
}

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      route: PropTypes.string,
      title: PropTypes.string.isRequired,
    })
  ),
}

export default Breadcrumb
