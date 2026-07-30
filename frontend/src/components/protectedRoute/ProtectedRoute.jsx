import React, { Children, use } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({Children}) => {
     const user=JSON.parse(localStorage.getItem("loggedInUser"))
     if(!user) 
       return <Navigate to='/login'></Navigate>
     else
        return Children
        
}

export default ProtectedRoute
// protected route dont allow unauthorized users to access the dashboard
// dahsboard-protectedroute-verify-dashbboard