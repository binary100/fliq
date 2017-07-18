import { combineReducers } from 'redux';
import auth from './loginReducer.js';
import toggleUserSettings from './settingsReducer.js';

const reducer = combineReducers({
  auth,
  toggleUserSettings
});

export default reducer;
