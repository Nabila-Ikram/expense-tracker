import React, { useState } from 'react'
import './index.css'
import Formhandle from './components/SignUp_login/Formhandle'
import Dashboard from './components/dashboard/Dashboard'


const App = () => {
  return (
  <>
  <div className='flex flex-col justify-center'>
  {/* <div className='background h-screen w-full flex items-center justify-center' >
       <Formhandle/>
    </div> */}
   <Dashboard/>
  
   </div>
   
    
      </>
      )}

export default App
