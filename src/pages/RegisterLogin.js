import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalStore'
import useFormValidation from '../hooks/useFormValidation'
import validateForm from '../helper/validateForm'

const RegisterLogin = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [registerActive, setRegisterActive] = useState(false)
  const [errorAfterSubmit, setErrorAfterSubmit] = useState('')
  const { handleBlur, disabled, errors } = useFormValidation({
    form: 'login-register',
    registerActive,
    name,
    email,
    password
  }, validateForm)

  const { loggedUser, loadUser } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()

  const toggleForm = () => {
    setRegisterActive(prevState => !prevState)
    setName('')
    setEmail('')
    setPassword('')
    setErrorAfterSubmit('')
  }


  const handleRegister = async e => {
    e.preventDefault()

    const data = { name, email, password }
    
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/auth/register', data, config)
  
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data.token })

      loadUser()
    }
    catch (err) {
      setErrorAfterSubmit(err.response.data.error)
    }
  }


  const handleLogin = async e => {
    e.preventDefault()

    const data = { email, password }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/auth/login', data, config)

      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.token })

      loadUser()
    }
    catch (err) {
      setErrorAfterSubmit(err.response.data.error)
    }
  }


  // Redirect to home page if it is authenticated
  if (loggedUser.isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-register">
      <div className={`container ${registerActive ? 'register-active' : ''}`}>
        <div className="form-container register">
          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <div className="input-box">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                onBlur={handleBlur}
              />
              {
                errors.name && 
                  <small className="error-text">{errors.name}</small>
              }
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={handleBlur}
              />
              {
                errors.email && 
                  <small className="error-text">{errors.email}</small>
              }
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onBlur={handleBlur}
              />
              {
                errors.password && 
                  <small className="error-text">{errors.password}</small>
              }
            </div>
            <input type="submit" value="Register" disabled={disabled} />
            {
              errorAfterSubmit && 
                <small className="error">{errorAfterSubmit}</small>
            }
          </form>
        </div>
        <div className="form-container login">
          <form onSubmit={handleLogin}>
            <h1>Log in</h1>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={handleBlur}
              />
              {
                errors.email && 
                  <small className="error-text">{errors.email}</small>
              }
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onBlur={handleBlur}
              />
              {
                errors.password && 
                  <small className="error-text">{errors.password}</small>
              }
            </div>
            <input type="submit" value="Login" disabled={disabled} />
            {
              errorAfterSubmit && 
                <small className="error">{errorAfterSubmit}</small>
            }
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep track of your orders please login with your personal account</p>
              <button className="ghost" onClick={toggleForm}>Login</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Register your account and start a journey with us</p>
              <button className="ghost" onClick={toggleForm}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterLogin