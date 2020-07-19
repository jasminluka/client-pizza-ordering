import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import OrderCard from '../components/OrderCard'

const Order = () => {
  const [order, setOrder] = useState({})
  const { id } = useParams()

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`https://express-pizza-ordering-system.herokuapp.com/api/orders/${id}`)
  
        setOrder(res.data.data)  
      }
      catch (err) {
        console.log(err.response)
      }
    })()
  }, [id])

  return (
    <div className="order">
      <OrderCard {...order} />
    </div>
  )
}

export default Order