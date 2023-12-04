import Profile from '@pages/AdminPages/Profile'
import NotFoundPage from '@pages/AdminPages/404NotFound/NotFound'
import ProjectManagement from '@pages/AdminPages/ProjectManagement'
import EmployeeManagement from '@pages/AdminPages/EmployeeManagement'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Edit from '@pages/AdminPages/EmployeeManagement/edit'
import Detail from '@pages/AdminPages/EmployeeManagement/detail'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProjectManagement />}></Route>
      <Route path="/users" element={<EmployeeManagement />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/employe/edit/:empid" element={<Edit />}></Route>
      <Route path="/employe/:empid" element={<Detail />}></Route>

      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  )
}

export default AppRoutes
