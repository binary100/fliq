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
    console.log('In Dashboard render, props is: ', this.props);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <DashboardUserProfile
              user={this.props.auth.user}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <PieChart/>
          </div>
          <div className="col-md-6">
            <PieChart/>
          </div>
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
