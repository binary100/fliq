const defaultSettingsState = {
  showSideMenu: false,
  hamburgerClass: 'hamburger'
};

export default function sideMenuReducer(state = defaultSettingsState, action) {
  switch (action.type) {
    case 'CLOSE_SIDE_MENU':
      return Object.assign({}, state, {
        showSideMenu: action.payload.showSideMenu,
        hamburgerClass: 'hamburger hamburger-closed'
      });
    case 'TOGGLE_SIDE_MENU':
      const hamburgerClass = !state.showSideMenu ? 'hamburger hamburger-open' : 'hamburger hamburger-closed';
      return Object.assign({}, state, {
        showSideMenu: !state.showSideMenu,
        hamburgerClass
      });
    default:
      return state;
  }
};
