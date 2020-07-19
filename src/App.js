import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'
import RegisterLogin from './pages/RegisterLogin'
import MyOrders from './pages/MyOrders'
import Order from './pages/Order'
import PizzaForm from './pages/PizzaForm'
import AllOrders from './pages/AllOrders'
import { useGlobalStateContext } from './context/globalStore'
import setAuthToken from './helper/setAuthToken'
import './App.scss'

// On every refresh set Authorization Bearer token
if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  const { loadUser } = useGlobalStateContext()

  useEffect(() => {
    loadUser()
  }, [loadUser])

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/cart' component={Cart} />
        <Route path='/login-register' component={RegisterLogin} />
        <PrivateRoute path='/user/orders' component={MyOrders} />
        <PrivateRoute path='/user/order/:id' component={Order} />
        <AdminRoute path='/admin/new-pizza' component={PizzaForm} />
        <AdminRoute path='/admin/all-orders' component={AllOrders} />
      </Switch>
    </Router>
  )
}

export default App