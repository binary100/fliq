import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DashboardUserProfile from '../components/dashboardUserProfile.jsx';
import PieChart from '../components/pieChart.jsx';
import ToggleSwitch from '../components/toggleSwitch.jsx';
import { setUserReViewSetting, toggleUserReViewSetting } from '../actions/actions.js';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.getUserInfo = this.getUserInfo.bind(this);
    this.toggleUserReViewSetting = this.toggleUserReViewSetting.bind(this);
    this.updateUserReViewSetting = this.updateUserReViewSetting.bind(this);
    this.changeUserReViewSetting = this.changeUserReViewSetting.bind(this);
  }

  componentWillMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    return axios.post('/api/dashboard/initialUserSettings', {
      id: this.props.auth.user.id
    })
    .then((userInfo) => {
      const userReViewSetting = userInfo.data.reView;
      this.props.setUserReViewSetting(userReViewSetting);
    })
  }


  toggleUserReViewSetting() {
    this.props.toggleUserReViewSetting();
  }

  updateUserReViewSetting() {
    return axios.post('/api/dashboard/updateUserSettings', {
      id: this.props.auth.user.id,
      reView: this.props.userReViewSetting
    })
  }

  changeUserReViewSetting() {
    this.toggleUserReViewSetting();
    this.updateUserReViewSetting();
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
              changeUserReViewSetting={this.changeUserReViewSetting}
              reViewSetting={this.props.userReViewSetting}
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
  userReViewSetting: state.userSettingsReducer.userReViewSetting
});

const mapDispatchToProps = dispatch => ({
  setUserReViewSetting: (userReViewSetting) => { dispatch(setUserReViewSetting(userReViewSetting)); },
  toggleUserReViewSetting: () => { dispatch(toggleUserReViewSetting()); }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
