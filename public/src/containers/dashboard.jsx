import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DashboardUserProfile from '../components/dashboardUserProfile.jsx';
import PieChart from '../components/pieChart.jsx';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

//container
//row
//column

  render() {
    console.log('In Dashboard render, props is: ', this.props);
    return (
      <div className="container">
        <div className="row">

          <DashboardUserProfile 
            user={this.props.auth.user}
          />

        </div>
        <div>
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
