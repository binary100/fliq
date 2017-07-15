import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DashboardUserProfile from '../components/dashboardUserProfile.jsx';
import PieChart from '../components/pieChart.jsx';
import ToggleSwitch from '../components/toggleSwitch.jsx';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
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
            <ToggleSwitch/>
            <ToggleSwitch/>
          </div>
          <div className="col-lg-2">
            <ToggleSwitch/>
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
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Dashboard);
