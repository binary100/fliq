import React from 'react';
import { connect } from 'react-redux';
import LoginSplash from '../components/loginSlash.jsx';

const welcomeHeader = `Welcome to FlickPick`;
const subHeader = `A learning recommendation system`;
const intro =
  `Our machine learning algorithm will get to know
  what kinds of movies you like and ensure that you will always have
  something interesting to watch.`;

let Welcome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>{welcomeHeader}</h3>
        <h4>{subHeader}</h4>
        <p>{intro}</p>
        <LoginSplash />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

Welcome = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginSplash);

export default Welcome;
