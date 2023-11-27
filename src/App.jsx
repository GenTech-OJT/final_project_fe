import { Select, Space } from 'antd'
import i18n from 'i18next'
import { useTranslation } from 'react-i18next'
import './App.css'

function App() {
  const { t } = useTranslation('translation')
  const changeLanguage = e => {
    const languageValue = e.target.value
    i18n.changeLanguage(languageValue)
    console.log(`selected ${e}`)
  }

  return (
    <Space wrap>
      <h1>{t('title')}</h1>
      {/* <select onChange={changeLanguage}>
        <option className="flag en" value="eng">
          {t('English')}
        </option>
        <option className="flag vi" value="vi">
          {t('Vietnamese')}
        </option>
      </select> */}
      <Select
        defaultValue="eng"
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
