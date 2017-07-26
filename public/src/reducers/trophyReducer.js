const defaultTrophyState = {
  show: false,
  trophies: []
};

const trophyReducer = (state = defaultTrophyState, action) => {
  switch (action.type) {
    case 'SHOW_TROPHY_POPDOWN':
      return Object.assign({}, state, {
        show: true,
        trophies: action.payload
      });
    case 'CLOSE_TROPHY_POPDOWN':
      return Object.assign({}, state, {
        show: false
      });
    default:
      return state;
  }
};

export default trophyReducer;
