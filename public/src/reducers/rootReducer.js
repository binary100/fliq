import { combineReducers } from 'redux';
import auth from './loginReducer.js';
<<<<<<< HEAD
import toggleUserSettings from './settingsReducer.js';

const reducer = combineReducers({
  auth,
  toggleUserSettings
=======
import userSettingsReducer from './settingsReducer.js';

const reducer = combineReducers({
  auth,
  userSettingsReducer
>>>>>>> userDashboardBackEnd
});

export default reducer;
