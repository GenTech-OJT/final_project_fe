import NotFoundPage from '@pages/AdminPages/404NotFound/NotFound'
import Dashboard from '@pages/AdminPages/Dashboard'
import CreateEmployee from '@pages/AdminPages/EmployeeManagement/create'
import Profile from '@pages/AdminPages/Profile'
import CreateProject from '@pages/AdminPages/ProjectManagement/create'
import DetailProject from '@pages/AdminPages/ProjectManagement/detail'
import EditProject from '@pages/AdminPages/ProjectManagement/edit'
import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const ProjectManagement = lazy(
  () => import('@pages/AdminPages/ProjectManagement')
)
const EmployeeManagement = lazy(
  () => import('@pages/AdminPages/EmployeeManagement')
)

const Login = lazy(() => import('@pages/AdminPages/login/Login'))

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/projects" element={<ProjectManagement />}></Route>
      <Route path="/employees" element={<EmployeeManagement />}></Route>
      <Route path="/employees/create" element={<CreateEmployee />}></Route>
      {/* 2 route dưới đây tạm hiển thị employee management page */}
      <Route
        path="/employees/edit/:id"
        element={<EmployeeManagement />}
      ></Route>
      <Route
        path="/employees/detail/:id"
        element={<EmployeeManagement />}
      ></Route>
      <Route path="/projects/create" element={<CreateProject />}></Route>
      <Route path="/projects/edit/:id" element={<EditProject />}></Route>
      <Route path="/projects/detail/:id" element={<DetailProject />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  )
}

export default AppRoutes
