import { createSelector } from 'reselect'

const commonReducer = state => state.get('commonReducer')

export const commonSelectors = {
  selectExchangeRatesFetching: createSelector(commonReducer, state =>
    state.getIn(['exchangeRates', 'fetching'])
  ),
  selectExchangeRates: createSelector(commonReducer, state =>
    (state.getIn(['exchangeRates', 'data']) || {})
  ),
}
