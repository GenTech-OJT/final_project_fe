import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/dashboard/Dashboard'
import Users from './pages/employees/list/List'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<PrivateRoute component={<Admin />} />}>
        <Route path="projects" element={<Dashboard />} />
        <Route path="employees" element={<Users />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
