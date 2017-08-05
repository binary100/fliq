const defaultAuthState = {
  isLoggedIn: false,
  user: null
};

const auth = (state = defaultAuthState, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return Object.assign({}, state, {
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user
      });
    case 'USER_LOGOUT':
      return Object.assign({}, state, {
        isLoggedIn: action.payload.isLoggedIn,
        user: null
      });
    case 'CLEAR_WATCHED_MOVIE':
      return Object.assign({}, state, {
        isLoggedIn: state.isLoggedIn,
        user
      });
    default:
      return state;
  }
};

export default auth;
