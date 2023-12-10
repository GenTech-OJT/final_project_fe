import Spinner from '@components/AdminComponent/Spinner/Spinner.jsx'
import '@utils/i18n/i18n.jsx'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import { Toast } from '@components/Toast/toast.jsx'
import { lazy } from 'react'

const Login = lazy(() => import('@pages/AdminPages/login/Login'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<App />} />
        </Routes>
        <Toast />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
)
