import { createSelector } from 'reselect'

const adminReducer = state => state.get('adminReducer')

export const adminSelectors = {
  selectClientAccountsFetching: createSelector(adminReducer, state =>
    state.getIn(['clientAccounts', 'fetching'])
  ),
  selectClientAccounts: createSelector(adminReducer, state =>
    (state.getIn(['clientAccounts', 'data']))
  ),
  selectUsersFetching: createSelector(adminReducer, state =>
    state.getIn(['users', 'fetching'])
  ),
  selectUsers: createSelector(adminReducer, state =>
    (state.getIn(['users', 'data']))
  ),
  selectUsersStatisticFetching: createSelector(adminReducer, state =>
    state.getIn(['users_statistic', 'fetching'])
  ),
  selectUsersStatistic: createSelector(adminReducer, state =>
    (state.getIn(['users_statistic', 'data']))
  ),
  selectContractsFetching: createSelector(adminReducer, state =>
    state.getIn(['contracts', 'fetching'])
  ),
  selectContracts: createSelector(adminReducer, state =>
    (state.getIn(['contracts', 'data']))
  ),
}
