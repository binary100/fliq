import React from 'react';
import { connect } from 'react-redux';
import { loginWithFacebook, loginWithGoogle } from '../actions/actions.js';

const welcomeHeader = `Welcome to FlickPick`;
const subHeader = `A learning recommendation system`;
const intro =
  `Our machine learning algorithm will get to know
  what kinds of movies you like and ensure that you will always have
  something interesting to watch.`;


let LoginSplash = (props) => {
  // const store = props.getStore();
  console.log(props);
  return (
    <div>
      <h3>{welcomeHeader}</h3>
      <h4>{subHeader}</h4>
      <p>{intro}</p>
      <button onClick={() => props.dispatch(loginWithGoogle())}>
        Log In With Google
      </button>
      <button onClick={() => props.dispatch(loginWithFacebook())}>
        Log In With Facebook
      </button>
    </div>
  ); 
};

// Does not neet state, only needs dispatch, which is the return
// of an empty connect invocation
LoginSplash = connect()(LoginSplash);

export default LoginSplash;
