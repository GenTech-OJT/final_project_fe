import Profile from '@components/AdminComponent/Profile/Profile'
import Dashboard from '@pages/AdminPages/Dashboard'
import UserManagement from '@pages/AdminPages/UsersManagement'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route
        path="https://final-project-fe-git-final-4-toan-nguyens-projects.vercel.app/users"
        element={<UserManagement />}
      ></Route>
      <Route
        path="https://final-project-fe-git-final-4-toan-nguyens-projects.vercel.app/profile"
        element={<Profile />}
      ></Route>
    </Routes>
  )
}

export default AppRoutes
