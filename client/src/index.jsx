import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import 'semantic-ui-css/semantic.min.css'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom'
import reduxThunk from 'redux-thunk'
import Cookies from 'js-cookie'
import routes from './routes'
import reducers from './reducers/index'
import { AUTH_USER } from './actions/types'
import { rootEpic } from './epics'

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(reduxThunk, createEpicMiddleware(rootEpic))
))

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
