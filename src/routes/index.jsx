import Profile from '@pages/AdminPages/Profile'
import NotFoundPage from '@pages/AdminPages/404NotFound/NotFound'
import Dashboard from '@pages/AdminPages/Dashboard'
import UserManagement from '@pages/AdminPages/UsersManagement'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Logout from '@pages/AdminPages/Logout'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/users" element={<UserManagement />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/logout" element={<Logout />}></Route>
      <Route path="/pagenotfound" element={<NotFoundPage />}></Route>
    </Routes>
  )
}

export default AppRoutes
