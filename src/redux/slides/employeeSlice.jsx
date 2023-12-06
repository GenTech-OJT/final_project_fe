import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  employees: [],
  loading: false,
  error: null,
}

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    fetchEmployeesStart(state) {
      state.loading = true
    },
    fetchEmployeesSuccess(state, action) {
      state.loading = false
      state.employees = action.payload
    },
    fetchEmployeesFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    // Add other actions as needed (e.g., create, update, delete)
  },
})

export const {
  fetchEmployeesStart,
  fetchEmployeesSuccess,
  fetchEmployeesFailure,
} = employeeSlice.actions

export const fetchEmployees = () => async dispatch => {
  dispatch(fetchEmployeesStart())

  try {
    const response = await fetch('http://localhost:3000/employees')

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const apiData = await response.json()
    dispatch(fetchEmployeesSuccess(apiData.data))
  } catch (error) {
    console.error('Error calling API:', error)
    dispatch(fetchEmployeesFailure(error.message))
  }
}

export default employeeSlice.reducer
