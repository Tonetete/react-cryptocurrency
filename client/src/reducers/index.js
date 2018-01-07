import { combineReducers } from 'redux'
import totalBenefit from './reducer_total_benefit'
import authReducer from './reducer_auth'
import { coinsUserReducer } from './reducer_coins'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  totalBenefit,
  auth: authReducer,
  form: formReducer,
  coinsUser: coinsUserReducer
})

export default rootReducer
