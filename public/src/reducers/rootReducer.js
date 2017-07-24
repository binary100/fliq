import { combineReducers } from 'redux';
import auth from './loginReducer.js';
import userSettingsReducer from './settingsReducer.js';

const reducer = combineReducers({
  auth,
  userSettingsReducer
});

export default reducer;
