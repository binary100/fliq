import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginSplash from '../components/loginSplash.jsx';
import Quote from './quote.jsx';
import { Modal } from 'react-bootstrap';

const welcomeHeader = '';
const subHeader = 'An adaptive movie recommendation system';
const intro =
  `Our machine learning engine will get to know
  what kinds of movies you like and ensure that you will always have
  something interesting to watch. Log in, then click below to start 
  the lightning round phase, which will teach FLIQ's neural network
  about what you like.`;

const intervals = [];
const targetTitle = 'FLIQ';
const modalBodyFirst = 'FLIQ\'s learning engine can only learn about you if you are logged in.';
const modalBodySecond = `If you want to try out the site, that's fine! 
                  Just remember that you will
                  see results that are representative of
                  FLIQ's entire userbase, rather than results
                  that are tailored to what you like.`;

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
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.animateTitle();
  }

  componentWillUnmount() {
    intervals.forEach(id => clearInterval(id));
  }

  animateTitle() {
    let title = this.state.title;
    title.split('').forEach((letter, index) => {
      let remaining = 15;
      const intervalId = setInterval(() => {
        const digit = '' + Math.round(Math.random());
        title = title.split('');
        title[index] = digit;
        title = title.join('');
        this.setState({ title });
        remaining -= 1;
        if (remaining === 0) {
          intervals.forEach(id => clearInterval(id));
          this.concludeAnimation();
        }
      }, 75);
      intervals.push(intervalId);
    });
  }

  concludeAnimation() {
    const title = this.state.title.split('');
    const remaining = title.length;
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

  showModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
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
      <button
        onClick={this.showModal}
        className="btn btn-lg btn-primary fliq-button"
      >
        Start Picking Movies
      </button>
    );

    return (
      <div>
        <div className="background-only"></div>
        <div className="background-hand"></div>
        <div className="background-left"></div>
        <div className="jumbotron welcome fadeIn">
          <div className="container">
            <Modal
              show={this.state.showModal}
              className="welcome-modal-wrapper"
              keyboard
            >
              <Modal.Header closeButton className="welcome-modal">
                <Modal.Title>Wait, human!</Modal.Title>
              </Modal.Header>
              <Modal.Body className="welcome-modal welcome-modal-body">
                <p>{modalBodyFirst}</p>
                <p>{modalBodySecond}</p>
              </Modal.Body>
              <Modal.Footer className="welcome-modal">
                <div>
                  <button
                    onClick={this.closeModal}
                    className="btn btn-lg btn-primary fliq-button pull-left"
                  >
                    Let me log in
                  </button>
                  <Link to="/lightning">
                    <button className="btn btn-lg btn-primary fliq-button pull-right">
                      {'That\'s ok'}
                    </button>
                  </Link>
                </div>
              </Modal.Footer>
            </Modal>

            <div>
              <div className="welcome-title-box">
                <h1 className="welcome-title">
                  <span>{welcomeHeader}</span>
                  <span>{this.state.title.slice(0, 2)}</span>
                  <span className={this.state.titleClass}>{this.state.title.slice(2)}</span>
                </h1>
              </div>
              <img className="welcome-logo" src="/assets/img/logo.png" />
              <div className="clear"></div>
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
