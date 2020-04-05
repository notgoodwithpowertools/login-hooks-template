const authReducer = ( (state, action) => {

    console.log('State - before switch:', state)

    switch (action.type) {
      case 'LOGIN':
        console.log("Authreducer: Logging in user ...");
        return {
          ...state,
          uid: action.uid
        }
      case 'LOGOUT':
        console.log("Authreducer: Logging out user...");
        return null;
      
      default:
        return state;
    }

})

export { authReducer as default }
