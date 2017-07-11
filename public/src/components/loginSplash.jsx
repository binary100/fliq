import React from 'react';
import { connect } from 'react-redux';

let LoginSplash = ({ dispatch, onGoogleLoginClick, onFacebookLoginClick }) => {
  return (
    <div className="row">
      <div className="col-lg-3">
        <div>
          <a href="/auth/google" className="btn btn-block btn-social btn-google">
            <span className="fa fa-google"></span>
            Sign in with Google
          </a>
          <a href="/auth/facebook" className="btn btn-block btn-social btn-facebook">
            <span className="fa fa-facebook"></span>
            Sign in with Facebook
          </a>
        </div>
      </div>
    </div>
  );
};

// Does not neet state, only needs dispatch, which is the return
// of an empty connect invocation
LoginSplash = connect()(LoginSplash);

export default LoginSplash;
