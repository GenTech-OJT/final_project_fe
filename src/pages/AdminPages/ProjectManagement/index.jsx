import { Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import Spinner from '../../../components/AdminComponent/Spinner/Spinner'

const ProjectManagement = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1200)) // Simulating a 2-second delay
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Typography.Text>Project Management</Typography.Text>
      )}
    </>
  )
}

export default ProjectManagement
