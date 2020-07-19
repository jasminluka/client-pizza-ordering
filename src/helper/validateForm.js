export default ({ form, name, phone, address, email, password, registerActive }) => {
  let errors = {}

  switch (form) {
    case 'login-register': {
      if (!email) {
        errors.email = 'Email is required!'
      }
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        errors.email = 'Invalid email address!'
      }
      
      if (!password) {
        errors.password = 'Password is required!'
      }
      else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters long!'
      }

      if (registerActive) {
        if (!name) {
          errors.name = 'Name is required!'
        }
      }

      return errors
    }

    case 'user-details': {
      if (!name) {
        errors.name = 'Name is required!';
      }
    
      if (!phone) {
        errors.phone = 'Phone is required!';
      }
      
      if (!address) {
        errors.address = 'Address is required!';
      }

      return errors
    }

    default:
      return errors
  }
}