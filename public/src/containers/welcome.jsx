import React from 'react';
import { connect } from 'react-redux';
import { loginWithFacebook, loginWithGoogle } from '../actions/actions.js';
import LoginSplash from '../components/loginSplash.jsx';

const welcomeHeader = `Welcome to FlickPick`;
const subHeader = `A learning recommendation system`;
const intro =
  `Our machine learning algorithm will get to know
  what kinds of movies you like and ensure that you will always have
  something interesting to watch.`;

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    console.log('In Welcome, props is: ', props);
  }

  render() {
    console.log('In Welcome renderer, props is:, ', this.props);

    // Can the props passed to LoginSplash be accessed by connect
    // in that component instead? Which is better?
    const Login = this.props.isLoggedIn
      ? <h3>Logged In</h3>
      : <LoginSplash
          onFacebookLoginClick={this.props.onFacebookLoginClick}
          onGoogleLoginClick={this.props.onGoogleLoginClick}
        />;

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

// Points elements of state at this component's props.
// Props will have the KEYS from the below returned objects
// as defined by the state elements you point at it
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFacebookLoginClick: loginWithFacebook,
    onGoogleLoginClick: loginWithGoogle
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
