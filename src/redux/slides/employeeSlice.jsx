/* eslint-disable no-undef */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    editEmployees: (state, actions) => {},
  },
})

export const {} = employeeSlice.actions

export default employeeSlice.reducer
