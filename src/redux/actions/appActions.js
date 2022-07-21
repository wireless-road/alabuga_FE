
import { actions as toastrActions } from 'react-redux-toastr'
import {
  SHOW_LOADING,
  HIDE_LOADING,
  SET_HEADER_TEXT,
  SET_CURRENT_ACCOUNT,
  SET_CURRENT_CONTRACT,
  SET_USER
} from '../constants/appActions'
import {
  DEFAULT_TOAST_OPTIONS as defaultToastOptions,
  GENERAL_ERROR_MESSAGE as generalErrorMessage
} from '../../constants/common'

export function showLoading() {
  return dispatch => {
    dispatch({
      type: SHOW_LOADING
    })
  }
}

export function hideLoading() {
  return dispatch => {
    dispatch({
      type: HIDE_LOADING
    })
  }
}

export function setHeaderText(text) {
  return dispatch => {
    dispatch({
      type: SET_HEADER_TEXT,
      headerText: text
    })
  }
}

export function showSuccessNotification(title, message, options = {}) {
  return toastrActions.add({
    type: 'success',
    title: title || 'Success!!!',
    message,
    options: { ...defaultToastOptions, ...options },
  })
}

export function showErrorNotification(
  error,
  options = {},
  useGeneralErrorMessage = generalErrorMessage
) {
  return toastrActions.add({
    type: 'error',
    // title: title || 'Error!!!',
    message: error && error.toString ? error.toString() : (error || useGeneralErrorMessage),
    options: { ...defaultToastOptions, timeOut: 10000, ...options },
  })
}

export function setCurrentAccount(account) {
  return dispatch => {
    dispatch({
      type: SET_CURRENT_ACCOUNT,
      account
    })
  }
}

export function setCurrentContract(contract) {
  return dispatch => {
    dispatch({
      type: SET_CURRENT_CONTRACT,
      contract
    })
  }
}

export function setUser(user) {
  return dispatch => {
    dispatch({
      type: SET_USER,
      user
    })
  }
}
