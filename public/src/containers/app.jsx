import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, HashRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
// import style from '../../assets/css/main.scss'
import Welcome from './welcome.jsx';
import Results from './results.jsx';
import Header from '../components/header.jsx';
import SideMenu from '../components/sidemenu.jsx';
import LaunchPadWrapper from './launchPadWrapper.jsx';
import LightningWrapper from './lightningWrapper.jsx';
import MovieNight from './movieNight.jsx';
import Search from './search.jsx';
import Dashboard from './dashboard.jsx';
import LikeMoviePopdown from './popdown/likeMoviePopdown.jsx';
import TrophyPopdown from './popdown/trophyPopdown.jsx';
import { loginUser, logoutUser, showTrophyPopdown } from '../actions/actions.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideMenu: false,
      trophies: null
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
  }

  componentWillMount() {
    axios.get('/account')
      .then((results) => {
        let { user, trophy } = results.data;
        if (user) {
          this.props.loginUser(user);
          if (trophy) {
            this.props.showTrophyPopdown(trophy);
          }
        }
      })
      .catch(err => console.error('Login failed: ', err));
  }

  handleLogout() {
    axios.get('/logout').then(() => this.props.logoutUser());
  }

  buildLikeQueryPopdown() {
    const movieObj = {
      id: this.props.auth.user.watchedMovieId,
      title: this.props.auth.user.watchedMovieTitle
    };
    return <LikeMoviePopdown movie={movieObj} />;
  }

  toggleSideMenu() {
    this.setState({ showSideMenu: !this.state.showSideMenu });
  }

  render() {
    let likePopdown = null;
    if (this.props.auth.user && this.props.auth.user.watchedMovieTitle) {
      likePopdown = this.buildLikeQueryPopdown();
    }

    return (
      <div>
        <Router history={browserHistory}>
          <div>
            <Header
              user={this.props.auth.user}
              handleLogout={this.handleLogout}
              toggleSideMenu={this.toggleSideMenu}
            />
            {likePopdown}
            <TrophyPopdown />
            <SideMenu showMenu={this.state.showSideMenu} />
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route path="/results" component={Results} />
              <Route path="/lightning" component={LightningWrapper} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/search" component={Search} />
              <Route path="/launchpad" component={LaunchPadWrapper} />
              <Route path="/movienight" component={MovieNight} />
              <Route path="*" component={Welcome} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

// This function means "point these state values at the props
// that this component will receive"
const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  loginUser: (user) => { dispatch(loginUser(user)); },
  logoutUser: () => { dispatch(logoutUser()); },
  showTrophyPopdown: (trophies) => { dispatch(showTrophyPopdown(trophies)); }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
