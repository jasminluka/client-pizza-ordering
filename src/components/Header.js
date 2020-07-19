import React from 'react'
import pizza from '../img/hero-pizza.png'

const Header = () => {
  return (
    <header>
      <div className="description">
        <h3>Are you hungry ?</h3>
        <h1>Don't Wait !</h1>
        <a href="#menu" className="btn">Order Now</a>
      </div>
      <div className="image">
        <img src={pizza} alt="Hero-Pizza" />
      </div>
    </header>
  )
}

export default Header