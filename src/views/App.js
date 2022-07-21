import React, { useEffect } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as Sentry from '@sentry/react'
import { I18nextProvider } from 'react-i18next'
import { Scrollbars } from 'react-custom-scrollbars'

import { Loading, ProtectedRoute } from '../components/commons'
import { pathKeys } from '../constants'
import { appSelectors } from '../redux/selectors/appSelector'

import i18next from '../translations/i18next'

import {
  ClientContainer,
  AccountantContainer,
  Login,
  ForgotPassword,
  ResetPassword,
  NotFound
} from '.'

const App = props => {
  const {
    user
  } = props
  const routerHistory = useHistory()
  const { pathname } = useLocation()
  const isAccountant = user?.accounts && user?.accounts[0].role.name === 'AA'

  useEffect(() => {
    if (user) {
      if (isAccountant && !pathname.includes(pathKeys.ACCOUNTANT))
        routerHistory.replace(pathKeys.ACCOUNTANT)
      else if (!isAccountant && pathname.includes(pathKeys.ACCOUNTANT))
        routerHistory.replace(pathKeys.CUSTOMER)
    }
  }, [routerHistory, user])

  const renderScrollBarsTrackHorizontal = props => <div {...props} className="track-horizontal" style={{ display:'none' }} />
  const renderScrollBarsThumbHorizontal = props => <div {...props} className="thumb-horizontal" style={{ display:'none' }} />

  return (
    <I18nextProvider i18n={i18next}>
      <Loading loading={props.loading} />
      <div className="main">
        <div className="content-wrapper">
          <Scrollbars
            renderTrackHorizontal={renderScrollBarsTrackHorizontal}
            renderThumbHorizontal={renderScrollBarsThumbHorizontal}
            autoHide
          >
            <Switch>
              <Route path={pathKeys.LOGIN} component={Login} />
              <Route path={pathKeys.FORGOT_PASSWORD} component={ForgotPassword} />
              <Route path={pathKeys.RESET_PASSWORD} component={ResetPassword} />
              {isAccountant ? (
                <ProtectedRoute path={pathKeys.ACCOUNTANT} component={AccountantContainer} />
              ) : (
                <ProtectedRoute path={pathKeys.CUSTOMER} component={ClientContainer} />
              )}
              <Route component={NotFound} />
            </Switch>
          </Scrollbars>
        </div>
      </div>
    </I18nextProvider>
  )
}

const mapStateToProps = state => ({
  locale: appSelectors.selectLocale(state),
  loading: appSelectors.selectLoading(state),
  user: appSelectors.selectUser(state),
})

const mapDispatchToProps = {}

App.propTypes = {
  locale: PropTypes.string,
  loading: PropTypes.bool,
}

App.defaultProps = {
  locale: '',
  loading: false,
}

export default connect(mapStateToProps, mapDispatchToProps)(Sentry.withProfiler(App))
