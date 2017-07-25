import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, HashRouter as Router, Route, Switch, } from 'react-router-dom';
import axios from 'axios';
import Welcome from './welcome.jsx';
import Results from './results.jsx';
import Header from '../components/header.jsx';
import LaunchPadWrapper from './launchPadWrapper.jsx';
import LightningWrapper from './lightningWrapper.jsx';
import MovieNight from './movieNight.jsx';
import Search from './search.jsx';
import Dashboard from './dashboard.jsx';
import LikeMoviePopdown from './popdown/likeMoviePopdown.jsx';
import { loginUser, logoutUser } from '../actions/actions.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    axios.get('/account')
      .then((results) => {
        if (results.data.user) {
          this.props.loginUser(results.data.user);
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

  render() {
    let popDown = null;

    if (this.props.auth.user && this.props.auth.user.watchedMovieTitle) {
      popDown = this.buildLikeQueryPopdown();
    }
    
    return (
      <div>
        <Router history={browserHistory}>
          <div>
            <Header user={this.props.auth.user} handleLogout={this.handleLogout} />
              {popDown}
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
  logoutUser: () => { dispatch(logoutUser()); }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
