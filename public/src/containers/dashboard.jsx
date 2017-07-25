import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import DashboardUserProfile from '../components/dashboardUserProfile.jsx';
import PieChart from '../components/pieChart.jsx';
import BarChart from '../components/barChart.jsx';
import ToggleSwitch from '../components/toggleSwitch.jsx';
import DropDownMenu from '../components/dropDownMenu.jsx';
import { setUserReViewSetting, toggleUserReViewSetting } from '../actions/actions.js';

const tagsCountCutoff = 0;

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
      mostSelectedTagPercentages: null,

      // chart data for most liked actors
      shapedTagInfo: null,
      topActors: null,
      topDirectors: null,
      topGenres: null,

      // data for absolute # charts

      absNumChartsTitle: null,
      absNumChartsLabels: null,
      absNumChartsData: null,

      // data for relative % charts
      pctChartsTitle: null,
      pctChartsLabels: null,
      pctChartsData: null
    };

    this.getUserInfo = this.getUserInfo.bind(this);
    this.getTableData = this.getTableData.bind(this);
    this.updateUserReViewSetting = this.updateUserReViewSetting.bind(this);
    this.changeUserReViewSetting = this.changeUserReViewSetting.bind(this);
    // this.chartTopTagsByUser = this.chartTopTagsByUser.bind(this);
    this.chartTopActorsByLikes = this.chartTopActorsByLikes.bind(this);
    this.absNumChartsDropDownHandler = this.absNumChartsDropDownHandler.bind(this);
    this.pctChartsDropDownHandler = this.pctChartsDropDownHandler.bind(this);
    // this.sortRawChartDataByPicksCount = this.sortRawChartDataByPicksCount.bind(this);
    // this.sortRawChartDataBySelectionPct = this.sortRawChartDataBySelectionPct.bind(this);
  }

  componentWillMount() {
    this.getUserInfo();
  }


  getUserInfo() {
    return axios.post('/api/dashboard/userInfo', {
      id: this.props.auth.user.id
    })
    .then((responseObj) => {
      console.log('shaped Info: ', responseObj.data.shapedTagInfo);
      this.setState({
        userInfo: responseObj.data.userInfo,
        userMoviesInfo: responseObj.data.userMoviesInfo,
        userTagsInfo: responseObj.data.userTagsInfo,
        shapedTagInfo: responseObj.data.shapedTagInfo
      });
      console.log('shapedInfo is: ', responseObj.data);
      const userReViewSetting = responseObj.data.userInfo.reView;
      this.props.setUserReViewSetting(userReViewSetting);
    })
    .then(() => {
      this.getTableData();
    });
  }

  getTableData() {
    return axios.get('/api/dashboard/tableData')
    .then((responseObj) => {
      console.log('responseObj is: ', responseObj.data);
      this.setState({
        tagsTableData: responseObj.data.tagsTableData
      });
    })
    // .then(() => this.chartTopTagsByUser())
    .then(() => console.log('state after calling chartTopTagsByUser:', this.state))
    // .then(() => this.chartTopTagsBySelectionPercentage())
    .then(() => this.chartTopActorsByLikes());
  }

  // chartTopTagsByUser() {
  //   const tagPicksCountCutoff = tagsCountCutoff;
  //   const tagIds = [];
  //   const tagPicksCounts = [];
  //   const tagNames = [];
  //
  //   this.state.userTagsInfo.forEach((tagObj) => {
  //     if (tagObj.picksCount > tagPicksCountCutoff) {
  //       tagIds.push(tagObj.tag_Id);
  //       tagPicksCounts.push(tagObj.picksCount);
  //     }
  //   });
  //
  //   tagIds.forEach((tagId) => {
  //     this.state.tagsTableData.forEach((tagObj) => {
  //       if (tagId === tagObj.id) {
  //         tagNames.push(tagObj.tagName);
  //       }
  //     });
  //   });
  //
  //   this.setState({
  //     topTagIdsByUser: tagIds,
  //     topTagPicksCountsByUser: tagPicksCounts,
  //     topTagsByName: tagNames
  //   });
  // }

  // chartTopTagsBySelectionPercentage() {
  //   const tagPicksCountCutoff = tagsCountCutoff;
  //   const tagIds = [];
  //   const tagSelectionPercentages = [];
  //   const tagNames = [];
  //
  //   this.state.userTagsInfo.forEach((tagObj) => {
  //     if (tagObj.picksCount > tagPicksCountCutoff) {
  //       tagIds.push(tagObj.tag_Id);
  //       tagSelectionPercentages.push(tagObj.picksCount / tagObj.viewsCount);
  //     }
  //   });
  //
  //   tagIds.forEach((tagId) => {
  //     this.state.tagsTableData.forEach((tagObj) => {
  //       if (tagId === tagObj.id) {
  //         tagNames.push(tagObj.tagName);
  //       }
  //     });
  //   });
  //
  //   this.setState({
  //     mostSelectedTagIds: tagIds,
  //     mostSelectedTagNames: tagNames,
  //     mostSelectedTagPercentages: tagSelectionPercentages
  //   });
  // }

  chartTopActorsByLikes() {
    const sortedByType = this.state.shapedTagInfo.reduce((acc, tag) => {
      if (!acc[tag.type]) {
        acc[tag.type] = [];
      }
      acc[tag.type].push({ likesCount: tag.likesCount, name: tag.name, picksCount: tag.picksCount, viewsCount: tag.viewsCount });
      return acc;
    }, {});
    const topGenres = sortedByType.genre
      .sort((a, b) => b.likesCount - a.likesCount)
      .slice(0, 10);
    const topActors = sortedByType.actor
      .sort((a, b) => b.likesCount - a.likesCount)
      .slice(0, 10);
    const topDirectors = sortedByType.director
      .sort((a, b) => b.likesCount - a.likesCount)
      .slice(0, 10);
    // console.log('topActors: ', topActors);
    // console.log('topGenres: ', topGenres);
    // console.log('topDirectors: ', topDirectors);
    this.setState({ topGenres, topActors, topDirectors });
  }

  // getRawChartData() {
  //   const sortedByType = this.state.shapedTagInfo.reduce((acc, tag) => {
  //     if (!acc[tag.type]) {
  //       acc[tag.type] = [];
  //     }
  //     acc[tag.type].push({ name: tag.name, picksCount: tag.picksCount, viewsCount: tag.viewsCount });
  //     return acc;
  //   }, {});
  //
  //   const genreData = sortedByType.genre;
  //   const actorData = sortedByType.actor;
  //   const directorData = sortedByType.director;
  // }
  // .then(() => {
  //   this.sortRawChartDataByPicksCount();
  //   this.sortRawChartDataBySelectionPct();
  // })

  // sortRawChartDataByPicksCount() {
  //   const genreDataSortedByPicksCount = genreData
  //   .filter(genreObj => (genreData.picksCount > tagsCountCutoff))
  //   .sort((a, b) => b.picksCount - a.picksCount)
  //   .slice(0, 10);
  //
  //   const actorDataSortedByPicksCount = actorData
  //     .filter(actorObj => (actorObj.picksCount > tagsCountCutoff))
  //     .sort((a, b) => b.picksCount - a.picksCount)
  //     .slice(0, 10);
  //
  //   const directorDataSortedByPicksCount = directorData
  //     .filter(directorObj => (directorObj.picksCount > tagsCountCutoff))
  //     .sort((a, b) => b.picksCount - a.picksCount)
  //     .slice(0, 10);
  //
  //   console.log('genreDataSortedByPicksCount: ', genreDataSortedByPicksCount);
  //   console.log('actorDataSortedByPicksCount: ', actorDataSortedByPicksCount);
  //   console.log('directorDataSortedByPicksCount: ', directorDataSortedByPicksCount);
  //
  //   this.setState({ genreDataSortedByPicksCount, actorDataSortedByPicksCount, directorDataSortedByPicksCount });
  // }
  //
  // sortRawChartDataBySelectionPct() {
  //   const genreDataSortedBySelectionPct = genreData
  //   .filter(genreObj => (genreData.picksCount > tagsCountCutoff))
  //   .sort((a, b) => ((b.picksCount / b.viewsCount) - (a.picksCount / a.viewsCount)))
  //   .slice(0, 10);
  //
  //   const actorDataSortedBySelectionPct = actorData
  //     .filter(actorObj => (actorObj.picksCount > tagsCountCutoff))
  //     .sort((a, b) => ((b.picksCount / b.viewsCount) - (a.picksCount / a.viewsCount)))
  //     .slice(0, 10);
  //
  //   const directorDataSortedBySelectionPct = directorData
  //     .filter(directorObj => (directorObj.picksCount > tagsCountCutoff))
  //     .sort((a, b) => ((b.picksCount / b.viewsCount) - (a.picksCount / a.viewsCount)))
  //     .slice(0, 10);
  //
  //   console.log('genreDataSortedBySelectionPct: ', genreDataSortedBySelectionPct);
  //   console.log('actorDataSortedBySelectionPct: ', actorDataSortedBySelectionPct);
  //   console.log('directorDataSortedBySelectionPct: ', directorDataSortedBySelectionPct);
  //
  //   this.setState({ genreDataSortedBySelectionPct, actorDataSortedBySelectionPct, directorDataSortedBySelectionPct });
  // }

  changeUserReViewSetting() {
    this.updateUserReViewSetting()
      .then(() => {
        this.props.toggleUserReViewSetting();
      });
  }

  updateUserReViewSetting() {
    return axios.post('/api/dashboard/updateUserSettings', {
      id: this.props.auth.user.id,
      reView: !this.props.userReViewSetting
    });
  }

  absNumChartsDropDownHandler(eventKey) {
    let chartTitle = null;
    let chartLabels = null;
    let chartData = null;

    if (eventKey === 'genre') {
      chartTitle = 'Most Selected Genres (#)';
      chartLabels = this.state.topGenres.map(genreObj => genreObj.name);
      chartData = this.state.topGenres.map(genreObj => genreObj.picksCount);
    } else if (eventKey === 'actor') {
      chartTitle = 'Most Selected Actors (#)';
      chartLabels = this.state.topActors.map(actorObj => actorObj.name);
      chartData = this.state.topActors.map(actorObj => actorObj.picksCount);
    } else if (eventKey === 'director') {
      chartTitle = 'Most Selected Directors (#)';
      chartLabels = this.state.topDirectors.map(directorObj => directorObj.name);
      chartData = this.state.topDirectors.map(directorObj => directorObj.picksCount);
    } else if (eventKey === 'all') {
      chartTitle = 'Most Selected Tags (#)';
    }

    this.setState({
      absNumChartsTitle: chartTitle,
      absNumChartsLabels: chartLabels,
      absNumChartsData: chartData
    });
  }

  pctChartsDropDownHandler(eventKey) {
    let chartTitle = null;
    let chartLabels = null;
    let chartData = null;

    if (eventKey === 'genre') {
      chartTitle = 'Most Selected Genres (%)';
      chartLabels = this.state.topGenres.map(genreObj => genreObj.name);
      chartData = this.state.topGenres.map(genreObj => (genreObj.picksCount / genreObj.viewsCount));
    } else if (eventKey === 'actor') {
      chartTitle = 'Most Selected Actors (%)';
      chartLabels = this.state.topActors.map(actorObj => actorObj.name);
      chartData = this.state.topActors.map(actorObj => (actorObj.picksCount / actorObj.viewsCount));
    } else if (eventKey === 'director') {
      chartTitle = 'Most Selected Directors (%)';
      chartLabels = this.state.topDirectors.map(directorObj => directorObj.name);
      chartData = this.state.topDirectors.map(directorObj => (directorObj.picksCount / directorObj.viewsCount));
    } else if (eventKey === 'all') {
      chartTitle = 'Most Selected Tags (#)';
    }

    this.setState({
      pctChartsTitle: chartTitle,
      pctChartsLabels: chartLabels,
      pctChartsData: chartData
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <DashboardUserProfile
              user={this.props.auth.user}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-12">
            <ToggleSwitch
              changeUserReViewSetting={this.changeUserReViewSetting}
              reViewSetting={this.props.userReViewSetting}
            />
          </div>
        </div>
        <br />
        <div>
          { this.state.topGenres &&
            this.state.topActors &&
            this.state.topDirectors ?
              <div className="dashboard-charts">
                <div className="row">
                  <div className="col-lg-6">
                    <DropDownMenu
                      onSelect={this.absNumChartsDropDownHandler}
                    />
                  </div>
                  <div className="col-lg-6">
                    <DropDownMenu
                      onSelect={this.pctChartsDropDownHandler}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <PieChart
                      title={this.state.absNumChartsTitle}
                      labels={this.state.absNumChartsLabels}
                      data={this.state.absNumChartsData}
                    />
                  </div>
                  <div className="col-lg-6">
                    <BarChart
                      title={this.state.pctChartsTitle}
                      labels={this.state.pctChartsLabels}
                      data={this.state.pctChartsData}
                    />
                  </div>
                </div>
              </div>
            : <h1 className="col-sm-12">Loading your profile data...</h1>
            }
        </div>
      </div>
    );
  }
}

/*
  <BarChart
    title="Top 10 Actors"
    labels={this.state.topActors.map(a => a.name)}
    data={this.state.topActors.map(a => a.likesCount)}
  />
*/

const mapStateToProps = state => ({
  auth: state.auth,
  userReViewSetting: state.userSettingsReducer.userReViewSetting
});

const mapDispatchToProps = dispatch => ({
  setUserReViewSetting: (userReViewSetting) => {
    dispatch(setUserReViewSetting(userReViewSetting));
  },
  toggleUserReViewSetting: () => { dispatch(toggleUserReViewSetting()); }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
