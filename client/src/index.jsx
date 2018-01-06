import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
// import App from './App'
import './public/styles/bootstrap/css/bootstrap.min.css'
import React from 'react'
// import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom'
import reduxThunk from 'redux-thunk'
import Cookies from 'js-cookie'
import routes from './routes'
import reducers from './reducers/index'
import { AUTH_USER } from './actions/types'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

const token = Cookies.get('token')

if (token) {
  // Update application state. User has token and is probably authenticated
  store.dispatch({ type: AUTH_USER })
}

const root = document.getElementById('root')
const load = () => render((
  <AppContainer>
    <Provider store={store}>
      <Router>
        {routes}
      </Router>
    </Provider>
  </AppContainer>
), root)

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept('./App', load)
}

load()
