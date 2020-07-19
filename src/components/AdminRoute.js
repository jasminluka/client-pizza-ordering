import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useGlobalStateContext } from '../context/globalStore'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loggedUser: { isAuthenticated, user }} = useGlobalStateContext()

  return (
    <Route {...rest} render={props => isAuthenticated && user.role === 'admin' ? (<Component {...props} />) : (<Redirect to="/login-register" />) } />
  )
}

export default PrivateRoute