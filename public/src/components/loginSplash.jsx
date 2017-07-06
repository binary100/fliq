import React from 'react';
import { connect } from 'react-redux';

let LoginSplash = ({ dispatch }) => (
  <h3>LoginSplash</h3>
  <button onClick={}>
    Log In With Google
  </button>
  <button onClick={}>
    Log In With Facebook
  </button>
);

//Does not neet state, only needs dispatch
LoginSplash = connect()(LoginSplash);

export default LoginSplash;
