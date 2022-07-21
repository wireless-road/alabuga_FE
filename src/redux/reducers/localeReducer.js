import { fromJS } from 'immutable'

import { createReducer } from '../../utils/reduxHelpers'
import { CHANGE_LOCATE_SUCCESS } from '../constants/appActions'

const initialState = fromJS({
  locale: 'en'
})

const changeLocale = (state, action) => {
  return state.set('locale', action.value)
}

export default createReducer(initialState, {
  [CHANGE_LOCATE_SUCCESS]: changeLocale
})
