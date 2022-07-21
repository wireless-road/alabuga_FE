import { createSelector } from 'reselect'

const chatReducer = state => state.get('chatReducer')

export const chatSelectors = {
  selectChatChannelsFetching: createSelector(chatReducer, state =>
    state.getIn(['chatChannels', 'fetching'])
  ),
  selectChatChannels: createSelector(chatReducer, state =>
    (state.getIn(['chatChannels', 'data']) || [])
  ),
  selectAllChatChannels: createSelector(chatReducer, state =>
    (state.getIn(['chatChannels', 'allData']) || [])
  ),
  selectChatMessagesFetching: createSelector(chatReducer, state =>
    state.getIn(['chatMessages', 'fetching'])
  ),
  selectChatMessages: createSelector(chatReducer, state =>
    (state.getIn(['chatMessages', 'data']) || {})
  ),
  selectChatUsersFetching: createSelector(chatReducer, state =>
    state.getIn(['chatUsers', 'fetching'])
  ),
  selectChatUsers: createSelector(chatReducer, state =>
    (state.getIn(['chatUsers', 'data']) || {})
  ),
}
