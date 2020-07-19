import React, { useState } from 'react'
import axios from 'axios'

import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalStore'
import pizza from '../img/pizza.png'

const Pizza = ({ _id, name, ingredients, prices, setAlert }) => {
  const [isOpen, setIsOpen] = useState(false)

  const { loggedUser: { isAuthenticated, user } } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()
  
  const handleOrder = (e) => {
    const price = parseFloat(e.target.previousElementSibling.textContent)
    const size = e.target.parentNode.parentNode.firstElementChild.textContent

    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        pizza: `${name} ${size}`,
        price
      }
    })

    dispatch({ type: 'GET_TOTAL_PRICE' })

    setAlert(`${size} ${name} Pizza was added to Cart.`)
  }

  const handleRemove = async () => {
    try {
      await axios.delete(`https://express-pizza-ordering-system.herokuapp.com/api/pizzas/${_id}`)

      dispatch({ type: 'DELETE_PIZZA', payload: _id })
    }
    catch (err) {
      console.log(err.response)  
    }

    setIsOpen(false)
  }
  
  return (
    <div className="card">
      <div className="pizza-image">
        <img src={pizza} alt="Pizza" />
      </div>
      <div className="details">
        <p className="name">{name}</p>
        <p className="ingredients">{ingredients}</p>
        <div className="buttons">
          {
            prices.map(price => (
              <div className="prices" key={price.price}>
                <h4 className="size">{price.size}</h4>
                <h3><span>{price.price.toFixed(2)} €</span><button onClick={handleOrder}>Order</button></h3>
              </div>
            ))
          }
        </div>
      </div>
      {
        isAuthenticated && user.role === 'admin' && (
          <button className="remove-btn" onClick={() => setIsOpen(true)}>Remove from menu</button>
        )
      }
      {
        isOpen && (
          <div className="modal-remove-pizza">
            <div className="modal-wrapper">
              <h1>Are you sure?</h1>
              <h3>That you want to remove Pizza {name} from Menu</h3>
              <div className="btns">
                <button className="card-btn btn-back" onClick={() => setIsOpen(false)}>Cancel</button>
                <button className="card-btn btn-confirm" onClick={handleRemove}>Delete</button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Pizza