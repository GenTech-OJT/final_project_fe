import { Flex, Spin } from 'antd'
import './Spinner.css'
import { useTranslation } from 'react-i18next'

const Spinner = () => {
  const { t } = useTranslation('translation')

  return (
    <Flex gap="small" vertical>
      <Spin tip={t('spinners')} size="large">
        <div className="content" />
      </Spin>
    </Flex>
  )
}

export default Spinner
