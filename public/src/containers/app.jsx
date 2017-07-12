import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, HashRouter as Router, Route, Switch, } from 'react-router-dom';
import axios from 'axios';
import Welcome from './welcome.jsx';
import Results from './results.jsx';
import Header from '../components/header.jsx';
import LightningWrapper from './lightningWrapper.jsx';
import Teach from './teach.jsx'
import { loginUser, logoutUser } from '../actions/actions.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('In App ctor, props: ', props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    axios.get('/account')
      .then((results) => {
        console.log('Received user data: ', results.data.user);
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
    console.log('In App render, props is: ', this.props);
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
                <Route path="/teach" component={Teach} />
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
