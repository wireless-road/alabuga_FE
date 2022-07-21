import { fromJS } from 'immutable'

import { createReducer } from '../../utils/reduxHelpers'
import {
  SHOW_LOADING, HIDE_LOADING, SET_CURRENT_ACCOUNT, SET_CURRENT_CONTRACT, SET_USER
} from '../constants/appActions'

const initialState = fromJS({
  loading: false,
  account: null,
  user: null,
  isLoggedOut: false
})

const showLoading = state => {
  return state.set('loading', true)
}

const hideLoading = state => {
  return state.set('loading', false)
}

const setCurrentAccount = (state, action) => {
  return state.set('account', action.account)
}

const setCurrentContract = (state, action) => {
  return state.set('contract', action.contract)
}

const setUser = (state, action) => {
  return state.set('user', action.user)
}

export default createReducer(initialState, {
  [SHOW_LOADING]: showLoading,
  [HIDE_LOADING]: hideLoading,
  [SET_CURRENT_ACCOUNT]: setCurrentAccount,
  [SET_CURRENT_CONTRACT]: setCurrentContract,
  [SET_USER]: setUser
})
