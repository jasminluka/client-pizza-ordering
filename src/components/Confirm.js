import React from 'react'
import axios from 'axios'

import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalStore'

const Confirm = ({ nextStep, prevStep, setSuccessMessage }) => {
  const { order, totalPrice, userInfo: { name, phone, address }, loggedUser: { isAuthenticated } } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()

  const pizzas = Object.entries(order)

  const onSubmit = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const formData = {
      order,
      name,
      phone,
      address,
      totalPrice
    }

    try {
      if (!isAuthenticated) {
        const res = await axios.post('/api/orders', formData, config)

        setSuccessMessage(res.data.success)
      }
      else {
        const res = await axios.post('/api/orders/user', formData, config)

        setSuccessMessage(res.data.success)
      }
    }
    catch (err) {
      console.log(err.response)
      setSuccessMessage(err.response.data.success)
    }

    dispatch({ type: 'CLEAR_CART' })
    dispatch({ type: 'GET_TOTAL_PRICE' })
    dispatch({ type: 'CLEAR_USER_DETAILS' })

    nextStep()
  }

  return (
    <div className="confirm">
      <div className="confirm-card">
        <div className="header">
          <h2>Confirm !</h2>
        </div>
        <div className="body">
          <div className="user-info">
            <h3>Name:</h3>
            <h2>{name}</h2>
          </div>
          <div className="user-info">
            <h3>Phone:</h3>
            <h2>{phone}</h2>
          </div>
          <div className="user-info">
            <h3>Address:</h3>
            <h2>{address}</h2>
          </div>
          <ul className="pizzas-container">
            {
              pizzas.map(([pizza, details]) => (
                <li key={pizza} className="pizza-item">
                  <h3>{pizza}</h3>
                  <p>x {details.amount}</p>
                  <h2>{details.total.toFixed(2)} €</h2>
                </li>
              ))
            }
          </ul>
          <div className="total-price">
            <h3>Total Price:</h3>
            <div>
              <h2>{totalPrice.euro.toFixed(2)} €</h2>
              <h2>$ {totalPrice.dollar.toFixed(2)}</h2>
            </div>
          </div>
          <div className="card-buttons">
            <button className="card-btn btn-back" onClick={prevStep}>Back</button>
            <button className="card-btn btn-confirm" onClick={onSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirm