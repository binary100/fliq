import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, HashRouter as Router, Route, Switch, } from 'react-router-dom';
import axios from 'axios';
import anime from 'animejs';
import Welcome from './welcome.jsx';
import Results from './results.jsx';
import Header from '../components/header.jsx';
import LaunchPadWrapper from './launchPadWrapper.jsx';
import LightningWrapper from './lightningWrapper.jsx';
import MovieNight from './movieNight.jsx';
import Search from './search.jsx';
import Dashboard from './dashboard.jsx';
import { loginUser, logoutUser } from '../actions/actions.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    // console.log('In App ctor, props: ', props);
    axios.get('/account')
      .then((results) => {
        if (results.data.user) {
          this.props.loginUser(results.data.user);
        }
      })
      .catch(err => console.error('Login failed: ', err));
<<<<<<< HEAD
||||||| merged common ancestors

    axios.get('/api/tagCreation')
      .then(results => console.log(results))
      .catch(err => console.error('Tag Update failed: ', err));
=======

    // axios.get('/api/tagCreation')
    //   .then(results => console.log(results))
    //   .catch(err => console.error('Tag Update failed: ', err));
>>>>>>> launchpad6
  }

  handleLogout() {
    axios.get('/logout').then(() => this.props.logoutUser());
  }

  render() {
    // console.log('In App render, props is: ', this.props);
    return (
      <div>
        <Router history={browserHistory}>
          <div>
            <Header user={this.props.auth.user} handleLogout={this.handleLogout} />
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
