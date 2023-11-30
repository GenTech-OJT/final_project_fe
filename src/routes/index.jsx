import NotFoundPage from '@pages/AdminPages/404NotFound/NotFound'
import Profile from '@pages/AdminPages/Profile'
import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const ProjectManagement = lazy(
  () => import('@pages/AdminPages/ProjectManagement')
)
const EmployeeManagement = lazy(
  () => import('@pages/AdminPages/EmployeeManagement')
)
const Login = lazy(() => import('@pages/AdminPages/Login'))

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProjectManagement />}></Route>
      <Route path="/users" element={<EmployeeManagement />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  )
}

export default AppRoutes
