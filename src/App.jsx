import { Select, Space } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function App() {
  const { t, i18n } = useTranslation('translation')
  const [selectedLanguage, setSelectedLanguage] = useState('eng') // State để lưu giá trị ngôn ngữ được chọn

  const changeLanguage = value => {
    setSelectedLanguage(value) // Cập nhật giá trị ngôn ngữ được chọn
    i18n.changeLanguage(value)
    console.log(`Selected ${value}`)
  }

  return (
    <Space
      wrap
      direction="vertical"
      align="center" // Căn giữa theo chiều ngang
      justify="center" // Căn giữa theo chiều dọc
      style={{
        height: '100vh', // Thiết lập chiều cao 100% của viewport
      }}
    >
      <h1>{t('title')}</h1>
      <Select
        value={selectedLanguage} // Sử dụng giá trị state để đồng bộ với giá trị được chọn
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
          {
            value: 'disabled',
            label: 'Disabled',
            disabled: true,
          },
        ]}
      />
    </Space>
  )
}

export default App
