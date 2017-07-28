export const loginUser = (user) => {
  return {
    type: 'USER_LOGIN',
    payload: { isLoggedIn: true, user }
  };
};

export const logoutUser = () => {
  return {
    type: 'USER_LOGOUT',
    payload: { isLoggedIn: false }
  };
};

export const clearMovie = () => {
  return {
    type: 'CLEAR_WATCHED_MOVIE',
    payload: {
      watchedMovieTitle: null,
      watchedMovieId: null
    }
  };
};

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

export const showTrophyPopdown = trophies => ({
  type: 'SHOW_TROPHY_POPDOWN',
  payload: trophies
});

export const closeTrophyPopdown = () => ({
  type: 'CLOSE_TROPHY_POPDOWN'
});

export const closeSideMenu = () => ({
  type: 'CLOSE_SIDE_MENU',
  payload: false
});

export const toggleSideMenu = () => ({
  type: 'TOGGLE_SIDE_MENU',
  payload: false
});

