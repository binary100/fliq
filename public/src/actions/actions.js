export const loginUser = (user) => {
  console.log('Setting logged in state with: ', user);
  return {
    type: 'USER_LOGIN',
    payload: { isLoggedIn: true, user }
  };
};

export const logoutUser = () => {
  console.log('Removing logged in state.');
  return {
    type: 'USER_LOGOUT',
    payload: { isLoggedIn: false }
  };
};

