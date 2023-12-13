import axios from '@utils/axios'

import { API_URL } from '@constants/url'

export const getEmployeesApi = async ({
  page,
  pageSize,
  sortColumn,
  sortOrder,
  searchText,
}) => {
  const response = await axios.get(API_URL.EMPLOYEES, {
    params: {
      _page: page,
      _limit: pageSize,
      _sort: sortColumn || 'id',
      _order: sortOrder || 'asc',
      q: searchText,
    },
  })

  if (response.status !== 200) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.data
}

export const createEmployeeApi = async data => {
  const response = await axios.post(API_URL.EMPLOYEES, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  if (response.status !== 201) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.data
}

export const getEmployeeByIdApi = async id => {
  const response = await axios.get(`${API_URL.EMPLOYEES}/${id}`)

  if (response.status !== 200) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.data
}

export const updateEmployeeApi = async (id, data) => {
  const response = await axios.put(`${API_URL.EMPLOYEES}/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  if (response.status !== 200) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  console.log(response, data)

  return response.data
}
