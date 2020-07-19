import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import tick from '../img/tick.png'

const PizzaForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    prices: [
      {
        size: 'small',
        price: ''
      },
      {
        size: 'medium',
        price: ''
      },
      {
        size: 'large',
        price: ''
      }
    ]
  })
  const [pizza, setPizza] = useState({})
  const [successMessage, setSuccessMessage] = useState(false)
  const [formErrors, setFormErrors] = useState({
    name: '',
    ingredients: '',
    prices: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    
    if (name === 'small' || name === 'medium' || name === 'large') {
      const sizeIndex = formData.prices.findIndex(obj => obj.size === name)

      setFormData(prevForm => ({
        ...prevForm,
        prices: [
          ...prevForm.prices.slice(0, sizeIndex),
          {
            ...prevForm.prices[sizeIndex],
            price: value,
          },
          ...prevForm.prices.slice(sizeIndex + 1)
        ]
      }))

      // Other way with map
      // const prices = formData.prices.map(obj =>
      //   obj.size === name
      //     ? { ...obj, price: value }
      //     : obj
      // )

      // setFormData(prevForm => ({
      //   ...prevForm,
      //   prices
      // }))
    }
    else {
      setFormData(prevForm => ({
        ...prevForm,
        [name]: value
      }))
    }
  }

  // CLEAR FORM
  const clearForm = () => {
    setFormData({
      name: '',
      ingredients: '',
      prices: [
        {
          size: 'small',
          price: ''
        },
        {
          size: 'medium',
          price: ''
        },
        {
          size: 'large',
          price: ''
        }
      ]
    })

    setFormErrors({
      name: '',
      ingredients: '',
      prices: ''
    })
  }

  // SUBMIT TO DB
  const onSubmit = async () => {
    setFormErrors({
      name: '',
      ingredients: '',
      prices: ''
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/pizzas', formData, config)
  
      setPizza(res.data.data)
      setSuccessMessage(res.data.success)
      clearForm()
    }
    catch (err) {
      const errors = err.response.data.error.split(',')
      
      if (errors.includes('Pizza already exists!')) {
        setFormErrors(prevErrors => ({
          ...prevErrors,
          name: 'Pizza already exists!'
        }))
      }
      if (errors.includes('Please add a pizza name')) {
        setFormErrors(prevErrors => ({
          ...prevErrors,
          name: 'Please add a pizza name *'
        }))
      }
      if (errors.includes('Please add ingredients about pizza')) {
        setFormErrors(prevErrors => ({
          ...prevErrors,
          ingredients: 'Please add ingredients about pizza *'
        }))
      }
      if (errors.includes('Please provide a price for each size of pizza')) {
        setFormErrors(prevErrors => ({
          ...prevErrors,
          prices: 'Please provide a price for each size of pizza *'
        }))
      }
    }
  }

  return (
    <div className="pizza-form">
      <div className="form-card wider">
        <div className="header">
          <h2>Add Pizza to Menu</h2>
        </div>
        <form className="form">
          <div className="form-control">
            <label htmlFor="name">Pizza Name</label>
            <input
              type="text"
              name="name"
              placeholder="Capricciosa"
              value={formData.name}
              onChange={handleChange}
            />
            {
              formErrors.name && 
                <small className="error-text">{formErrors.name}</small>
            }
          </div>
          <div className="form-control">
            <label htmlFor="ingredients">Ingredients</label>
            <input
              type="text"
              name="ingredients"
              placeholder="Tomato sauce, mozzarella...."
              value={formData.ingredients}
              onChange={handleChange}
            />
            {
              formErrors.ingredients && 
                <small className="error-text">{formErrors.ingredients}</small>
            }
          </div>
          <div className="form-control">
            <label htmlFor="small">Small Size Price</label>
            <input
              type="text"
              name="small"
              placeholder="5.5"
              value={formData.prices[0].price}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="medium">Medium Size Price</label>
            <input
              type="text"
              name="medium"
              placeholder="7.5"
              value={formData.prices[1].price}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="large">Large Size Price</label>
            <input
              type="text"
              name="large"
              placeholder="8"
              value={formData.prices[2].price}
              onChange={handleChange}
            />
            {
              formErrors.prices && 
                <small className="error-text">{formErrors.prices}</small>
            }
          </div>
        </form>
        <div className="card-buttons">
          <button className="card-btn btn-back" onClick={clearForm}>Clear Form</button>
          <button className="card-btn btn-confirm" onClick={onSubmit}>Add Pizza</button>
        </div>
      </div>

      {
        successMessage && (
          <div className="successfully-added-pizza">
            <div className="success-wrapper">
              <img src={tick} alt="Successfully added new pizza to menu" />
              <h1>Successfully added {pizza.name} to menu!</h1>
              <div className="btns">
                <Link to='/' className="card-btn"><span>Home</span></Link>
                <button className="card-btn" onClick={() => setSuccessMessage(false)}>Add another Pizza</button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default PizzaForm