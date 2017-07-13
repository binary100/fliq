import React from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { browserHistory, HashRouter as Router, Route, Switch, } from 'react-router-dom';
||||||| merged common ancestors
import { browserHistory, BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
=======
import { browserHistory, HashRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
>>>>>>> feat($launchpad): created launchpad demo
import axios from 'axios';
import Welcome from './welcome.jsx';
import Results from './results.jsx';
import Header from '../components/header.jsx';
import LightningWrapper from './lightningWrapper.jsx';
<<<<<<< HEAD
import Search from './search.jsx'
||||||| merged common ancestors
=======
import LaunchPadWrapper from './launchPadWrapper.jsx';
// import LaunchPad from './launchPad.jsx';
>>>>>>> feat($launchpad): created launchpad demo
import { loginUser, logoutUser } from '../actions/actions.js';
<<<<<<< HEAD
import Dashboard from './dashboard.jsx';

||||||| merged common ancestors


=======

>>>>>>> feat($launchpad): created launchpad demo
class App extends React.Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
||||||| merged common ancestors
    console.log('In App ctor, props: ', props);
=======
    // console.log('In App ctor, props: ', props);
>>>>>>> feat($launchpad): created launchpad demo
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

  render() {
    // console.log('In App render, props is: ', this.props);
    return (
      <div>
        <Router history={browserHistory}>
          <div>
            <Header user={this.props.auth.user} handleLogout={this.handleLogout} />
            <div>
              <Switch>
                <Route exact path="/" component={Welcome} />
                <Route path="/results" component={Results} />
                <Route path="/lightning" component={LightningWrapper} />
<<<<<<< HEAD
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/search" component={Search} />
                <Route path="*" component={Welcome} />

||||||| merged common ancestors
=======
                <Route path="/launchpad" component={LaunchPadWrapper} />
>>>>>>> feat($launchpad): created launchpad demo
              </Switch>
            </div>
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
