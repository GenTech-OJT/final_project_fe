import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<PrivateRoute component={<Admin />} />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
