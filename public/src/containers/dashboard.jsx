import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DashboardUserProfile from '../components/dashboardUserProfile.jsx';
import PieChart from '../components/pieChart.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('In dashboard render, props is: ', this.props);
    return (
      <div>
        <div>
          <DashboardUserProfile
            user={this.props.auth.user}
          />
          <pieChart/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Dashboard);
