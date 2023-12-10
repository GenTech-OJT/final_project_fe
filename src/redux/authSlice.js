import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
    refreshToken: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
    },
    logout: state => {
      state.isAuthenticated = false
      state.token = null
      state.refreshToken = null
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
