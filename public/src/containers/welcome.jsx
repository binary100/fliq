import React from 'react';
import { connect } from 'react-redux';
import { loginWithFacebook, loginWithGoogle } from '../actions/actions.js';
import LoginSplash from '../components/loginSlash.jsx';

const welcomeHeader = `Welcome to FlickPick`;
const subHeader = `A learning recommendation system`;
const intro =
  `Our machine learning algorithm will get to know
  what kinds of movies you like and ensure that you will always have
  something interesting to watch.`;

class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const state = this.props.getStore();
    console.log('Logging state in Welcome render: ', state);
    const Login = state.isLoggedIn ? <LoginSplash /> : <h3>Logged In</h3>;
    return (
      <div>
        <h3>{welcomeHeader}</h3>
        <h4>{subHeader}</h4>
        <p>{intro}</p>
        {Login}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginWithFacebook,
    loginWithGoogle
  };
};

Welcome = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginSplash);

export default Welcome;
