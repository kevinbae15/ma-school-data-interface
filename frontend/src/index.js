import '@babel/polyfill'
import './index.css'

import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import store from './redux/store'
import registerServiceWorker from './registerServiceWorker'
import App from './Components/App'
import history from './history'

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept()
}

registerServiceWorker()
