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
    default:
      return state;
  }
};
