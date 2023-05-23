import React from 'react'
import { useStateContext } from '../context/ContextProvider'
import { Navigate, Outlet } from 'react-router-dom'

const DefaultLayout = () => {
    const {user, token} = useStateContext()

    if(!token){
        return <Navigate to="/login" />
    }
    
  return (
    <>
    <Outlet />
    </>
  )
}

export default DefaultLayout