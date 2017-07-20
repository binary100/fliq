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
<<<<<<< HEAD

export const setUserReViewSetting = (userReViewSetting) => {
  return {
    type: 'SET_USER_REVIEW_SETTING',
    payload: { userReViewSetting: userReViewSetting }
  };
};

export const toggleUserReViewSetting = () => {
  return {
    type: 'TOGGLE_USER_REVIEW_SETTING'
  };
};
||||||| merged common ancestors
=======

>>>>>>> feat($launchpad): add route for new users
