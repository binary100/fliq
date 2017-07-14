import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoginSplash from '../components/loginSplash.jsx';
import Quote from './quote.jsx';

const welcomeHeader = 'Welcome to ';
const subHeader = 'An adaptive movie recommendation system';
const intro =
  `Our machine learning algorithm will get to know
  what kinds of movies you like and ensure that you will always have
  something interesting to watch. Log in, then click below to start 
  the lightning round phase, which will teach FlickPick's neural network
  about what you like.`;
const nameArray = [0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1,
  'F', 'L', 'I', 'Q'
];
const intervals = [];
const targetTitle = 'FLIQ';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervals: [],
      title: 'FLIQ',
      titleClass: ''
    };
  }

  componentDidMount() {
    // this.animateTitle();
    // this.animateTitleTwo();
    this.animateTitleThree();
  }

  componentWillUnmount() {
    intervals.forEach((id) => clearInterval(id));
  }

  animateTitleThree() {
    let title = this.state.title;
    title.split('').forEach((letter, index) => {
      let remaining = 15;
      const delay = Math.random() * 200;
      const intervalId = setInterval(() => {
        let digit = '' + Math.round(Math.random());
        title = title.split('');
        title[index] = digit;
        title = title.join('');
        this.setState({ title });
        remaining -= 1;
        if (remaining === 0) {
          intervals.forEach((id) => clearInterval(id));
          this.concludeAnimation();
        }
      }, 100);
      intervals.push(intervalId);
    });
  }

  concludeAnimation() {
    let title = this.state.title.split('');
    let remaining = title.length;
    let i = 0;
    const intervalId = setInterval(() => {
      title[i] = targetTitle[i];
      this.setState({ title });
      i += 1;
      if (i === title.length) {
        clearInterval(intervalId);
        this.setState({ titleClass: 'flick-iq' });
      }
    }, 100);
  }

  animateTitleTwo() {
    let title = this.state.title;
    title.split('').forEach((letter, index) => {
      let remaining = 20;
      const delay = Math.random() * 200;
      const intervalId = setInterval(() => {
        let digit = '' + Math.round(Math.random());
        title = title.split('');
        title[index] = digit;
        title = title.join('');
        this.setState({ title });
        remaining -= 1;
        if (remaining === 0) {
          let finalTitle = this.state.title;
          finalTitle = finalTitle.split('');
          finalTitle[index] = letter;
          finalTitle.join('');
          this.setState({
            title: 'FLIQ',
            titleClass: 'flick-iq'
          });
          clearInterval(intervalId);
        }
      }, 75);
    });
  }

  animateTitle() {
    const delay = 90;
    let i = 0;
    let next = '';
    const intervalId = setInterval(() => {
      next = nameArray[i + 4];
      this.setState({
        title: nameArray.slice(i, i + 4).join('')
      });
      i += 1;
      if (next === undefined) {
        this.setState({ titleClass: 'flick-iq' });
        return clearInterval(intervalId);
      }
    }, delay);
  }

  render() {
    // Can the props passed to LoginSplash be accessed by connect
    // in that component instead? Which is better?

    const footer = this.props.auth.isLoggedIn
      ? <Quote />
      : <LoginSplash />;

    return (
      <div>
        <div className="jumbotron welcome">
          <div className="container">
            <div>
              <h1 className="welcome-title">
                <span>{welcomeHeader}</span>
                <span>{this.state.title.slice(0, 2)}</span>
                <span className={this.state.titleClass}>{this.state.title.slice(2)}</span>
              </h1>
              <h4>{subHeader}</h4>
              <p>{intro}</p>
            </div>
            <span>
              <Link to="/lightning">
                <button className="btn btn-lg btn-primary start-lightning">
                  Start Picking Movies
                </button>
              </Link>
            </span>
            <div className="welcome-footer">
              {footer}
            </div>
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
