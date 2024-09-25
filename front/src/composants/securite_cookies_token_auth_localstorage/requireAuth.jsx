import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './auth'
import React from 'react'

export const RequireAuth = ({ children }) => {
  const location = useLocation()
  const auth = useAuth()
  if (!auth.user) {
    return <Navigate to='/connexion' state={{ path: location.pathname }} />
  }else {<Outlet/>
  return children
}}


//reutiliser por les routes log 


const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to='/connexion' state={{ path: location.pathname }} />;
  }

  return children;
};

export  {PrivateRoute};