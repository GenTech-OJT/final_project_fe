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
export const editEmployeeApi = async data => {
  try {
    const response = await axios.put(API_URL.EMPLOYEES + `/${data.id}`, data)
    return response.data
  } catch (error) {
    throw new Error(`Failed to edit employee: ${error.message}`)
  }
}
