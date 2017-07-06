const login = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_FACEBOOK':
      return Object.assign(state, { isLoggedIn: action.payload });
    case 'LOGIN_GOOGLE':
      return Object.assign(state, { isLoggedIn: action.payload });
    default:
      return state;
  }
};

export default login;
