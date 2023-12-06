// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from '../redux/slides/employeeSlice'

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    // Add other reducers as needed
  },
})

export default store
