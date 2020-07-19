import React, { useState } from 'react'
import CartContainer from '../components/CartContainer'
import UserDetails from '../components/UserDetails'
import Confirm from '../components/Confirm'
import Success from '../components/Success'
import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalStore'

const Cart = () => {
  const [successMessage, setSuccessMessage] = useState('')

  const { step } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()

  const nextStep = () => {
    dispatch({ type: 'NEXT_STEP' })
  }

  const prevStep = () => {
    dispatch({ type: 'PREV_STEP' })
  }

  switch (step) {
    case 1:
      return (
        <CartContainer nextStep={nextStep} />
      )
    case 2:
      return (
        <UserDetails nextStep={nextStep} prevStep={prevStep} />
      )
    case 3:
      return (
        <Confirm nextStep={nextStep} prevStep={prevStep} setSuccessMessage={setSuccessMessage} />
      )
    case 4:
      return (
        <Success successMessage={successMessage} />
      )
    default:
      return 'Nothing'
  }
}

export default Cart