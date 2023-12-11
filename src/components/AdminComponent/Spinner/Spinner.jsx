import { Flex, Spin } from 'antd'
import { useTranslation } from 'react-i18next'

const Spinner = () => {
  const { t } = useTranslation('translation')

  return (
    <Flex gap="small" vertical>
      <Spin tip={t('message.spinners')} size="large" fullscreen={true}>
        <div className="content" />
      </Spin>
    </Flex>
  )
}

export default Spinner
