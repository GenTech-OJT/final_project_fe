import { SearchOutlined } from '@ant-design/icons'
import { Input, Select, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../AdminComponent.css'

const AppHeader = () => {
  const { t, i18n } = useTranslation('translation')
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem('selectedLanguage') || 'eng'
  )

  const changeLanguage = value => {
    setSelectedLanguage(value)
    i18n.changeLanguage(value)
    // Save selected language to localStorage
    localStorage.setItem('selectedLanguage', value)
  }

  // Update language
  useEffect(() => {
    i18n.changeLanguage(selectedLanguage)
  }, [selectedLanguage, i18n])

  return (
    <div className="AppHeader">
      <SearchOutlined className="search-header" />
      <Input
        placeholder="Basic usage"
        bordered={false}
        className="header-input"
      />
      <Space
        wrap
        style={{
          height: '100vh',
        }}
      >
        <Select
          value={selectedLanguage}
          style={{
            width: 120,
          }}
          onChange={changeLanguage}
          options={[
            {
              value: 'eng',
              label: t('English'),
            },
            {
              value: 'vi',
              label: t('Vietnamese'),
            },
          ]}
        />
      </Space>
    </div>
  )
}

export default AppHeader
