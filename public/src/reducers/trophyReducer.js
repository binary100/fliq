const defaultTrophyState = {
  show: false,
  trophies: []
};

const trophyReducer = (state = defaultTrophyState, action) => {
  switch (action.type) {
    case 'SHOW_TROPHY_POPDOWN':
      return Object.assign({}, state, {
        show: true,
        trophies: action.payload.trophies
      });
    case 'CLOSE_TROPHY_POPDOWN':
      return Object.assign({}, state, {
        show: false
      });
    default:
      console.log('Returning default trophy state: ', state);
      return state;
  }
};

export default trophyReducer;
