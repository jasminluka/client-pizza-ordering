import React from 'react'

const OrderCard = ({ name, phone, address, order, totalPrice }) => (
  <div className="confirm">
    <div className="confirm-card">
      <div className="header">
        <h2>Order</h2>
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
            order && order.map(order => (
              <li key={order._id} className="pizza-item">
                <h3>{order.name}</h3>
                <p>x {order.details.amount}</p>
                <h2>{order.details.total.toFixed(2)} €</h2>
              </li>
            ))
          }
        </ul>
        <div className="total-price">
          <h3>Total Price:</h3>
          <div>
            {
              totalPrice && (
                <>
                  <h2>{totalPrice.euro.toFixed(2)} €</h2>
                  <h2>$ {totalPrice.dollar.toFixed(2)}</h2>
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default OrderCard