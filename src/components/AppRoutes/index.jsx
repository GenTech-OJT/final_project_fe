import Profile from '@pages/AdminPages/Profile'
import NotFoundPage from '@pages/AdminPages/404NotFound'
import Dashboard from '@pages/AdminPages/Dashboard'
import UserManagement from '@pages/AdminPages/UsersManagement'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/users" element={<UserManagement />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  )
}

export default AppRoutes
