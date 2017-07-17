import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginSplash from '../components/loginSplash.jsx';
import Quote from './quote.jsx';
import { Modal } from 'react-bootstrap';

const welcomeHeader = 'Welcome to ';
const subHeader = 'An adaptive movie recommendation system';
const intro =
  `Our machine learning engine will get to know
  what kinds of movies you like and ensure that you will always have
  something interesting to watch. Log in, then click below to start 
  the lightning round phase, which will teach FLIQ's neural network
  about what you like.`;
const nameArray = [0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1,
  'F', 'L', 'I', 'Q'
];
const intervals = [];
const targetTitle = 'FLIQ';

// const modal = (<Modal
//                 show={this.state.showModal}>
//                 <Modal.Header closeButton>
//                   <Modal.Title>Modal heading</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                   <h4>Hello, human!</h4>
//                   <p>FLIQ's learning engine can only learn about you if you are logged in.</p>
//                   <p>
//                     If you want to try out the site, that's fine! 
//                     Just remember that you will only
//                     be seeing results that are representative of
//                     FLIQ's entire userbase, rather than results
//                     that are tailored to what you like.
//                   </p>
//                 </Modal.Body>
//                 <Modal.Footer>
//                   <Link to="/lightning">
//                     <button className="btn btn-lg btn-primary fliq-button">
//                       Yeah, yeah.
//                     </button>
//                   </Link>
//                 </Modal.Footer>
//               </Modal>);

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervals: [],
      title: 'FLIQ',
      titleClass: '',
      showModal: false
    };
    this.showModal = this.showModal.bind(this);
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

  showModal() {
    this.setState({ showModal: true });
  }

  render() {
    // Can the props passed to LoginSplash be accessed by connect
    // in that component instead? Which is better?

    const footer = this.props.auth.isLoggedIn
      ? <Quote />
      : <LoginSplash />;

    const lightningButton = this.props.auth.isLoggedIn
      ? (
          <Link to="/lightning">
            <button className="btn btn-lg btn-primary fliq-button">
              Start Picking Movies
            </button>
          </Link>
        )
      : (
          <button onClick={this.showModal} className="btn btn-lg btn-primary fliq-button">
            Start Picking Movies
          </button>
        );

    return (
      <div>
        <div className="jumbotron welcome fadeIn">
          <div className="container">

            <Modal
              show={this.state.showModal}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>Hello, human!</h4>
                <p>FLIQ's learning engine can only learn about you if you are logged in.</p>
                <p>
                  If you want to try out the site, that's fine! 
                  Just remember that you will only
                  be seeing results that are representative of
                  FLIQ's entire userbase, rather than results
                  that are tailored to what you like.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Link to="/lightning">
                  <button className="btn btn-lg btn-primary fliq-button">
                    Yeah, yeah.
                  </button>
                </Link>
              </Modal.Footer>
            </Modal>


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
              {lightningButton}
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
