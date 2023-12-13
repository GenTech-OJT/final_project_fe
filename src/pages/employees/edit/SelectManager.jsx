import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Select } from 'antd'
import { useGetEmployees } from '@hooks/useEmployee'

const SelectManager = () => {
  const { data } = useGetEmployees({
    pageSize: undefined,
    sortColumn: 'id',
    sortOrder: 'asc',
  })
  const [managers, setManagers] = useState([])
  const [selectedManager, setSelectedManager] = useState('')
  const { t } = useTranslation('translation')

  useEffect(() => {
    if (data) {
      const managerNames = data.data.map(m => m.name)
      setManagers(managerNames)
    }
  }, [data])

  const handleManagerChange = value => {
    setSelectedManager(value)
  }

  return (
    <Form.Item
      label={
        <span style={{ fontWeight: 'bold' }}>{t('employee.manager')}</span>
      }
      name="manager"
      className="select-width-dobgs"
      rules={[
        {
          required: true,
          message: 'Please select the employee manager !',
        },
      ]}
    >
      <Select value={selectedManager} onChange={handleManagerChange}>
        {managers.map(m => (
          <Select.Option key={m} value={m}>
            {m}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  )
}

export default SelectManager
