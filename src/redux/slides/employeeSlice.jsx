/* eslint-disable no-undef */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  employees: [],
  loading: false,
  error: null,
  sortKey: null,
  sortOrder: null,
  searchQuery: '',
}

const yourSortAndFilterLogic = (data, sortKey, sortOrder, searchQuery) => {
  if (!Array.isArray(data)) {
    console.error('Error: data is not an array')
    return []
  }

  // Tìm kiếm
  let filteredData = [...data]
  if (searchQuery) {
    const searchTerm = searchQuery.toLowerCase()
    filteredData = filteredData.filter(
      item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.position.toLowerCase().includes(searchTerm)
    )
  }

  // Sắp xếp
  if (sortKey && sortOrder) {
    filteredData.sort((a, b) => {
      const valueA = a[sortKey]
      const valueB = b[sortKey]

      if (sortOrder === 'asc') {
        return valueA.localeCompare(valueB, undefined, { sensitivity: 'base' })
      } else {
        return valueB.localeCompare(valueA, undefined, { sensitivity: 'base' })
      }
    })
  }

  return filteredData
}

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    fetchEmployeesStart(state) {
      state.loading = true
    },
    fetchEmployeesSuccess(state, action) {
      const { data } = action.payload

      // Kiểm tra xem data có phải là mảng không
      if (!Array.isArray(data)) {
        console.error('Error: data is not an array')
        return { ...state, employees: [], loading: false }
      }

      // Gọi hàm mới để xử lý sắp xếp và tìm kiếm
      const sortedAndFilteredData = yourSortAndFilterLogic(
        data,
        state.sortKey,
        state.sortOrder,
        state.searchQuery
      )

      return { ...state, employees: sortedAndFilteredData, loading: false }
    },

    fetchEmployeesFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    // Set sort key and order to the state
    setSortInfo(state, action) {
      const { sortKey, sortOrder } = action.payload
      state.sortKey = sortKey
      state.sortOrder = sortOrder
    },
    // Set search query to the state
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
    },
    // Add other actions as needed (e.g., create, update, delete)
  },
})

export const {
  fetchEmployeesStart,
  fetchEmployeesSuccess,
  fetchEmployeesFailure,
  setSortInfo,
  setSearchQuery,
} = employeeSlice.actions

export const fetchEmployees =
  ({ page, limit, sort, order, query }) =>
  async (dispatch, getState) => {
    dispatch(fetchEmployeesStart())

    try {
      const response = await fetch(
        `http://localhost:3000/employees?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}&q=${query}`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const apiData = await response.json()
      dispatch(fetchEmployeesSuccess(apiData))
    } catch (error) {
      console.error('Error calling API:', error)
      dispatch(fetchEmployeesFailure(error.message))
    }
  }

export default employeeSlice.reducer
