/* eslint-disable no-undef */
import './App.css'
import Toan from '@/components/Toan'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { Fragment } from 'react'
function App() {
  return (
    <>
      <Router>
        <Routes>
          {routes.map((route, index) => {
            const Page = route.page
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            )
          })}
        </Routes>
      </Router>
    </>
  )
}

export default App
