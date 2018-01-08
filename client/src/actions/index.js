
import axios from 'axios'
import API from '../services/api'
import { formatNumber } from '../functions/utils'
import Cookies from 'js-cookie'
import { AUTH_USER,
  AUTH_ERROR,
  GET_COINS_USER,
  UNAUTH_USER,
  SET_TOTAL_BENEFIT } from './types'

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

  if (error.status === 401 || error.status === 403) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.'
    })
    logoutUser(dispatch)
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    })
  }
}

export function logoutUser (dispatch) {
  dispatch({ type: UNAUTH_USER })
  Cookies.remove('token', { path: '/' })
  window.location.href = CLIENT_ROOT_URL + '/login'
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

export function getCoinsUser () {
  return function (dispatch) {
    axios.post(`${API_URL}/coins/getCoinsUser`, { }, {
      headers: { authorization: Cookies.get('token') }
    })
      .then(response => {
        const api = new API()
        api.getCoinValues(response.data.coins).then(values => {
          let totalBenefitEUR = 0
          let totalBenefitUSD = 0
          let listCoins = values.map((coin) => {
            const coinUser = response.data.coins.filter((c) => c.name === coin[0].id)
            totalBenefitEUR += coinUser[0].quantity * coin[0].price_eur
            totalBenefitUSD += coinUser[0].quantity * coin[0].price_usd
            return {
              id: coin[0].id,
              rank: coin[0].rank,
              name: coin[0].name,
              symbol: coin[0].symbol,
              market_cap_usd: formatNumber(coin[0].market_cap_usd),
              price_usd: formatNumber(coin[0].price_usd),
              price_eur: formatNumber(coin[0].price_eur),
              '24h_volume_usd': formatNumber(coin[0]['24h_volume_usd']),
              percent_change_24h: coin[0].percent_change_24h,
              available_supply: formatNumber(coin[0].available_supply),
              quantity: coinUser[0].quantity,
              usdValue: formatNumber(coinUser[0].quantity * coin[0].price_usd),
              eurValue: formatNumber(coinUser[0].quantity * coin[0].price_eur)
            }
          })
          dispatch({ type: GET_COINS_USER, payload: listCoins })
          setTotalBenefit({
            totalBenefitEUR: formatNumber(totalBenefitEUR),
            totalBenefitUSD: formatNumber(totalBenefitUSD)
          }, dispatch)
        })
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR)
      })
  }
}

export function setTotalBenefit (totalBenefit, dispatch) {
  // selectBook is an ActionCreator, it needs to return an action,
  // an object with a type property.
  dispatch({
    type: SET_TOTAL_BENEFIT,
    payload: totalBenefit
  })
}
