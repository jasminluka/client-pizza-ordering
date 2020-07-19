import React, { useEffect, useRef } from 'react'
import tick from '../img/checkmark.png'

const Alert = ({ alert, setAlert }) => {
  const timeout = useRef()

  useEffect(() => {
    timeout.current = setTimeout(() => setAlert(''), 3000)
    
    return () => {
      clearTimeout(timeout.current);
    }
  }, [alert, setAlert])

  return (
    <div className={`alert ${alert && 'active'}`}>
      <div className="img">
        <img src={tick} alt="Tick" />
      </div>
      <p>{alert}</p>
    </div>
  )
}

export default Alert