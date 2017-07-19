<<<<<<< HEAD
import { toggleUserReviewSetting } from '../actions/actions.js';

const defaultSettingsState = {
  displayUserReviews: false
};

export default function toggleUserSettings(state = defaultSettingsState, action) {
  switch (action.type) {
    case 'TOGGLE_USER_REVIEW_SETTING':
      return Object.assign({}, state, {
        displayUserReviews: action.payload.displayUserReviews
      });
=======
import { setUserReViewSetting, toggleUserReViewSetting } from '../actions/actions.js';

const defaultSettingsState = {
  userReViewSetting: false
};

export default function userSettingsReducer(state = defaultSettingsState, action) {
  switch (action.type) {
    case 'SET_USER_REVIEW_SETTING':
      return Object.assign({}, state, {
        userReViewSetting: action.payload.userReViewSetting
      });
    case 'TOGGLE_USER_REVIEW_SETTING':
      console.log('state.userReViewSetting', state.userReViewSetting);
      return Object.assign({}, state, {
        userReViewSetting: !state.userReViewSetting
      });

>>>>>>> userDashboardBackEnd
    default:
      return state;
  }
};
