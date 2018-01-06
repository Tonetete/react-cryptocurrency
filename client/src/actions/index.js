
import axios from 'axios'
import Cookies from 'js-cookie'
import { AUTH_USER,
  AUTH_ERROR } from './types'

const API_URL = 'http://localhost:3000/api'
const CLIENT_ROOT_URL = 'http://localhost:5000'

export function errorHandler (dispatch, error, type) {
  let errorMessage = ''

  if (error.data.error) {
    errorMessage = error.data.error
  } else if (error.data) {
    errorMessage = error.data
  } else {
    errorMessage = error
  }

  if (error.status === 401) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.'
    })
    // logoutUser()
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    })
  }
}

export function loginUser ({ email, password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/login`, { email, password })
      .then(response => {
        Cookies.set('token', response.data.token, { expires: 1, path: '/' }) // expires after 1 day
        dispatch({ type: AUTH_USER })
        window.location.href = CLIENT_ROOT_URL + '/home'
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR)
      })
  }
}

export function setTotalBenefit (totalBenefit) {
  // selectBook is an ActionCreator, it needs to return an action,
  // an object with a type property.
  return {
    type: 'SET_TOTAL_BENEFIT',
    payload: totalBenefit
  }
}
