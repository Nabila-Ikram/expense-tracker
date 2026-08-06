import React, { useState } from 'react'
import './index.css'
import DashboardPage from './components/pages/DashboardPage'
import AnalyticsPage from './components/pages/AnalyticsPage'
import Signup_login from './components/SignUp_login/Signup_login'
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
import TransactionAddPage from './components/pages/TransactionAddPage'
import BudgetPage from './components/pages/BudgetPage'
import GoalsPage from './components/pages/GoalsPage'
import SettingPage from './components/pages/SettingPage'
import TransactionHistory from './components/pages/TransactionHistory'
import BudgetForm from './components/budget/BudgetForm'
import TransactionEditPage from './components/pages/TransactionEditPage'
import BudgetEditPage from './components/pages/BudgetEditPage'


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
       <Route path='/transactions'
      element={
      <ProtectedRoute>
     <TransactionAddPage/>
      </ProtectedRoute>
      }
      />
       <Route path='/budget'
      element={
      <ProtectedRoute>
    <BudgetPage/>
      </ProtectedRoute>
      }
      />
         <Route path='/budget/add'
      element={
      <ProtectedRoute>
    <BudgetForm/>
      </ProtectedRoute>
      }
      />


        <Route path='/goals'
      element={
      <ProtectedRoute>
    <GoalsPage/>
      </ProtectedRoute>
      }
      />


  <Route path='/settings'
      element={
      <ProtectedRoute>
<SettingPage/>
      </ProtectedRoute>
      }
      />
       <Route path='/transactionHistory'
      element={
      <ProtectedRoute>
<TransactionHistory/>
      </ProtectedRoute>
      }
      />

<Route
 path="/budget/edit/:budget_id"
 element={
  <ProtectedRoute>
  <BudgetEditPage/>
  </ProtectedRoute>
 }
/>



 <Route
    path="/transactions/edit/:trans_id"
    element={
      <ProtectedRoute>
   <TransactionEditPage/>
    </ProtectedRoute>
    }
/>


    
      
  </Routes>


        )}
export default App
