import Spinner from '@components/AdminComponent/Spinner/index.jsx'
import '@utils/i18n/i18n.jsx'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { Toast } from '@components/Toast/toast.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <App />
        <Toast />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
)
