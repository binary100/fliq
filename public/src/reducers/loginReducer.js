const defaultAuthState = {
  isLoggedIn: false,
  user: null
};

const auth = (state = defaultAuthState, action) => {
  console.log('Entering loginReducer with state: ', state);
  switch (action.type) {
    case 'USER_LOGIN':
      console.log('Case: USER_LOGIN, Payload: ', action.payload);
      return Object.assign({}, state, {
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user
      });
    default:
      return state;
  }
};

export default auth;
