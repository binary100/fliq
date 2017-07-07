import React from 'react';
import Welcome from '../containers/Welcome.jsx';
import { connect } from 'react-redux';
import { Router, Route, Link, Switch, Redirect } from 'react-router-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('In App, props is: ', props);
  }

  render() {
    return (
      <Welcome />
    );
  }
}

// This function means "point these state values at the props
// that this component will receive"
const mapStateToProps = state => ({
  isLoggedIn: state.login.isLoggedIn
});

export default connect(mapStateToProps, null)(App);
