import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DashboardUserProfile from '../components/dashboardUserProfile.jsx';
import PieChart from '../components/pieChart.jsx';
import BarChart from '../components/barChart.jsx';
import ToggleSwitch from '../components/toggleSwitch.jsx';
import { setUserReViewSetting, toggleUserReViewSetting } from '../actions/actions.js';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // raw data for charts
      userInfo: null,
      userMoviesInfo: null,
      userTagsInfo: null,
      tagsTableData: null,

      // chart data for most selected tags based on absolute number
      topTagIdsByUser: null,
      topTagsByName: null,
      topTagPicksCountsByUser: null,

      // chart data for most selected tags based on percentage
      mostSelectedTagIds: null,
      mostSelectedTagNames: null,
      mostSelectedTagPercentages: null
    }

    this.getUserInfo = this.getUserInfo.bind(this);
    this.getTableData = this.getTableData.bind(this);
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
      this.setState({
        userInfo: responseObj.data.userInfo,
        userMoviesInfo: responseObj.data.userMoviesInfo,
        userTagsInfo: responseObj.data.userTagsInfo
      })

      //toggle switch for user reViewSetting
      const userReViewSetting = responseObj.data.userInfo.reView;
      this.props.setUserReViewSetting(userReViewSetting);
    })
    .then(() => {
      this.getTableData();
    })
  }

  getTableData() {
    return axios.get('/api/dashboard/tableData')
    .then(responseObj => {
      this.setState({
        tagsTableData: responseObj.data.tagsTableData
      })
    })
    .then(() => {
      this.chartTopTagsByUser();
    })
    .then(() => {
      this.chartTopTagsBySelectionPercentage();
    })
  }

  chartTopTagsByUser() {
    const tagPicksCountCutoff = 1;
    const tagIds = [];
    const tagPicksCounts = [];
    const tagNames = [];

    const tagsWithPicksCountGreaterThanCutoff = this.state.userTagsInfo.filter(tagObj => {
      if (tagObj.picksCount > tagPicksCountCutoff) {
        tagIds.push(tagObj.tag_Id);
        tagPicksCounts.push(tagObj.picksCount);
      }
    });

    tagIds.forEach(tagId => {
      this.state.tagsTableData.forEach(tagObj => {
        if (tagId === tagObj.id) {
          tagNames.push(tagObj.tagName);
        };
      })
    })

    this.setState({
      topTagIdsByUser: tagIds,
      topTagPicksCountsByUser: tagPicksCounts,
      topTagsByName: tagNames
    });
  }

  chartTopTagsBySelectionPercentage() {
    const tagPicksCountCutoff = 1;
    const tagIds = [];
    const tagSelectionPercentages = [];
    const tagNames = [];

    const calcTagSelectionPerecentage = this.state.userTagsInfo.filter(tagObj => {
      if (tagObj.picksCount > tagPicksCountCutoff) {
        tagIds.push(tagObj.tag_Id);
        tagSelectionPercentages.push(tagObj.picksCount / tagObj.viewsCount);
      }
    })

    tagIds.forEach(tagId => {
      this.state.tagsTableData.forEach(tagObj => {
        if (tagId === tagObj.id) {
          tagNames.push(tagObj.tagName);
        }
      })
    })

    this.setState({
      mostSelectedTagIds: tagIds,
      mostSelectedTagNames: tagNames,
      mostSelectedTagPercentages: tagSelectionPercentages
    })
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
          {this.state.topTagsByName && <PieChart
            labels={this.state.topTagsByName}
            data={this.state.topTagPicksCountsByUser}
          />}
          {this.state.mostSelectedTagNames && <BarChart
            labels={this.state.mostSelectedTagNames}
            data={this.state.mostSelectedTagPercentages}
          />}
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
