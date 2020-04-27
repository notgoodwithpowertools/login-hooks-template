const itemsReducer = ((state, action) => {

  console.log('itemsReducer State:', state + ', action:', action)

  switch (action.type) {
    case 'SET_CAT1_LIST':
      return {
        ...state,
        cat1List: action.cat1
      }
    case 'SET_CAT1_SELECTED':
      return {
        ...state,
        selected: action.selected
      }
    default:
      return state

  }
})

export { itemsReducer as default }
