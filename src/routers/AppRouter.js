import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import LoginPage from '../components/LoginPage'
import TripDashboardPage from '../components/TripDashboardPage'
import NotFoundPage from '../components/NotFoundPage'
import ScheduleDashboardPage from '../components/ScheduleDashboardPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export const history = createBrowserHistory()

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={TripDashboardPage} />
        <PrivateRoute path="/schedule/:id" component={ScheduleDashboardPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter