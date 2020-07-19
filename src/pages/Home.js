import React, { useState } from 'react'
import Alert from '../components/Alert'
import Header from '../components/Header'
import PizzaMenu from '../components/PizzaMenu'

const Home = () => {
  const [alert, setAlert] = useState('')

  return (
    <>
      <Alert alert={alert} setAlert={setAlert} />
      <Header />
      <PizzaMenu setAlert={setAlert} />
    </>
  )
}

export default Home
