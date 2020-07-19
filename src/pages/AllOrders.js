import React, { useEffect } from 'react'
import axios from 'axios'

import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalStore'
import OrderCard from '../components/OrderCard'

const AllOrders = () => {
  const { myOrders } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext() 

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('https://express-pizza-ordering-system.herokuapp.com/api/orders')

        dispatch({ type: 'GET_ORDERS', payload: res.data.data })
      }
      catch (err) {
        console.log(err.response)
      }
    })()
  }, [dispatch])

  return (
    <div className="all-orders">
      {
        myOrders.map(order => (
          <OrderCard key={order._id} {...order} />
        ))
      }
    </div>
  )
}

export default AllOrders