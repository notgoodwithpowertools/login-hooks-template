const userReducer = ((state, action) => {

  console.log('userReducer State:', state + ', action:', action)

  switch (action.type) {
    case 'SET_USER':
      return {
        email: action.user.email,
        name: action.user.name,
        uid: action.user.uid,
        imageURL: action.user.imageURL
      }
    case 'SET_USER_ADMIN':
      return {
        ...state,
        admin: action.admin
      }
    case 'LOGOUT':
      return {}
    default:
      return state

  }
})

export { userReducer as default }
