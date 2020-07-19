import React from 'react'
import { useGlobalDispatchContext } from '../context/globalStore'

const CartItem = ({ pizza, amount, price, total }) => {
  const dispatch = useGlobalDispatchContext()

  return (
    <div className="cart-item">
      <p className="remove">
        <button
          onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: pizza })}
        >x</button>
      </p>
      <p className="name">{pizza}</p>
      <p className="amount">
        <button
          onClick={() => {
            amount === 1 ?
              dispatch({ type: 'REMOVE_FROM_CART', payload: pizza }) :
              dispatch({ type: 'DECREASE_AMOUNT', payload: pizza })
          }}
        >-</button>
        {amount}
        <button
          onClick={() => dispatch({ type: 'INCREASE_AMOUNT', payload: pizza })}
        >+</button>
      </p>
      <p className="price">{price.toFixed(2)} €</p>
      <p className="total">{total.toFixed(2)} €</p>
    </div>
  )
}

export default CartItem