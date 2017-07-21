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

    this.state = {
      userInfo: null,
      userMoviesInfo: null,
      userTagsInfo: null,
      topTagIdsByUser: null,
      topTagPicksCountsByUser: null
    }

    this.getUserInfo = this.getUserInfo.bind(this);
    this.toggleUserReViewSetting = this.toggleUserReViewSetting.bind(this);
    this.updateUserReViewSetting = this.updateUserReViewSetting.bind(this);
    this.changeUserReViewSetting = this.changeUserReViewSetting.bind(this);
    this.chartTopTagsByUser = this.chartTopTagsByUser.bind(this);
  }

  componentWillMount() {
    this.getUserInfo();
  }


  getUserInfo() {
    return axios.post('/api/dashboard/userInfo', {
      id: this.props.auth.user.id
    })
    .then(responseObj => {
      // console.log('getUserInfo responseObj:', responseObj);

      this.setState({
        userInfo: responseObj.data.userInfo,
        userMoviesInfo: responseObj.data.userMoviesInfo,
        userTagsInfo: responseObj.data.userTagsInfo
      })

      // const userReViewSetting = responseObj.data.userInfo.reView;
      // // console.log(userReViewSetting);
      // this.props.setUserReViewSetting(userReViewSetting);
    })
    .then(() => {
      this.chartTopTagsByUser();
    })
  }

  chartTopTagsByUser() {
    const tagPicksCountCutoff = 1;
    const tagIds = [];
    const tagPicksCounts = [];

    const tagsWithPicksCountGreaterThanCutoff = this.state.userTagsInfo.filter(tagObj => {
      if (tagObj.picksCount > tagPicksCountCutoff) {
        tagIds.push(tagObj.tag_Id);
        tagPicksCounts.push(tagObj.picksCount);
      }
    });

    // console.log('tagIds:', tagIds);
    // console.log('tagPickCounts:', tagPickCounts);

    this.setState({
      topTagIdsByUser: tagIds,
      topTagPicksCountsByUser: tagPicksCounts
    });
  }

  changeUserReViewSetting() {
    this.updateUserReViewSetting()
      .then(() => {
        this.toggleUserReViewSetting();
      })
  }

  toggleUserReViewSetting() {
    this.props.toggleUserReViewSetting();
  }

  updateUserReViewSetting() {
    return axios.post('/api/dashboard/updateUserSettings', {
      id: this.props.auth.user.id,
      reView: !this.props.userReViewSetting
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
              changeUserReViewSetting={this.changeUserReViewSetting}
              reViewSetting={this.props.userReViewSetting}
            />
          </div>
        </div>
        <br></br>
        <div className="row">
          <PieChart
            labels={this.state.topTagIdsByUser}
            data={this.state.topTagPicksCountsByUser}
          />
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
