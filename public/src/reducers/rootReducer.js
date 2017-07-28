import { combineReducers } from 'redux';
import auth from './loginReducer.js';
import userSettingsReducer from './settingsReducer.js';
import trophyReducer from './trophyReducer.js';
import sideMenuReducer from './sideMenuReducer.js';

const reducer = combineReducers({
  auth,
  trophyReducer,
  userSettingsReducer,
  sideMenuReducer
});

export default reducer;
