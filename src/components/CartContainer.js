import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import CartItem from '../components/CartItem'
import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalStore'
import emptyCart from '../img/empty-cart.png'

const CartContainer = ({ nextStep }) => {
  const { order, totalPrice: { euro, dollar } } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()
  
  const pizzas = Object.entries(order)

  useEffect(() => {
    dispatch({ type: 'GET_TOTAL_PRICE' })
  }, [order, dispatch])

  return (
    <div className="cart-section">
      <div className="cart">
        {
          pizzas.length > 0 ?
            <>
              <div className="head">
                <p>Pizza</p>
                <p>Quantity</p>
                <p>Price</p>
                <p>Total</p>
              </div>
              <div className="pizzas">
                {
                  pizzas.map(([pizza, details]) => (
                    <CartItem key={pizza} pizza={pizza} {...details} />
                  ))
                }
              </div>
              <div className="bottom">
                <div className="clear-cart">
                  <button
                    className="btn"
                    onClick={() => dispatch({ type: 'CLEAR_CART' })}
                  >Clear Cart</button>  
                </div>
                <div className="totals">
                  <p>{euro.toFixed(2)} €</p>
                  <p>$ {dollar.toFixed(2)}</p>
                </div>
              </div>
              <div className="payment">
                <button
                  className="payment-link"
                  onClick={nextStep}
                >Proceed to Checkout</button>
              </div>
              <Link to='/' className="go-back-link">One more PIZZA ?</Link>
            </> :
            <div className="empty">
              <h1>Cart is empty</h1>
              <img src={emptyCart} alt="Cart is empty!" />
              <Link to='/' className="go-back-link">Go order a delicious PIZZA !</Link>
            </div>
        }
      </div>
    </div>
  )
}

export default CartContainer