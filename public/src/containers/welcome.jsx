import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoginSplash from '../components/loginSplash.jsx';
import Quote from './quote.jsx';

const welcomeHeader = 'Welcome to FlickPick';
const subHeader = 'A learning recommendation system';
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

    const footer = this.props.auth.isLoggedIn
      ? <Quote />
      : <LoginSplash />;

    return (
      <div>
        <div className="jumbotron welcome">
          <h1>{welcomeHeader}</h1>
          <h4>{subHeader}</h4>
          <p>{intro}</p>
          <span>
            <Link className="link start-lightning" to="/lightning">
              <h3>
                Start picking movies
              </h3>
            </Link>
          </span>
          <div className="welcome-footer">
            {footer}
          </div>
        </div>
      </div>
    );
  }
}

// Points elements of state at this component's props.
// Props will have the KEYS from the below returned objects
// as defined by the state elements you point at it
const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  null
)(Welcome);
