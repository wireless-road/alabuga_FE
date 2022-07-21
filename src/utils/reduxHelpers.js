export const createReducer = (initialState, handlersMap) => (
  state = initialState,
  action
) => {
  const handler = handlersMap[action.type]
  if (!handler || typeof handler !== 'function') {
    return state
  }
  return handler(state, action)
}

export const updateItemInArray = (array, itemId, updateItemCallback) => {
  const updatedItems = array.map(item => {
    if (item.id !== itemId) {
      // Since we only want to update one item, preserve all others as they are now
      return item
    }

    // Use the provided callback to create an updated item
    const updatedItem = updateItemCallback(item)
    return updatedItem
  })
  
  return updatedItems
}

export const removeItemsInArray = (array = [], itemIds = []) => {
  const updatedItems = array.reduce((updatedItems, item) => {
    return itemIds.includes(item.id) ? updatedItems : [...updatedItems, item]
  }, [])
  return updatedItems
}
