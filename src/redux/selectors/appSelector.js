import { createSelector } from 'reselect'

const localeReducer = state => state.get('localeReducer')
const appReducer = state => state.get('appReducer')
const toastrReducer = state => state.get('toastrReducer')

export const appSelectors = {
  selectLocale: createSelector(localeReducer, state =>
    state.get('locale')
  ),
  selectLoading: createSelector(appReducer, state =>
    state.get('loading')
  ),
  selectCurrentAccount: createSelector(appReducer, state =>
    state.get('account')
  ),
  selectCurrentContract: createSelector(appReducer, state =>
    state.get('contract')
  ),
  selectUser: createSelector(appReducer, state => 
    state.get('user')
  ),
  selectToastr: toastrReducer,
}
