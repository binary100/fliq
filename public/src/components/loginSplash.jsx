import React from 'react';
import { connect } from 'react-redux';
import { loginWithFacebook, loginWithGoogle } from '../actions/actions.js';

let LoginSplash = ({ dispatch }) => (
  <div>
    <h3>LoginSplash</h3>
    <button onClick={dispatch(loginWithGoogle())}>
      Log In With Google
    </button>
    <button onClick={dispatch(loginWithFacebook())}>
      Log In With Facebook
    </button>
  </div>
);

//Does not neet state, only needs dispatch
LoginSplash = connect()(LoginSplash);

export default LoginSplash;
