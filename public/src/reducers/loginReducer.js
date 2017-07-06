const login = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_FACEBOOK':
      return Object.assign(state, { isLoggedIn: true });
    case 'LOGIN_GOOGLE':
      return Object.assign(state, { isLoggedIn: true });
    default:
      return state;
  }
};

export default login;
