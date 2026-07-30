import React, { useState } from 'react'
import './index.css'
import DashboardPage from './components/pages/DashboardPage'
import AnalyticsPage from './components/pages/AnalyticsPage'
import Signup_login from './components/SignUp_login/Signup_login'
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'

const App = () => {
  return (
// BrowserRouter → Enables routing.
// Routes → Holds all routes.
// Route → Maps a URL to a component.
//  Navigate → Redirects from one route to another.
 
  <Routes> {/* Routes:Holds all application routes and route map one url to react component. */}
    <Route path='/' element={<Navigate to={"/login"}/>}/>
     {/* navigate redirects to react component */}
    <Route path='/login' element={<Signup_login/>}/>

    <Route path='/dashboard' 
    element={
    <ProtectedRoute>
    <DashboardPage/>
      </ProtectedRoute>
}
/>

     <Route path='/analytics'
      element={
      <ProtectedRoute>
      <AnalyticsPage/>
      </ProtectedRoute>
      }
      />

  </Routes>


        )}
export default App
