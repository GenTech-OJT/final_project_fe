import axios from 'axios'
import store from '../redux/store'
import { login, logout } from '../redux/authSlice'

const instance = axios.create()

instance.interceptors.request.use(
  config => {
    const accessToken = store.getState().auth.accessToken
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      return instance.post('/refresh-token').then(res => {
        const { accessToken, refreshToken } = res.data
        store.dispatch(login({ accessToken, refreshToken }))
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return axios(originalRequest)
      })
    }

    if (error.response.status === 403) {
      store.dispatch(logout())
    }

    return Promise.reject(error)
  }
)

export default instance
