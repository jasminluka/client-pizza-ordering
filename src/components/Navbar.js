import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalStore'
import logo from '../img/logo.png'
import cart from '../img/cart-black.png'

const Navbar = () => {
  const navbarRef = useRef();
  const fakeNav = useRef();

  const { order, loggedUser: { isAuthenticated, user } } = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();

  // const pizzas = Object.entries(order).map(([key, value]) => value.amount).reduce((a, b) => a + b, 0)
  // const pizzas = Object.values(order).map((order) => order.amount).reduce((a, b) => a + b, 0)
  const pizzas = Object.values(order).reduce((a, b) => a + b.amount, 0)

  useEffect(() => {
    const fakeNavbar = fakeNav.current
    
    const observer = new IntersectionObserver(entries => {
      if (entries[0].boundingClientRect.top < 0) {
        navbarRef.current.classList.add('active');
      }
      else {
        navbarRef.current.classList.remove('active');
      }
    }, {
      threshold: 1
    });

    observer.observe(fakeNavbar);

    return () => {
      observer.unobserve(fakeNavbar);
    }
  }, [])


  const userLinks = (
    <ul className="menu">
      <li>
        <Link to='/user/orders' className="link">My Orders</Link>
      </li>
      <li>
        <a
          href="#!"
          className="link"
          onClick={() => dispatch({ type: 'LOGOUT' })}
        >
          Logout
        </a>
      </li>
      <li>
        <Link to='/cart'>
          <img src={cart} alt="Cart" />
          {
            pizzas !== 0 ? <span className="badge">{pizzas}</span> : ''
          }
        </Link>
      </li>
    </ul>
  )


  const adminLinks = (
    <ul className="menu">
      <li>
        <Link to='/admin/new-pizza' className="link">Add Pizza</Link>
      </li>
      <li>
        <Link to='/admin/all-orders' className="link">Orders</Link>
      </li>
      <li>
        <a
          href="#!"
          className="link"
          onClick={() => dispatch({ type: 'LOGOUT' })}
        >
          Logout
        </a>
      </li>
      <li>
        <Link to='/cart'>
          <img src={cart} alt="Cart" />
          {
            pizzas !== 0 ? <span className="badge">{pizzas}</span> : ''
          }
        </Link>
      </li>
    </ul>
  )


  const guestLinks = (
    <ul className="menu">
      <li>
        <Link to='/login-register' className="link">Login / Register</Link>
      </li>
      <li>
        <Link to='/cart'>
          <img src={cart} alt="Cart" />
          {
            pizzas !== 0 ? <span className="badge">{pizzas}</span> : ''
          }
        </Link>
      </li>
    </ul>
  )

  return (
    <>
      <div ref={fakeNav}></div>
      <nav ref={navbarRef}>
        <div className="logo">
          <Link to='/'><img src={logo} alt="HOME" /></Link>
        </div>
        {
          isAuthenticated ? user.role === 'user' ? userLinks : adminLinks : guestLinks
        }
      </nav>
    </>
  )
}

export default Navbar