import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DashboardUserProfile from '../components/dashboardUserProfile.jsx';
import PieChart from '../components/pieChart.jsx';
import ToggleSwitch from '../components/toggleSwitch.jsx';
import { toggleUserReviewSetting } from '../actions/actions.js';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.userReviewToggle = this.userReviewToggle.bind(this);
  }

  componentWillMount() {
    this.getUserInfo();
  }

  userReviewToggle() {
    this.props.toggleUserReviews(this.props.displayUserReviews);
  }

  getUserInfo() {
    return axios.post('/api/dashboard/initialUserSettings', {
      user_id: this.props.auth.user.id
    })
    .then((userInfo) => {
      const userReviewSetting = userInfo.data.reView;
    })
  }

  updateUserReviewSetting() {
    return axios.post('/api/dashboard/updateUserSettings', {
      user_id: this.props.auth.user.id,
      // reView: this.props.
    })
  }

  render() {
    console.log('In Dashboard render, props is: ', this.props);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <DashboardUserProfile
              user={this.props.auth.user}
            />
            <br></br>
            <ToggleSwitch
              toggleUserReview={this.userReviewToggle}
              review={this.props.setUserReviewSetting}
            />
          </div>
        </div>
        <br></br>
        <div className="row">
          <PieChart/>
          <PieChart/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  displayUserReviews: state.userSettingsReducer.displayUserReviews,
  setUserReviewSetting: state.userSettingsReducer.setUserReviewSetting
});

const mapDispatchToProps = dispatch => ({
  toggleUserReviews: (shouldDisplayReviews) => { dispatch(toggleUserReviewSetting(shouldDisplayReviews)); },
  setUserReviewSetting: (userReviewSetting) => { dispatch(setUserReviewSetting(userReviewSetting)); }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

// const WrapComponentInRedux = connect(
//   mapStateToProps,
//   null
// );
//
// const ReduxDashboard = WrapComponentInRedux(Dashboard);
//
// export default ReduxDashboard;
