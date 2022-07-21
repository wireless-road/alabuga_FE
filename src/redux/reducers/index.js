import { combineReducers } from 'redux-immutable'
import { connectRouter } from 'connected-react-router/immutable'
import { reducer as toastrReducer } from 'react-redux-toastr'

import appReducer from './appReducer'
import localeReducer from './localeReducer'
import clientReducer from './clientReducer'
import accountantReducer from './accountantReducer'

const rootReducer = history =>
  combineReducers({
      router: connectRouter(history),
      toastrReducer,
      localeReducer,
      appReducer,
      clientReducer,
      accountantReducer
  })

export default rootReducer
