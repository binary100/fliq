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

  userReviewToggle() {
    console.log('Entering userReviewToggle wirh props: ', this.props);
    this.props.toggleUserReviews(this.props.displayUserReviews);
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
              review={this.props.displayUserReviews}
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
  displayUserReviews: state.userSettingsReducer.displayUserReviews
});

const mapDispatchToProps = dispatch => ({
  toggleUserReviews: (shouldDisplayReviews) => { dispatch(toggleUserReviewSetting(shouldDisplayReviews)); }
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
