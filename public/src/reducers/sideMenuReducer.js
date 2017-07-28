const defaultSettingsState = {
  showSideMenu: false
};

export default function sideMenuReducer(state = defaultSettingsState, action) {
  switch (action.type) {
    case 'CLOSE_SIDE_MENU':
      return Object.assign({}, state, {
        showSideMenu: action.payload
      });
    case 'TOGGLE_SIDE_MENU':
      return Object.assign({}, state, {
        showSideMenu: !state.showSideMenu
      });
    default:
      return state;
  }
};
