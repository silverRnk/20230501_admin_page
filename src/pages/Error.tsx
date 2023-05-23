import React from 'react'
import { Navigate, useRouteError, isRouteErrorResponse  } from 'react-router-dom';

const Error = () => {
  const error = useRouteError;

  if(isRouteErrorResponse(error) && error.status === 401){
    return <Navigate to={'/login'} />
  }
  
  console.log(error)
  

  return (
    <div>Page does not exist</div>
  )
}

export default Error