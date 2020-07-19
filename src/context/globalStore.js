import React, { createContext, useReducer, useCallback, useContext } from 'react'
import axios from 'axios'
import setAuthToken from '../helper/setAuthToken'

const GlobalStateContext = createContext({})
const GlobalDispatchContext = createContext({})

// Reducer
const globalReducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        order: {
          ...state.order,
          [payload.pizza]: {...state.order[payload.pizza] || {},
            price: payload.price,
            amount: state.order[payload.pizza] ? state.order[payload.pizza].amount + 1 : 1,
            total: state.order[payload.pizza] ? state.order[payload.pizza].total + payload.price : payload.price
          }
        }
      }
    case 'REMOVE_FROM_CART': {
      const { [payload]: _, ...order } = state.order
      return {
        ...state,
        // order: Object.fromEntries(Object.entries(state.order).filter(([order]) => order !== payload ))
        order
      }
    }
    case 'CLEAR_CART':
      return {
        ...state,
        order: {}
      }
    case 'INCREASE_AMOUNT':
      return {
        ...state,
        order: {
          ...state.order,
          [payload]: {
            ...state.order[payload],
            amount: state.order[payload].amount + 1,
            total: state.order[payload].total + state.order[payload].price
          }
        }
      }
    case 'DECREASE_AMOUNT':
      return {
        ...state,
        order: {
          ...state.order,
          [payload]: {
            ...state.order[payload],
            amount: state.order[payload].amount - 1,
            total: state.order[payload].total - state.order[payload].price
          }
        }
      }
    case 'GET_TOTAL_PRICE':
      return {
        ...state,
        totalPrice: {
          euro: Object.values(state.order).map((order) => order.total).reduce((a, b) => a + b, 0),
          dollar: (Object.values(state.order).map((order) => order.total).reduce((a, b) => a + b, 0)) * 1.14
        }
      }
    case 'ENTER_USER_DETAILS':
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          [payload.name]: payload.value
        }
      }
    case 'CLEAR_USER_DETAILS':
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          phone: '',
          address: ''
        }
      }
    case 'NEXT_STEP':
      return {
        ...state,
        step: state.step + 1
      }
    case 'PREV_STEP':
      return {
        ...state,
        step: state.step - 1
      }
    case 'RESET_STEP':
      return {
        ...state,
        step: 1
      }
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', payload)
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          token: payload,
          isAuthenticated: true
        }
      }
    case 'LOAD_USER':
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          name: payload.name
        },
        loggedUser: {
          ...state.loggedUser,
          isAuthenticated: true,
          user: payload
        }
      }
    case 'AUTH_ERROR':
      localStorage.removeItem('token')
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          token: null,
          isAuthenticated: false
        }
      }
    case 'LOGOUT':
      localStorage.removeItem('token')
      return {
        ...state,
        order: {},
        totalPrice: {
          euro: 0,
          dollar: 0
        },
        userInfo: {
          name: '',
          phone: '',
          address: ''
        },
        step: 1,
        loggedUser: {
          token: localStorage.getItem('token'),
          isAuthenticated: false,
          user: {}
        },
        myOrders: []
      }
    case 'GET_PIZZAS':
      return {
        ...state,
        pizzas: payload
      }
    case 'DELETE_PIZZA':
      return {
        ...state,
        pizzas: state.pizzas.filter(pizza => pizza._id !== payload)
      }
    case 'GET_ORDERS':
      return {
        ...state,
        myOrders: payload
      }
    default: 
      return state
  }
}

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, {
    order: {},
    totalPrice: {
      euro: 0,
      dollar: 0
    },
    userInfo: {
      name: '',
      phone: '',
      address: ''
    },
    step: 1,
    loggedUser: {
      token: localStorage.getItem('token'),
      isAuthenticated: false,
      user: {}
    },
    pizzas: [],
    myOrders: []
  })

  const loadUser = useCallback(async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    try {
      const res = await axios.get('/api/auth/me')
  
      dispatch({ type: 'LOAD_USER', payload: res.data.data })
    }
    catch (err) {
      dispatch({ type: 'AUTH_ERROR' })
    }
  }, [])

  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={{
        ...state,
        loadUser
      }}>
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  )
}

// Custon hooks to use dispatch and state
export const useGlobalStateContext = () => useContext(GlobalStateContext)
export const useGlobalDispatchContext = () => useContext(GlobalDispatchContext)

// WE DONT WANT TO SAVE ORDERS LIKE THIS IN ARRAY
// const orders = [
//   {
//     name: 'capricciosa',
//     size: 'small',
//     price: 5
//   },
//   {
//     name: 'capricciosa',
//     size: 'small',
//     price: 5
//   },{
//     name: 'capricciosa',
//     size: 'large',
//     price: 7
//   },
// ]


// WE WANT ORDER TO BE SAVED LIKE THIS OBJECT
// ONLY CHANGE AMOUNT ANT TOTAL PRICE WHEN ITS THE SAME ORDER
// const order = {
//   'small Capricciosa': {
//     price: 5,
//     amount: 2,
//     total: 10
//   },
//   'large Capricciosa': {
//     price: 7,
//     amount: 1,
//     total: 7
//   }
// }