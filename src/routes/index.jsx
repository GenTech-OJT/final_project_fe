import Profile from '@pages/AdminPages/Profile'
import NotFoundPage from '@pages/AdminPages/404NotFound/NotFound'
import ProjectManagement from '@pages/AdminPages/ProjectManagement'
import EmployeeManagement from '@pages/AdminPages/EmployeeManagement'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '@pages/AdminPages/Login'
import Create from '@pages/AdminPages/EmployeeManagement/create'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProjectManagement />}></Route>
      <Route path="/users" element={<EmployeeManagement />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/employe/create" element={<Create />}></Route>
      <Route path="/employe/edit" element={<Create />}></Route>
      <Route path="/edit" element={<Create />}></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  )
}

export default AppRoutes
