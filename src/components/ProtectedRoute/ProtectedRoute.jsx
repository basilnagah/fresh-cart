import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { userContext } from '../../context/user.context'

export default function ProtectedRoute({children}) {
    const {token , setToken } = useContext(userContext)

    
    if(token!=null){
        return children
    }else{
        return <Navigate to='/auth/login'/>
    }

}
