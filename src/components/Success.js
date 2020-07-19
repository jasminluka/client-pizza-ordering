import React from 'react'
import { Link } from 'react-router-dom'

import { useGlobalDispatchContext } from '../context/globalStore'
import tick from '../img/tick.png'
import error from '../img/error.png'

const Success = ({ successMessage }) => {
  const dispatch = useGlobalDispatchContext()

  if (!successMessage) {
    return (
      <div className="success">
        <div>
          <img src={error} alt="Error" />
          <h1>Sorry!</h1>
          <h2>Something went wrong...</h2>
          <Link
            to='/'
            className="card-btn"
            onClick={() => dispatch({ type: 'RESET_STEP' })}
          >Try Again</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="success">
      <div>
        <img src={tick} alt="Success" />
        <h1>Thank You!</h1>
        <h2>Your order is received and we will deliver it to you once its ready.</h2>
        <Link
          to='/'
          className="card-btn"
          onClick={() => dispatch({ type: 'RESET_STEP' })}
        >Make Another Order</Link>
      </div>
    </div>
  )
}

export default Success