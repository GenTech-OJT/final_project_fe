// import Spinner from '@components/AdminComponent/Spinner/Spinner.jsx'
// import '@utils/i18n/i18n.jsx'
// import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import App from './App.jsx'
// import { Toast } from '@components/Toast/toast.jsx'
import { Provider } from 'react-redux'
import AppRoutes from './Routes'
import store from './redux/store'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <AppRoutes />
    </Router>
  </Provider>
)
