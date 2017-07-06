import React from 'react';
import { connect } from 'react-redux';
import { loginWithFacebook, loginWithGoogle } from '../actions/actions.js';
import LoginSplash from '../components/loginSplash.jsx';

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
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
)(LoginSplash);
