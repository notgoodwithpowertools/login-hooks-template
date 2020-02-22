const authReducer = ( (state, action) => {

    console.log('State - before switch:', state)

    switch (action.type) {
      case 'LOGIN':
        console.log("Authreducer: Logging in user ...");
        return {
          ...state,
          uid: action.uid
        }
      case 'SET_USER_ADMIN':
        console.log("Setting user admin flag ...");
        return {
          ...state,
          admin: action.admin
        }
      case 'SET_USER_VERIFIED':
        console.log("Setting user verified flag ...");
        return {
          ...state,
          verified: action.verified
        }
      case 'LOGOUT':
        console.log("Authreducer: Logging out user...");
        return null;
      
      default:
        return state;
    }

})

export { authReducer as default }
