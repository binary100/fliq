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

      // user reView setting
      // userReViewSetting: null

      // chart data for most liked actors
      shapedTagInfo: null,
      topActors: null,
      topDirectors: null,
      topGenres: null,

      // tag data sorted by type
      genreData: null,
      actorData: null,
      directorData: null,

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

    this.changeUserReViewSetting = this.changeUserReViewSetting.bind(this);
    this.updateUserReViewSetting = this.updateUserReViewSetting.bind(this);

    this.sortTagDataByType = this.sortTagDataByType.bind(this);
    // this.chartTopActorsByLikes = this.chartTopActorsByLikes.bind(this);
    this.absNumChartsDropDownHandler = this.absNumChartsDropDownHandler.bind(this);
    this.pctChartsDropDownHandler = this.pctChartsDropDownHandler.bind(this);
    this.sortTypeByPicksCount = this.sortTypeByPicksCount.bind(this);
    this.sortTypeBySelectionPct = this.sortTypeBySelectionPct.bind(this);
  }

  componentWillMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    return axios.post('/api/dashboard/userInfo', {
      id: this.props.auth.user.id
    })
    .then((responseObj) => {
      console.log('shapedTagInfo: ', responseObj.data.shapedTagInfo);
      this.setState({
        userInfo: responseObj.data.userInfo,
        userMoviesInfo: responseObj.data.userMoviesInfo,
        userTagsInfo: responseObj.data.userTagsInfo,
        shapedTagInfo: responseObj.data.shapedTagInfo
      });
      const userReViewSetting = responseObj.data.userInfo.reView;
      this.props.setUserReViewSetting(userReViewSetting);
    })
     // .then(() => this.getTableData())
    // .then(() => this.chartTopActorsByLikes())
    .then(() => this.sortTagDataByType())
    .then(() => this.sortTypeByPicksCount())
    .then(() => this.sortTypeBySelectionPct());
  }

  // getTableData() {
  //   return axios.get('/api/dashboard/tableData')
  //   .then((responseObj) => {
  //     this.setState({
  //       tagsTableData: responseObj.data.tagsTableData
  //     });
  //   })
  //   .then(() => {
  //     console.log('getTableData tagsTableData:', this.state.tagsTableData);
  //   });
  // }

  // chartTopActorsByLikes() {
  //   const sortedByType = this.state.shapedTagInfo.reduce((acc, tag) => {
  //     if (!acc[tag.type]) {
  //       acc[tag.type] = [];
  //     }
  //     acc[tag.type].push({ likesCount: tag.likesCount, name: tag.name });
  //     return acc;
  //   }, {});
  //
  //   const topGenres = sortedByType.genre
  //     .sort((a, b) => b.likesCount - a.likesCount)
  //     .slice(0, 10);
  //   const topActors = sortedByType.actor
  //     .sort((a, b) => b.likesCount - a.likesCount)
  //     .slice(0, 10);
  //   const topDirectors = sortedByType.director
  //     .sort((a, b) => b.likesCount - a.likesCount)
  //     .slice(0, 10);
  //
  //   this.setState({ topGenres, topActors, topDirectors });
  // }

  // toggle switch for user reView setting
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

  sortTagDataByType() {
    const tagsSortedByType = this.state.shapedTagInfo.reduce((acc, tag) => {
      if (!acc[tag.type]) {
        acc[tag.type] = [];
      }

      acc[tag.type].push({
        sname: tag.name,
        picksCount: tag.picksCount,
        viewsCount: tag.viewsCount
      });

      return acc;
    }, {});


    this.setState({
      genreData: tagsSortedByType.genre,
      actorData: tagsSortedByType.actor,
      directorData: tagsSortedByType.directors
    });

    console.log('tagsSortedByType:', this.state.tagsSortedByType);
  }

  sortTypeByPicksCount() {
    const genreSortedByPicksCount = this.state.genreData
    .filter(genreObj => (genreObj.picksCount > tagsCountCutoff))
    .sort((a, b) => b.picksCount - a.picksCount)
    .slice(0, 10);

    const actorSortedByPicksCount = this.state.actorData
    .filter(actorObj => (actorObj.picksCount > tagsCountCutoff))
    .sort((a, b) => b.picksCount - a.picksCount)
    .slice(0, 10);

    const directorSortedByPicksCount = this.state.directorData
    .filter(directorDataObj => (directorDataObj.picksCount > tagsCountCutoff))
    .sort((a, b) => b.picksCount - a.picksCount)
    .slice(0, 10);

    console.log('genreSortedByPicksCount: ', genreSortedByPicksCount);
    console.log('actorSortedByPicksCount: ', actorSortedByPicksCount);
    console.log('directorSortedByPicksCount: ', directorSortedByPicksCount);

    this.setState({
      genreSortedByPicksCount,
      actorSortedByPicksCount,
      directorSortedByPicksCount
    });
  }

  sortTypeBySelectionPct() {
    const genreSortedBySelectionPct = genreData
    .filter(genreObj => (genreObj.picksCount > tagsCountCutoff))
    .sort((a, b) => ((b.picksCount / b.viewsCount) - (a.picksCount / a.viewsCount)))
    .slice(0, 10);

    const actorSortedBySelectionPct = actorData
    .filter(actorObj => (actorObj.picksCount > tagsCountCutoff))
    .sort((a, b) => ((b.picksCount / b.viewsCount) - (a.picksCount / a.viewsCount)))
    .slice(0, 10);

    const directorSortedBySelectionPct = directorData
    .filter(directorObj => (directorObj.picksCount > tagsCountCutoff))
    .sort((a, b) => ((b.picksCount / b.viewsCount) - (a.picksCount / a.viewsCount)))
    .slice(0, 10);

    console.log('genreSortedBySelectionPct: ', genreSortedBySelectionPct);
    console.log('actorSortedBySelectionPct: ', actorSortedBySelectionPct);
    console.log('directorSortedBySelectionPct: ', directorSortedBySelectionPct);

    this.setState({
      genreSortedBySelectionPct,
      actorSortedBySelectionPct,
      directorSortedBySelectionPct
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
