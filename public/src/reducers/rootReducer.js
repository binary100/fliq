import { combineReducers } from 'redux';
import auth from './loginReducer.js';
import userSettingsReducer from './settingsReducer.js';
import trophyReducer from './trophyReducer.js';

const reducer = combineReducers({
  auth,
  trophyReducer,
  userSettingsReducer
});

export default reducer;
