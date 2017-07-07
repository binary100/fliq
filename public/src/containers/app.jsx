import React from 'react';
import Welcome from './welcome.jsx';
import Results from './results.jsx';
import Header from '../components/header.jsx';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('In App, props is: ', props);
  }

  render() {
    return (
      <div>
        <Router history={browserHistory}>
          <div>
            <Header />
            <div>
              <Switch>
                <Route exact path="/" component={Welcome} />
                <Route path="/options" component={Results} />
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
  isLoggedIn: state.login.isLoggedIn
});

export default connect(mapStateToProps, null)(App);
