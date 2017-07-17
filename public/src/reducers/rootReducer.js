import { combineReducers } from 'redux';
import auth from './loginReducer.js';

const reducer = combineReducers({
  auth
});

export default reducer;
