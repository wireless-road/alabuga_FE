import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Route, withRouter, useHistory } from 'react-router-dom'

import ScrollToView from '../ScrollToView'
import Forbidden from '../../../views/Forbidden'
import { cookie } from '../../../utils'
import { pathKeys } from '../../../constants'

import {appSelectors} from "../../../redux/selectors/appSelector";
import {connect} from "react-redux";
import * as clientActions from '../../../redux/actions/clientActions'

export const ProtectedRoute = props => {
  const { history, component: Component, path, location, userTypes, exact, user, getUser,  ...rest } = props
  const routerHistory = useHistory()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  let isAuthorized = true

  useEffect(() => {
    const token = cookie.getToken()
    if (!token) {
      window.location.href = pathKeys.LOGIN
    } else {
      setIsAuthenticated(true)
      if (!user)
        getUser(cookie.getUserId())
    }
  }, [path, location])
  
  let GuardedComp = null
  if (isAuthenticated === true) {
    GuardedComp = isAuthorized ? Component : Forbidden
  }
  const { lastState = {}, currentState = {} } = location.state || {}
  const render = props => (
    <>
      <ScrollToView />
      {GuardedComp && <GuardedComp {...props} lastRouteState={lastState} currentRouteState={currentState} />}
    </>
  )

  return (
    <div className="protected-route-wrapper" key={path}>
      <Route exact={exact} path={path} render={render} {...rest} />
    </div>
  )
}

ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType, PropTypes.func])
    .isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    state: PropTypes.instanceOf(Object),
  }).isRequired,
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  history: PropTypes.instanceOf(Object),
  exact: PropTypes.bool
}

const mapStateToProps = state => ({
  user: appSelectors.selectUser(state)
})

const mapDispatchToProps = {
  getUser: clientActions.getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProtectedRoute))
