import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router/immutable'
import { Provider as ReduxProvider } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'

import App from './views/App'
import { appSelectors } from './redux/selectors/appSelector'

const Root = ({ store, history }) => {

  return (
    <ReduxProvider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
      <ReduxToastr
        getState={appSelectors.selectToastr} // This is the default
        newestOnTop={false}
        position="bottom-right"
        transitionIn="bounceIn"
        transitionOut="fadeOut"
      />
    </ReduxProvider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default Root
