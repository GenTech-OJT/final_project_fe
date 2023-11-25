import Dashboard from '@pages/Dashboard'
import UserManagement from '@pages/UsersManagement'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/users" element={<UserManagement />}></Route>
    </Routes>
  )
}

export default AppRoutes
