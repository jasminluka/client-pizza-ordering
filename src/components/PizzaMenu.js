import React, { useEffect } from 'react'
import axios from 'axios'

import Pizza from './Pizza'
import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalStore'
// import { pizzas } from '../data'

const PizzaMenu = ({ setAlert }) => {
  const { pizzas } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext() 

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/pizzas')
  
        dispatch({ type: 'GET_PIZZAS', payload: res.data.pizzas })
      }
      catch (err) {
        console.log(err.response)
      }
    })()
  }, [dispatch])

  return (
    <div className="menu-section" id="menu">
      <h2>Our Menu</h2>
      <div className="grid">
        {
          pizzas.map(pizza => (
            <Pizza key={pizza._id} setAlert={setAlert} {...pizza} />
          ))
        }
      </div>
    </div>
  )
}

export default PizzaMenu