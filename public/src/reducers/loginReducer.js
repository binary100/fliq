const login = (state = {isLoggedIn: false}, action) => {
  console.log('Entering loginReducer with state: ', state);
  switch (action.type) {
    case 'LOGIN_FACEBOOK':
      console.log('State is: ', state);
      return Object.assign({}, state, { isLoggedIn: action.payload });
    case 'LOGIN_GOOGLE':
      return Object.assign({}, state, { isLoggedIn: action.payload });
    default:
      return state;
  }
};

export default login;
