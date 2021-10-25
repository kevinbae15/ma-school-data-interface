import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import localforage from 'localforage'
import { connect } from 'react-redux'
import { ROUTES } from './routes.js'
import store from '../redux/store'
import history from '../history'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps) {}

  // Can also customize these routes to be protected. See App.js of ten-admin-frontend
  getRoutes() {
    let routes = []

    for (const key of Object.keys(ROUTES)) {
      routes.push(
        <Route
          key={key}
          path={ROUTES[key].path}
          component={ROUTES[key].component}
        />
      )
    }

    return routes
  }

  render() {
    return (
      <div>
        <Switch>{this.getRoutes()}</Switch>
      </div>
    )
  }
}

export default App
