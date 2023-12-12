import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from '@components/PrivateRoute'
const Login = lazy(() => import('@pages/login/Login'))
const Admin = lazy(() => import('@pages/Admin'))
const Dashboard = lazy(() => import('@pages/dashboard/Dashboard'))
const Employees = lazy(() => import('@pages/employees/list/List'))
const EmployeeCreate = lazy(() => import('@pages/employees/create/Create'))
const EmployeeEdit = lazy(() => import('@pages/employees/edit/Edit'))
const EmployeeDetail = lazy(() => import('@pages/employees/detail/Detail'))
const NotFoundPage = lazy(() => import('@pages/notFound/NotFound'))

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/admin" element={<PrivateRoute component={<Admin />} />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<Dashboard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="employees/create" element={<EmployeeCreate />} />
        <Route path="employees/detail/:id" element={<EmployeeDetail />} />
        <Route path="employees/edit/:id" element={<EmployeeEdit />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes