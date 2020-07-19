import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalStore'
import emptyCart from '../img/empty-cart.png'

const MyOrders = () => {
  const { myOrders } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext() 

  // const totalPizzas = myOrders.map(order => order.order.map(o => o.details.amount).reduce((a, b) => a + b))
  const totalPizzas = myOrders.map(order => order.order.reduce((a, b) => a + b.details.amount, 0))

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('https://express-pizza-ordering-system.herokuapp.com/api/orders/user')
  
        dispatch({ type: 'GET_ORDERS', payload: res.data.data })
      }
      catch (err) {
        console.log(err.response)
      }
    })()
  }, [dispatch])

  return (
    <div className="my-orders">
      <div className="orders">
        {
          myOrders.length > 0 ?
            <>
              <div className="my-orders-head">
                <p>Quantity</p>
                <p>Total</p>
              </div>
              <div className="order-list">
                {
                  myOrders.map((order, index) => (
                    <div className="my-order" key={order._id}>
                      <p className="name">Pizzas</p>
                      <p className="amount">{totalPizzas[index]}</p>
                      <p className="price">{order.totalPrice.euro.toFixed(2)} €</p>
                      <Link to={`/user/order/${order._id}`}>View More</Link>
                    </div>
                  ))
                }
              </div>
            </> :
            <div className="empty">
              <h1>No Previous Orders</h1>
              <img src={emptyCart} alt="Cart is empty!" />
              <Link to='/' className="go-back-link">Go order a delicious PIZZA !</Link>
            </div>
        }
      </div>
    </div>
  )
}

export default MyOrders