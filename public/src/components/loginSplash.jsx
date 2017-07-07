import React from 'react';
import { connect } from 'react-redux';
// import { loginWithFacebook, loginWithGoogle } from '../actions/actions.js';

let LoginSplash = ({ dispatch, onGoogleLoginClick, onFacebookLoginClick }) => {
  return (
    <div> 
      <div>
        <button onClick={() => dispatch(onGoogleLoginClick())}>
          Log In With Google
        </button>
        <button onClick={() => dispatch(onFacebookLoginClick())}>
          Log In With Facebook
        </button>
      </div>
    </div>
  );
};

// Does not neet state, only needs dispatch, which is the return
// of an empty connect invocation
LoginSplash = connect()(LoginSplash);

export default LoginSplash;
