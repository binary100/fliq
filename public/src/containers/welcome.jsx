import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoginSplash from '../components/loginSplash.jsx';
import Quote from './quote.jsx';

const welcomeHeader = 'Welcome to ';
const subHeader = 'A learning movie recommendation system';
const intro =
  `Our machine learning algorithm will get to know
  what kinds of movies you like and ensure that you will always have
  something interesting to watch. Log in, then click below to start 
  the lightning round phase, which will teach FlickPick's neural network
  about what you like.`;
const nameArray = [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1,
  'F', 'L', 'I', 'Q'
];

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
    this.animateTitleTwo();
  }

  animateTitleTwo() {
    let title = this.state.title;
    console.log(typeof title);
    // title.split('').forEach((letter, index) => {
      const letter = 'L';
      const index = 1;
      let remaining = 10;
      const delay = Math.random() * 100;
      const intervalId = setInterval(() => {

        let digit = '' + Math.round(Math.random());
        console.log('Digit is: ', digit);
        title = title.split('');
        title[index] = digit;
        title = title.join('');
        this.setState({ title });
        remaining -= 1;
        if (remaining === 0) {
          let finalTitle = this.state.title;
          console.log(finalTitle);
          finalTitle = finalTitle.split('');
          console.log('Letter is', letter);
          finalTitle[index] = letter;
          finalTitle.join('');
          this.setState({
            title: finalTitle
          });
          clearInterval(intervalId);
        }
      }, 500);
    // });
  }

  animateTitle() {
    const delay = 60;
    let i = 0;
    let next = '';
    const intervalId = setInterval(() => {
      next = nameArray[i + 4];
      console.log('Next is: ', next);
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
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="jumbotron welcome">
              <div >
                <h1>
                  <span>{welcomeHeader}</span>
                  <span>{this.state.title.slice(0,2)}</span>
                  <span className={this.state.titleClass}>{this.state.title.slice(2)}</span>
                </h1>
                <h4>{subHeader}</h4>
                <p>{intro}</p>
              </div>
              <span>
                <Link to="/lightning">
                  <button className="btn btn-lg btn-primary">
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
