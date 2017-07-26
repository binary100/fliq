import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import DashboardUserProfile from '../components/dashboardUserProfile.jsx';
import DashboardTrophies from '../components/dashboardTrophies.jsx';
import PieChart from '../components/pieChart.jsx';
import BarChart from '../components/barChart.jsx';
import DropDownMenu from '../components/dropDownMenu.jsx';
import { setUserReViewSetting, toggleUserReViewSetting } from '../actions/actions.js';

const tagsCountCutoff = 0;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // user data
      userInfo: null,
      userMoviesInfo: null,
      userTagsInfo: null,
      shapedTagInfo: null,

      // user reView setting
      // userReViewSetting: null

      // chart data for most liked actors
      // topActors: null,
      // topDirectors: null,
      // topGenres: null,

      // raw tag data sorted by type
      genreRawData: null,
      actorRawData: null,
      directorRawData: null,

      // tag data sorted by type and picksCount
      allTagsSortedByPicksCount: null,
      genreSortedByPicksCount: null,
      actorSortedByPicksCount: null,
      directorSortedByPicksCount: null,

      // tag data sorted by type and selection %
      allTagsSortedBySelectionPct: null,
      genreSortedBySelectionPct: null,
      actorSortedBySelectionPct: null,
      directorSortedBySelectionPct: null,

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

    this.changeUserReViewSetting = this.changeUserReViewSetting.bind(this);
    this.updateUserReViewSetting = this.updateUserReViewSetting.bind(this);

    this.sortTagDataByType = this.sortTagDataByType.bind(this);
    this.sortTypeByPicksCount = this.sortTypeByPicksCount.bind(this);
    this.sortTypeBySelectionPct = this.sortTypeBySelectionPct.bind(this);

    this.sortAllTagsByPicksCount = this.sortAllTagsByPicksCount.bind(this);
    this.sortAllTagsBySelectionPct = this.sortAllTagsBySelectionPct.bind(this);

    this.absNumChartsDropDownHandler = this.absNumChartsDropDownHandler.bind(this);
    this.pctChartsDropDownHandler = this.pctChartsDropDownHandler.bind(this);

    this.displayDefaultCharts = this.displayDefaultCharts.bind(this);
    // this.chartTopActorsByLikes = this.chartTopActorsByLikes.bind(this);
  }

  componentWillMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    return axios.post('/api/dashboard/userInfo', {
      id: this.props.auth.user.id
    })
    .then((responseObj) => {
      this.setState({
        userInfo: responseObj.data.userInfo,
        userMoviesInfo: responseObj.data.userMoviesInfo,
        userTagsInfo: responseObj.data.userTagsInfo,
        shapedTagInfo: responseObj.data.shapedTagInfo,
        earnedTrophies: responseObj.data.earnedTrophies
      });

      console.log('shapedTagInfo:', this.state.shapedTagInfo);

      const userReViewSetting = responseObj.data.userInfo.reView;
      this.props.setUserReViewSetting(userReViewSetting);
    })
    .then(() => this.sortAllTagsByPicksCount())
    .then(() => this.sortAllTagsBySelectionPct())
    .then(() => this.displayDefaultCharts())
    .then(() => this.sortTagDataByType())
    .then(() => this.sortTypeByPicksCount())
    .then(() => this.sortTypeBySelectionPct());
    // .then(() => this.chartTopActorsByLikes())
  }

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
        name: tag.name,
        picksCount: tag.picksCount,
        viewsCount: tag.viewsCount
      });

      return acc;
    }, {});

    this.setState({
      genreRawData: tagsSortedByType.genre,
      actorRawData: tagsSortedByType.actor,
      directorRawData: tagsSortedByType.director
    });
  }

  sortAllTagsByPicksCount() {
    const allTagsSortedByPicksCount = this.state.shapedTagInfo
    .filter(tagObj => (tagObj.picksCount > tagsCountCutoff))
    .sort((a, b) => b.picksCount - a.picksCount)
    .slice(0, 10);

    this.setState({
      allTagsSortedByPicksCount
    });

    console.log('allTagsSortedByPicksCount:', this.state.allTagsSortedByPicksCount);
  }

  sortAllTagsBySelectionPct() {
    const allTagsSortedBySelectionPct = this.state.shapedTagInfo
    .filter(tagObj => (tagObj.picksCount > tagsCountCutoff))
    .sort((a, b) => ((b.picksCount / b.viewsCount) - (a.picksCount / a.viewsCount)))
    .slice(0, 10);

    this.setState({
      allTagsSortedBySelectionPct
    });

    console.log('allTagsSortedBySelectionPct:', this.state.allTagsSortedBySelectionPct);
  }


  sortTypeByPicksCount() {
    const genreSortedByPicksCount = this.state.genreRawData
    .filter(genreObj => (genreObj.picksCount > tagsCountCutoff))
    .sort((a, b) => b.picksCount - a.picksCount)
    .slice(0, 10);

    const actorSortedByPicksCount = this.state.actorRawData
    .filter(actorObj => (actorObj.picksCount > tagsCountCutoff))
    .sort((a, b) => b.picksCount - a.picksCount)
    .slice(0, 10);

    const directorSortedByPicksCount = this.state.directorRawData
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
    const genreSortedBySelectionPct = this.state.genreRawData
    .filter(genreObj => (genreObj.picksCount > tagsCountCutoff))
    .sort((a, b) => ((b.picksCount / b.viewsCount) - (a.picksCount / a.viewsCount)))
    .slice(0, 10);

    const actorSortedBySelectionPct = this.state.actorRawData
    .filter(actorObj => (actorObj.picksCount > tagsCountCutoff))
    .sort((a, b) => ((b.picksCount / b.viewsCount) - (a.picksCount / a.viewsCount)))
    .slice(0, 10);

    const directorSortedBySelectionPct = this.state.directorRawData
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

  displayDefaultCharts() {
    this.setState({
      absNumChartsTitle: 'Most Selected Tags (#)',
      absNumChartsLabels: this.state.allTagsSortedBySelectionPct.map(tagObj => tagObj.name),
      absNumChartsData: this.state.allTagsSortedBySelectionPct.map(tagObj => (tagObj.picksCount / tagObj.viewsCount)),
      pctChartsTitle: 'Most Selected Tags (%)',
      pctChartsLabels: this.state.allTagsSortedBySelectionPct.map(tagObj => tagObj.name),
      pctChartsData: this.state.allTagsSortedBySelectionPct.map(tagObj => (tagObj.picksCount / tagObj.viewsCount))
    });
  }

  absNumChartsDropDownHandler(eventKey) {
    let chartTitle = null;
    let chartLabels = null;
    let chartData = null;

    if (eventKey === 'genre') {
      chartTitle = 'Most Selected Genres (#)';
      chartLabels = this.state.genreSortedByPicksCount.map(genreObj => genreObj.name);
      chartData = this.state.genreSortedByPicksCount.map(genreObj => genreObj.picksCount);
    } else if (eventKey === 'actor') {
      chartTitle = 'Most Selected Actors (#)';
      chartLabels = this.state.actorSortedByPicksCount.map(actorObj => actorObj.name);
      chartData = this.state.actorSortedByPicksCount.map(actorObj => actorObj.picksCount);
    } else if (eventKey === 'director') {
      chartTitle = 'Most Selected Directors (#)';
      chartLabels = this.state.directorSortedByPicksCount.map(directorObj => directorObj.name);
      chartData = this.state.directorSortedByPicksCount.map(directorObj => directorObj.picksCount);
    } else {
      chartTitle = 'Most Selected Tags (#)';
      chartLabels = this.state.allTagsSortedByPicksCount.map(tagObj => tagObj.name);
      chartData = this.state.allTagsSortedByPicksCount.map(tagObj => tagObj.picksCount);
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
      chartLabels = this.state.genreSortedBySelectionPct.map(genreObj => genreObj.name);
      chartData = this.state.genreSortedBySelectionPct.map(genreObj => (genreObj.picksCount / genreObj.viewsCount));
    } else if (eventKey === 'actor') {
      chartTitle = 'Most Selected Actors (%)';
      chartLabels = this.state.actorSortedBySelectionPct.map(actorObj => actorObj.name);
      chartData = this.state.actorSortedBySelectionPct.map(actorObj => (actorObj.picksCount / actorObj.viewsCount));
    } else if (eventKey === 'director') {
      chartTitle = 'Most Selected Directors (%)';
      chartLabels = this.state.directorSortedBySelectionPct.map(directorObj => directorObj.name);
      chartData = this.state.directorSortedBySelectionPct.map(directorObj => (directorObj.picksCount / directorObj.viewsCount));
    } else {
      chartTitle = 'Most Selected Tags (%)';
      chartLabels = this.state.allTagsSortedBySelectionPct.map(tagObj => tagObj.name);
      chartData = this.state.allTagsSortedBySelectionPct.map(tagObj => (tagObj.picksCount / tagObj.viewsCount));
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
          <div className="col-lg-4 pull-left">
            <DashboardUserProfile
              user={this.props.auth.user}
              changeUserReViewSetting={this.changeUserReViewSetting}
              reViewSetting={this.props.userReViewSetting}
            />
          </div>
          <div className="col-lg-6 pull-right">
            <DashboardTrophies trophies={this.state.earnedTrophies} />
          </div>
        </div>


        <div>
          { this.state.genreSortedByPicksCount &&
            this.state.genreSortedBySelectionPct ?
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
            : <h1 className="col-sm-12">Loading your preference data...</h1>
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
