import React from 'react'
import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalStore'
import useFormValidation from '../hooks/useFormValidation'
import validateForm from '../helper/validateForm'

const UserDetails = ({ nextStep, prevStep }) => {
  const { userInfo: { name, phone, address } } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()
  const { handleBlur, disabled, errors } = useFormValidation({
    form: 'user-details',
    name,
    phone,
    address
  }, validateForm);

  const handleChange = e => {
    dispatch({
      type: 'ENTER_USER_DETAILS',
      payload: {
        name: e.target.name,
        value: e.target.value
      }
    })
  }

  return (
    <div className="user-details">
      <div className="form-card">
        <div className="header">
          <h2>User Details</h2>
        </div>
        <form className="form">
          <div className="form-control">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Jack"
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {
              errors.name && 
                <small className="error-text">{errors.name}</small>
            }
          </div>
          <div className="form-control">
            <label htmlFor="phone">Phone number</label>
            <input
              type="tel"
              name="phone"
              placeholder="123-456-7890"
              value={phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {
              errors.phone && 
                <small className="error-text">{errors.phone}</small>
            }
          </div>
          <div className="form-control">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              placeholder="New York"
              value={address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {
              errors.address && 
                <small className="error-text">{errors.address}</small>
            }
          </div>
        </form>
        <div className="card-buttons">
          <button className="card-btn btn-back" onClick={prevStep}>Back</button>
          <button className="card-btn btn-confirm" onClick={nextStep} disabled={disabled}>Proceed</button>
        </div>
      </div>
    </div>
  )
}

export default UserDetails