import { useState, useEffect } from 'react'

const useFormValidation = (values, validate) => {
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true)
  const [isFirstRender, setIsFirstRender] = useState(true)

  useEffect(() => {
    setErrors({})
    setIsFirstRender(true)
  }, [values.registerActive])

  // Set disabled to true on first render and if errors and set disabled to false otherwise
  useEffect(() => {
    if ((Object.keys(errors).length === 0 && isFirstRender) || (Object.keys(errors).length !== 0)) {
      setDisabled(true)
    }
    else {
      setDisabled(false)
    }
  }, [errors, isFirstRender])

  const handleBlur = () => {
    const validationErrors = validate(values)
    setErrors(validationErrors)
    setIsFirstRender(false)
  }

  return {
    handleBlur,
    disabled,
    errors
  }
}

export default useFormValidation