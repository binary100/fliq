import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { loginWithFacebook, loginWithGoogle } from '../actions/actions.js';
import { Link } from 'react-router-dom';
import LoginSplash from '../components/loginSplash.jsx';
import Results from './results.jsx';

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
    this.handleGoogleLogin = () => {
      // axios.get('/auth/google')
      //   .then((results) => {
      //      this.props.dispatch()
      //   })
    };

    this.handleFacebookLogin = () => {
      // axios.get('/auth/facebook')
      //   .then((results) => {
      //      this.props.dispatch()
      //   })
    };
  }

  render() {
    console.log('In Welcome renderer, props is:, ', this.props);

    // Can the props passed to LoginSplash be accessed by connect
    // in that component instead? Which is better?
    const Login = this.props.isLoggedIn
      ? <h3>Debug: Logged In</h3>
      : <LoginSplash
          onFacebookLoginClick={this.props.onFacebookLoginClick}
          onGoogleLoginClick={this.props.onGoogleLoginClick}
        />;

    return (
      <div>
        <h2>{welcomeHeader}</h2>
        <h3>{subHeader}</h3>
        <p>{intro}</p>
        <span>
          <Link to="/results">
            <h3>
              Start picking movies
            </h3>
          </Link>
        </span>
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
